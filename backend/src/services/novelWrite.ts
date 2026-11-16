import type { Transaction } from "kysely";
import type { Db } from "../db/client.js";
import type { Database } from "../db/types.js";
import type { FileCache } from "../cache/fileCache.js";
import type { LaravelChapterCache } from "../cache/laravelChapterCache.js";
import { META_DRIVERS } from "./meta.js";
import { CatalogService, NotFoundError } from "./catalog.js";

export class InvalidNovelWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidNovelWriteError";
  }
}

export class NovelCodeConflictError extends Error {
  constructor(public readonly code: string) {
    super(`Novel code already exists`);
    this.name = "NovelCodeConflictError";
  }
}

export type NovelWriteDeps = {
  db: Db;
  cache: FileCache;
  catalog: CatalogService;
  chapterHtml: LaravelChapterCache;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}

function asFlag(value: unknown): number {
  return value ? 1 : 0;
}

function asNonNegativeInt(value: unknown, field: string): number {
  const n = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
  if (!Number.isInteger(n) || n < 0) {
    throw new InvalidNovelWriteError(`${field} must be a non-negative integer`);
  }
  return n;
}

function asNullableString(value: unknown, field: string): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") {
    throw new InvalidNovelWriteError(`${field} must be a string or null`);
  }
  return value;
}

function asRequiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value === "") {
    throw new InvalidNovelWriteError(`${field} is required`);
  }
  return value;
}

function prepareDriver(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") {
    throw new InvalidNovelWriteError("driver must be a string or null");
  }
  return Object.prototype.hasOwnProperty.call(META_DRIVERS, value) ? value : null;
}

export type NovelWriteFields = Partial<{
  code: string;
  nameOriginal: string;
  nameCustom: string | null;
  numberChapters: number;
  driver: string | null;
  flagR18: number;
  completed: number;
  addedBy: string;
  show: number;
}>;

export function parseNovelWriteBody(
  body: unknown,
  mode: "insert" | "update",
): { fields: NovelWriteFields; dictionaries?: number[] } {
  if (!isPlainObject(body)) {
    throw new InvalidNovelWriteError("JSON object body required");
  }
  if (!isPlainObject(body.novel)) {
    throw new InvalidNovelWriteError("novel object is required");
  }
  const src = body.novel;
  const fields: NovelWriteFields = {};

  if (Object.prototype.hasOwnProperty.call(src, "code")) {
    const code = asRequiredString(src.code, "code");
    if (code.length > 20) throw new InvalidNovelWriteError("code must be 20 characters or fewer");
    fields.code = code;
  }
  if (Object.prototype.hasOwnProperty.call(src, "nameOriginal")) {
    const name = asRequiredString(src.nameOriginal, "nameOriginal");
    if (name.length > 100) throw new InvalidNovelWriteError("nameOriginal must be 100 characters or fewer");
    fields.nameOriginal = name;
  }
  if (Object.prototype.hasOwnProperty.call(src, "nameCustom")) {
    const name = asNullableString(src.nameCustom, "nameCustom");
    if (name !== null && name.length > 255) throw new InvalidNovelWriteError("nameCustom must be 255 characters or fewer");
    fields.nameCustom = name;
  }
  if (Object.prototype.hasOwnProperty.call(src, "numberChapters")) {
    fields.numberChapters = asNonNegativeInt(src.numberChapters, "numberChapters");
  }
  if (Object.prototype.hasOwnProperty.call(src, "driver")) {
    fields.driver = prepareDriver(src.driver);
  }
  for (const flag of ["flagR18", "completed", "show"] as const) {
    if (Object.prototype.hasOwnProperty.call(src, flag) || src[flag] === null) {
      fields[flag] = asFlag(src[flag]);
    }
  }
  if (Object.prototype.hasOwnProperty.call(src, "addedBy")) {
    const addedBy = asRequiredString(src.addedBy, "addedBy");
    if (addedBy.length > 255) throw new InvalidNovelWriteError("addedBy must be 255 characters or fewer");
    fields.addedBy = addedBy;
  }

  if (mode === "insert") {
    if (!fields.code) throw new InvalidNovelWriteError("code is required");
    if (!fields.nameOriginal) throw new InvalidNovelWriteError("nameOriginal is required");
    if (!fields.addedBy) throw new InvalidNovelWriteError("addedBy is required");
  } else if (Object.keys(fields).length === 0 && !Object.prototype.hasOwnProperty.call(body, "dictionaries")) {
    throw new InvalidNovelWriteError("no novel fields to update");
  }

  let dictionaries: number[] | undefined;
  if (Object.prototype.hasOwnProperty.call(body, "dictionaries")) {
    if (!Array.isArray(body.dictionaries)) {
      throw new InvalidNovelWriteError("dictionaries must be an array of ids");
    }
    const ids: number[] = [];
    for (const raw of body.dictionaries) {
      const id = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() !== "" ? Number(raw) : NaN;
      if (!Number.isInteger(id) || id <= 0) {
        throw new InvalidNovelWriteError("dictionaries must be an array of ids");
      }
      if (!ids.includes(id)) ids.push(id);
    }
    dictionaries = ids;
  }

  return { fields, dictionaries };
}

