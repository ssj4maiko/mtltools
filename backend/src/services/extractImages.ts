import { createHash } from "node:crypto";
import { mkdir, rename, rm, stat, writeFile, appendFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { sql } from "kysely";
import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import type { LaravelChapterCache } from "../cache/laravelChapterCache.js";

export const IMAGE_COLUMNS = ["textOriginal", "textRevision", "textCustom"] as const;
export type ImageColumn = (typeof IMAGE_COLUMNS)[number];

const DATA_URI_RE = /data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/g;

export type ExtractImagesOptions = {
  db: Db;
  imagesDir: string;
  manifestDir: string;
  cache?: FileCache;
  chapterHtml?: LaravelChapterCache;
  dryRun?: boolean;
  novels?: number[];
  nos?: number[];
  limit?: number;
  now?: () => Date;
};

export type ExtractImagesTotals = {
  rows: number;
  updated: number;
  would: number;
  conflicts: number;
  uris: number;
  skipped_uris: number;
  leftover_rows: number;
  files_new: number;
  files_existing: number;
  file_bytes_new: number;
  before: number;
  after: number;
  manifest: string;
};

export type ImageRef = { col: ImageColumn; sha256: string; ext: string; bytes: number; refs: number };

export function sniffImageExt(bin: Buffer): string | null {
  if (bin.length >= 3 && bin[0] === 0xff && bin[1] === 0xd8 && bin[2] === 0xff) return "jpg";
  if (
    bin.length >= 8 &&
    bin[0] === 0x89 &&
    bin.subarray(1, 4).toString("ascii") === "PNG" &&
    bin[4] === 0x0d &&
    bin[5] === 0x0a &&
    bin[6] === 0x1a &&
    bin[7] === 0x0a
  ) {
    return "png";
  }
  if (bin.length >= 4 && bin.subarray(0, 3).toString("ascii") === "GIF" && bin[3] === 0x38) return "gif";
  if (
    bin.length >= 12 &&
    bin.subarray(0, 4).toString("ascii") === "RIFF" &&
    bin.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

export function rewriteDataImages(
  text: string,
  col: ImageColumn,
  onImage: (bin: Buffer, sha: string, ext: string) => void,
): { text: string; refs: ImageRef[]; uris: number; skipped: number } {
  const refs = new Map<string, ImageRef>();
  let uris = 0;
  let skipped = 0;
  const next = text.replace(DATA_URI_RE, (match, _mime: string, b64: string) => {
    uris += 1;
    if (!b64) {
      skipped += 1;
      return match;
    }
    const bin = Buffer.from(b64, "base64");
    if (bin.length === 0) {
      skipped += 1;
      return match;
    }
    const ext = sniffImageExt(bin);
    if (!ext) {
      skipped += 1;
      return match;
    }
    const sha = createHash("sha256").update(bin).digest("hex");
    onImage(bin, sha, ext);
    const key = `${col}|${sha}`;
    const prev = refs.get(key);
    if (prev) prev.refs += 1;
    else refs.set(key, { col, sha256: sha, ext, bytes: bin.length, refs: 1 });
    return `/images/${sha.slice(0, 2)}/${sha}.${ext}`;
  });
  return { text: next, refs: [...refs.values()], uris, skipped };
}

async function writeAtomic(path: string, bin: Buffer): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${process.pid}`;
  try {
    await writeFile(tmp, bin);
    await rename(tmp, path);
  } catch (err) {
    await rm(tmp, { force: true });
    throw err;
  }
}

function stamp(now: Date, dry: boolean): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const name = `${now.getUTCFullYear()}${p(now.getUTCMonth() + 1)}${p(now.getUTCDate())}-${p(now.getUTCHours())}${p(now.getUTCMinutes())}${p(now.getUTCSeconds())}`;
  return `${name}${dry ? "-dry" : ""}.jsonl`;
}

export async function extractChapterImages(opts: ExtractImagesOptions): Promise<ExtractImagesTotals> {
  const dry = Boolean(opts.dryRun);
  const now = opts.now ?? (() => new Date());
  await mkdir(opts.manifestDir, { recursive: true });
  const manifestPath = join(opts.manifestDir, stamp(now(), dry));
  await writeFile(manifestPath, "");

  let query = opts.db
    .selectFrom("chapters")
    .select(["idNovel", "no"])
    .where((eb) => eb.or(IMAGE_COLUMNS.map((col) => eb(col, "like", "%data:image%"))))
    .orderBy("idNovel", "asc")
    .orderBy("no", "asc");
  if (opts.novels && opts.novels.length > 0) query = query.where("idNovel", "in", opts.novels);
  if (opts.nos && opts.nos.length > 0) query = query.where("no", "in", opts.nos);
  if (opts.limit && opts.limit > 0) query = query.limit(opts.limit);
  const keys = await query.execute();

  const t: ExtractImagesTotals = {
    rows: 0,
    updated: 0,
    would: 0,
    conflicts: 0,
    uris: 0,
    skipped_uris: 0,
    leftover_rows: 0,
    files_new: 0,
    files_existing: 0,
    file_bytes_new: 0,
    before: 0,
    after: 0,
    manifest: manifestPath,
  };
  const seen = new Set<string>();
  const touchedNovels = new Set<number>();

  for (const key of keys) {
    const idNovel = Number(key.idNovel);
    const no = Number(key.no);
    const row = await opts.db
      .selectFrom("chapters")
      .select([...IMAGE_COLUMNS])
      .where("idNovel", "=", idNovel)
      .where("no", "=", no)
      .executeTakeFirst();
    if (!row) continue;
    t.rows += 1;

    const updates: Partial<Record<ImageColumn, string>> = {};
    const conditions: Partial<Record<ImageColumn, { len: number; md5: string }>> = {};
    const refs: ImageRef[] = [];

    for (const col of IMAGE_COLUMNS) {
      const text = row[col];
      if (text === null || !text.includes("data:image")) continue;
      const rewritten = rewriteDataImages(text, col, () => undefined);
      t.uris += rewritten.uris;
      t.skipped_uris += rewritten.skipped;
      if (rewritten.text.includes("data:image")) t.leftover_rows += 1;
      if (rewritten.text !== text) {
        updates[col] = rewritten.text;
        conditions[col] = {
          len: Buffer.byteLength(text, "utf8"),
          md5: createHash("md5").update(text).digest("hex"),
        };
        t.before += Buffer.byteLength(text, "utf8");
        t.after += Buffer.byteLength(rewritten.text, "utf8");
        refs.push(...rewritten.refs);
      }
    }

    for (const ref of refs) {
      const rel = `${ref.sha256.slice(0, 2)}/${ref.sha256}.${ref.ext}`;
      if (seen.has(rel)) continue;
      seen.add(rel);
      const path = join(opts.imagesDir, rel);
      const bin = extractBytesForRef(row, ref);
      if (!bin) continue;
      let exists = false;
      try {
        const st = await stat(path);
        exists = st.isFile() && st.size === bin.length;
      } catch {
        exists = false;
      }
      if (exists) t.files_existing += 1;
      else {
        t.files_new += 1;
        t.file_bytes_new += bin.length;
        if (!dry) await writeAtomic(path, bin);
      }
    }

    const changed = Object.keys(updates).length > 0;
    let status = changed ? (dry ? "would-update" : "updated") : "unchanged";
    if (changed && dry) t.would += 1;
    if (changed && !dry) {
      const ok = await applyConditionalUpdate(opts.db, idNovel, no, updates, conditions, refs);
      if (ok) {
        t.updated += 1;
        touchedNovels.add(idNovel);
      } else {
        t.conflicts += 1;
        status = "conflict-skipped";
      }
    }

    await appendFile(
      manifestPath,
      JSON.stringify({
        idNovel,
        no,
        status,
        columns: Object.fromEntries(Object.entries(conditions).map(([c, v]) => [c, { before: v!.len }])),
        after: Object.fromEntries(Object.entries(updates).map(([c, v]) => [c, Buffer.byteLength(v, "utf8")])),
        images: refs,
      }) + "\n",
    );
  }

  if (!dry && opts.cache) {
    for (const idNovel of touchedNovels) {
      await opts.cache.invalidateNovel(idNovel);
      if (opts.chapterHtml) await opts.chapterHtml.invalidateNovel(idNovel);
    }
  }

  return t;
}

function extractBytesForRef(
  row: Partial<Record<ImageColumn, string | null>>,
  ref: ImageRef,
): Buffer | null {
  const text = row[ref.col];
  if (!text) return null;
  const re = new RegExp(`data:image/[a-zA-Z0-9.+-]+;base64,([A-Za-z0-9+/=]+)`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const bin = Buffer.from(m[1], "base64");
    const sha = createHash("sha256").update(bin).digest("hex");
    if (sha === ref.sha256) return bin;
  }
  return null;
}

async function applyConditionalUpdate(
  db: Db,
  idNovel: number,
  no: number,
  updates: Partial<Record<ImageColumn, string>>,
  conditions: Partial<Record<ImageColumn, { len: number; md5: string }>>,
  refs: ImageRef[],
): Promise<boolean> {
  const allowed = new Set<string>(IMAGE_COLUMNS);
  for (const col of [...Object.keys(updates), ...Object.keys(conditions)]) {
    if (!allowed.has(col)) throw new Error(`refusing to update unexpected column ${col}`);
  }
  return db.transaction().execute(async (trx) => {
    const setFragments = (Object.entries(updates) as Array<[ImageColumn, string]>).map(
      ([col, val]) => sql`${sql.raw("`" + col + "`")} = ${val}`,
    );
    const condFragments = (Object.entries(conditions) as Array<[ImageColumn, { len: number; md5: string }]>).map(
      ([col, cond]) => sql`LENGTH(${sql.raw("`" + col + "`")}) = ${cond.len} AND MD5(${sql.raw("`" + col + "`")}) = ${cond.md5}`,
    );
    const result = await sql`
      UPDATE chapters
      SET ${sql.join(setFragments)}
      WHERE idNovel = ${idNovel} AND ${sql.ref("no")} = ${no} AND ${sql.join(condFragments, sql` AND `)}
    `.execute(trx);
    const affected = Number((result as { numAffectedRows?: bigint | number }).numAffectedRows ?? 0);
    if (affected !== 1) return false;
    for (const r of refs) {
      await sql`
        INSERT INTO chapter_images (idNovel, no, col, sha256, ext, bytes, refs)
        VALUES (${idNovel}, ${no}, ${r.col}, ${r.sha256}, ${r.ext}, ${r.bytes}, ${r.refs})
        ON DUPLICATE KEY UPDATE refs = VALUES(refs), ext = VALUES(ext), bytes = VALUES(bytes)
      `.execute(trx);
    }
    return true;
  });
}
