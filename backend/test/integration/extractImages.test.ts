import { access, mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Db } from "../../src/db/client.js";
import { FileCache } from "../../src/cache/fileCache.js";
import { applySchema, schemaSql, startApp } from "./harness.js";
import { extractChapterImages } from "../../src/services/extractImages.js";

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);
const SHA = createHash("sha256").update(PNG_1X1).digest("hex");
const URI = `data:image/png;base64,${PNG_1X1.toString("base64")}`;

describe("extractChapterImages", () => {
  let db: Db;
  let cacheDir: string;
  let imagesDir: string;
  let manifestDir: string;
  let close: () => Promise<void>;

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp();
    db = harness.db;
    cacheDir = harness.cacheDir;
    close = harness.close;
    imagesDir = await mkdtemp(join(tmpdir(), "mtl-img-"));
    manifestDir = await mkdtemp(join(tmpdir(), "mtl-manifest-"));
    await db
      .insertInto("novels")
      .values({
        id: 40,
        code: "manual-40",
        nameOriginal: "手動",
        nameCustom: "Manual",
        driver: "manual",
        numberChapters: 1,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      })
      .execute();
    await db
      .insertInto("chapters")
      .values({
        idNovel: 40,
        no: 1,
        title: "probe",
        textOriginal: `<p><img src="${URI}"></p>`,
        dateCreated: "2020-01-02 03:04:06",
      })
      .execute();
  }, 120_000);

  afterAll(async () => {
    if (close) await close();
  });

  it("dry-run reports the rewrite without writing files or the chapter row", async () => {
    const totals = await extractChapterImages({
      db,
      imagesDir,
      manifestDir,
      dryRun: true,
      novels: [40],
    });
    expect(totals.would).toBe(1);
    expect(totals.updated).toBe(0);
    expect(totals.uris).toBe(1);
    expect(totals.files_new).toBe(1);
    const row = await db
      .selectFrom("chapters")
      .select("textOriginal")
      .where("idNovel", "=", 40)
      .where("no", "=", 1)
      .executeTakeFirstOrThrow();
    expect(row.textOriginal?.includes("data:image")).toBe(true);
    await expect(access(join(imagesDir, SHA.slice(0, 2), `${SHA}.png`))).rejects.toThrow();
  });

  it("writes the content-addressed file, replaces the data URI, and records chapter_images", async () => {
    const cache = new FileCache(cacheDir);
    await cache.set(cache.chapterPath(40, 1), "{\"stale\":true}");
    const totals = await extractChapterImages({
      db,
      imagesDir,
      manifestDir,
      cache,
      dryRun: false,
      novels: [40],
    });
    expect(totals.updated).toBe(1);
    expect(totals.files_new).toBe(1);
    const row = await db
      .selectFrom("chapters")
      .select("textOriginal")
      .where("idNovel", "=", 40)
      .where("no", "=", 1)
      .executeTakeFirstOrThrow();
    expect(row.textOriginal).toBe(`<p><img src="/images/${SHA.slice(0, 2)}/${SHA}.png"></p>`);
    const bytes = await readFile(join(imagesDir, SHA.slice(0, 2), `${SHA}.png`));
    expect(bytes.equals(PNG_1X1)).toBe(true);
    const refs = await db.selectFrom("chapter_images").select(["col", "sha256", "ext", "bytes", "refs"]).execute();
    expect(refs).toHaveLength(1);
    expect(refs[0]).toMatchObject({ col: "textOriginal", sha256: SHA, ext: "png", refs: 1 });
    await expect(access(`${cacheDir}/chapter/40/1.json`)).rejects.toThrow();
  });
});