export class NovelWriteService {
  constructor(private readonly deps: NovelWriteDeps) {}

  async insert(body: unknown): Promise<string> {
    const { fields, dictionaries } = parseNovelWriteBody(body, "insert");
    const id = await this.deps.db.transaction().execute(async (trx) => {
      if (dictionaries) await this.requireDictionaries(trx, dictionaries);
      let inserted;
      try {
        inserted = await trx
          .insertInto("novels")
          .values({
            code: fields.code as string,
            nameOriginal: fields.nameOriginal as string,
            nameCustom: fields.nameCustom ?? null,
            driver: fields.driver ?? null,
            numberChapters: fields.numberChapters ?? 0,
            // Laravel does not set flagSyosetu (not fillable); the column default is 1.
            flagSyosetu: 1,
            flagR18: fields.flagR18 ?? 0,
            completed: fields.completed ?? 0,
            addedBy: fields.addedBy as string,
            show: fields.show ?? 1,
          })
          .executeTakeFirstOrThrow();
      } catch (err) {
        throwDuplicate(err, fields.code as string);
      }
      const id = Number(inserted.insertId);
      if (dictionaries) await this.setDictionaries(trx, id, dictionaries);
      return id;
    });
    // Frontend add-novel POSTs this body and then navigates to /novel/{id}.
    // It does not call autoIndex; chapters are imported later via autoUpdate.
    await this.deps.cache.invalidateNovelCatalog(id);
    return this.deps.catalog.getNovelJson(id);
  }

  async update(idNovel: number, body: unknown): Promise<string> {
    const { fields, dictionaries } = parseNovelWriteBody(body, "update");
    await this.deps.db.transaction().execute(async (trx) => {
      const existing = await trx.selectFrom("novels").select("id").where("id", "=", idNovel).executeTakeFirst();
      if (!existing) throw new NotFoundError("Novel not found");
      if (dictionaries) await this.requireDictionaries(trx, dictionaries);
      if (Object.keys(fields).length > 0) {
        try {
          await trx
            .updateTable("novels")
            .set(fields)
            .where("id", "=", idNovel)
            .executeTakeFirst();
        } catch (err) {
          throwDuplicate(err, typeof fields.code === "string" ? fields.code : String(idNovel));
        }
      }
      if (dictionaries) await this.setDictionaries(trx, idNovel, dictionaries);
    });
    await this.deps.cache.invalidateNovelCatalog(idNovel);
    return this.deps.catalog.getNovelJson(idNovel);
  }

  async delete(idNovel: number): Promise<number> {
    await this.deps.db.transaction().execute(async (trx) => {
      const existing = await trx.selectFrom("novels").select("id").where("id", "=", idNovel).executeTakeFirst();
      if (!existing) throw new NotFoundError("Novel not found");
      await trx.deleteFrom("novelsDictionaries").where("idNovel", "=", idNovel).execute();
      await trx.deleteFrom("chapter_images").where("idNovel", "=", idNovel).execute();
      await trx.deleteFrom("chapters").where("idNovel", "=", idNovel).execute();
      await trx.deleteFrom("novels").where("id", "=", idNovel).execute();
    });
    await this.deps.cache.invalidateNovel(idNovel);
    await this.deps.chapterHtml.invalidateNovel(idNovel);
    return 1;
  }

  private async requireDictionaries(trx: Transaction<Database>, ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    const rows = await trx.selectFrom("dictionaries").select("id").where("id", "in", ids).execute();
    if (rows.length !== ids.length) {
      throw new InvalidNovelWriteError("one or more dictionaries do not exist");
    }
  }

  private async setDictionaries(trx: Transaction<Database>, idNovel: number, ids: number[]): Promise<void> {
    await trx.deleteFrom("novelsDictionaries").where("idNovel", "=", idNovel).execute();
    if (ids.length === 0) return;
    await trx
      .insertInto("novelsDictionaries")
      .values(ids.map((idDictionary) => ({ idNovel, idDictionary })))
      .execute();
  }
}

function throwDuplicate(err: unknown, code: string): never {
  const raw = err as { code?: string; cause?: { code?: string }; errno?: number };
  if (raw.code === "ER_DUP_ENTRY" || raw.cause?.code === "ER_DUP_ENTRY" || raw.errno === 1062) {
    throw new NovelCodeConflictError(code);
  }
  throw err;
}
