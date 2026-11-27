import { refreshNovelUpdateDates } from "./novelUpdateDates.js";
import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import type { LaravelChapterCache } from "../cache/laravelChapterCache.js";
import { nowMysqlUtc } from "../drivers/kakuyomu.js";
import { ChapterListService, ChapterNotFoundError, NovelNotFoundError } from "./chapterList.js";

const WRITABLE_FIELDS = [
  "noCode",
  "arc",
  "title",
  "textOriginal",
  "textRevision",
  "textCustom",
  "dateOriginalPost",
  "dateOriginalRevision",
] as const;

type WritableField = (typeof WRITABLE_FIELDS)[number];

export class ChapterConflictError extends Error {
  constructor(
    public readonly idNovel: number,
    public readonly no: number,
  ) {
    super(`Chapter ${idNovel}/${no} already exists`);
    this.name = "ChapterConflictError";
  }
}

export class InvalidChapterWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidChapterWriteError";
  }
}

export type ChapterWriteDeps = {
  db: Db;
  cache: FileCache;
  chapterList: ChapterListService;
  chapterHtml: LaravelChapterCache;
  now?: () => Date;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Accept Laravel DATETIME or a JSON ISO string; store naive YYYY-MM-DD HH:MM:SS. */
export function asMysqlDatetime(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" && typeof value !== "number") {
    throw new InvalidChapterWriteError("date fields must be strings or null");
  }
  const raw = String(value).trim();
  const mysql = raw.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/);
  if (mysql) return `${mysql[1]} ${mysql[2]}`;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) {
    throw new InvalidChapterWriteError("unparseable datetime");
  }
  // dateOriginal* values from the UI may arrive as ISO; keep the clock as sent in UTC
  // so we don't shift a naive wall time that was already stored.
  return nowMysqlUtc(d);
}

export function parseChapterWriteBody(body: unknown, opts: { requireNo?: boolean } = {}): {
  no?: number;
  fields: Partial<Record<WritableField, string | null>>;
} {
  if (!isPlainObject(body)) {
    throw new InvalidChapterWriteError("JSON object body required");
  }
  const fields: Partial<Record<WritableField, string | null>> = {};
  for (const key of WRITABLE_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(body, key)) continue;
    const value = body[key];
    if (key === "dateOriginalPost" || key === "dateOriginalRevision") {
      fields[key] = asMysqlDatetime(value);
      continue;
    }
    if (value === null) {
      fields[key] = null;
      continue;
    }
    if (typeof value !== "string") {
      throw new InvalidChapterWriteError(`${key} must be a string or null`);
    }
    fields[key] = value;
  }

  let no: number | undefined;
  if (Object.prototype.hasOwnProperty.call(body, "no")) {
    const raw = body.no;
    const parsed = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw new InvalidChapterWriteError("no must be a positive integer");
    }
    no = parsed;
  } else if (opts.requireNo) {
    throw new InvalidChapterWriteError("no is required");
  }

  return { no, fields };
}

export class ChapterWriteService {
  private readonly now: () => Date;

  constructor(private readonly deps: ChapterWriteDeps) {
    this.now = deps.now ?? (() => new Date());
  }

  async insert(idNovel: number, body: unknown): Promise<string> {
    await this.requireNovel(idNovel);
    const parsed = parseChapterWriteBody(body, { requireNo: true });
    const no = parsed.no!;
    try {
      await this.deps.db
        .insertInto("chapters")
        .values({
          idNovel,
          no,
          noCode: parsed.fields.noCode ?? null,
          arc: parsed.fields.arc ?? null,
          title: parsed.fields.title ?? null,
          textOriginal: parsed.fields.textOriginal ?? null,
          textRevision: parsed.fields.textRevision ?? null,
          textCustom: parsed.fields.textCustom ?? null,
          dateOriginalPost: parsed.fields.dateOriginalPost ?? null,
          dateOriginalRevision: parsed.fields.dateOriginalRevision ?? null,
          dateRevision: nowMysqlUtc(this.now()),
        })
        .execute();
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "ER_DUP_ENTRY") throw new ChapterConflictError(idNovel, no);
      throw err;
    }
    await this.invalidate(idNovel, no);
    return this.deps.chapterList.getChapterJson(idNovel, no);
  }

  async update(idNovel: number, no: number, body: unknown): Promise<string> {
    await this.requireNovel(idNovel);
    const existing = await this.deps.db
      .selectFrom("chapters")
      .select(["no", "dateCreated"])
      .where("idNovel", "=", idNovel)
      .where("no", "=", no)
      .executeTakeFirst();
    if (!existing) throw new ChapterNotFoundError(idNovel, no);

    const parsed = parseChapterWriteBody(body);
    // The URL is the identity. Do not let a body `no` renumber the row (Laravel would have, had PUT worked).
    const patch: Record<string, unknown> = { ...parsed.fields, dateRevision: nowMysqlUtc(this.now()) };
    await this.deps.db.updateTable("chapters").set(patch).where("idNovel", "=", idNovel).where("no", "=", no).execute();
    await this.invalidate(idNovel, no);
    return this.deps.chapterList.getChapterJson(idNovel, no);
  }

  async delete(idNovel: number, no: number): Promise<number> {
    await this.requireNovel(idNovel);
    const result = await this.deps.db
      .deleteFrom("chapters")
      .where("idNovel", "=", idNovel)
      .where("no", "=", no)
      .executeTakeFirst();
    const affected = Number(result.numDeletedRows ?? 0);
    if (affected === 0) throw new ChapterNotFoundError(idNovel, no);
    await this.invalidate(idNovel, no);
    return 1;
  }

  private async requireNovel(idNovel: number): Promise<void> {
    const novel = await this.deps.db.selectFrom("novels").select("id").where("id", "=", idNovel).executeTakeFirst();
    if (!novel) throw new NovelNotFoundError(idNovel);
  }

  private async invalidate(idNovel: number, _no: number): Promise<void> {
    await refreshNovelUpdateDates(this.deps.db, idNovel);
    await this.deps.cache.invalidateNovel(idNovel);
    await this.deps.chapterHtml.invalidateNovel(idNovel);
  }
}
