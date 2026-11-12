import { access, readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { LaravelChapterCache } from "../../src/cache/laravelChapterCache.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures/static");

let db: Db;
let app: FastifyInstance;
let chapterCacheDir: string;
let baseUrl: string;
let close: () => Promise<void>;

async function request(path: string) {
  const res = await fetch(baseUrl + path);
  return { statusCode: res.status, headers: Object.fromEntries(res.headers), body: await res.text() };
}

async function seed() {
  await db
    .insertInto("novels")
    .values([
      {
        id: 1,
        code: "n1234ab",
        nameOriginal: "源",
        nameCustom: "Source & Co",
        driver: "syosetu",
        numberChapters: 3,
        flagSyosetu: 1,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
      {
        id: 2,
        code: "book-manual",
        nameOriginal: "源",
        nameCustom: "Source & Co",
        driver: "manual",
        numberChapters: 3,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
    ])
    .execute();

  await db
    .insertInto("dictionaries")
    .values([{ id: 10, name: "Test", language: "english", dateCreated: "2020-01-02 03:04:05", dateRevision: null }])
    .execute();

  await db.insertInto("dictionaryCategories").values([{ id: 100, idDictionary: 10, name: "Names" }]).execute();

  await db
    .insertInto("chapters")
    .values([
      {
        idNovel: 1,
        no: 1,
        title: "一",
        arc: null,
        textOriginal: "<p>start</p>",
        textRevision: null,
      },
      {
        idNovel: 1,
        no: 2,
        title: "二 / second",
        arc: "中",
        textOriginal: '<p><img src="/images/x.png">世界</p>',
        textRevision: null,
      },
    ])
    .execute();
}

describe("GET /static/{novel}/{dict}/{chapter}", () => {
  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({
      IMAGES_BASE_URL: "https://img.example:8443",
      APP_URL: "https://img.example:8443",
    });
    db = harness.db;
    app = harness.app;
    chapterCacheDir = harness.chapterCacheDir;
    baseUrl = harness.baseUrl;
    close = harness.close;
    await seed();
  });

  afterAll(async () => {
    await close();
  });

  it("renders a mid-chapter page with both controls and writes the Laravel cache path", async () => {
    const res = await request("/static/1/10/2/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html; charset=UTF-8/i);
    expect(res.headers["cache-control"]).toBe("no-cache, private");
    expect(res.body).toBe(readFileSync(join(fixtures, "chapter-both.html"), "utf8"));
    const cached = await readFile(join(chapterCacheDir, "10", "1", "2-1.html"), "utf8");
    expect(cached).toBe(res.body);
  });

  it("renders the first chapter (next only) and serves a cache hit as the same bytes", async () => {
    const first = await request("/static/1/10/1");
    expect(first.statusCode).toBe(200);
    expect(first.body).toBe(readFileSync(join(fixtures, "chapter-first.html"), "utf8"));
    const hit = await request("/static/1/10/1/1");
    expect(hit.body).toBe(first.body);
  });

  it("returns the wait page for a missing syosetu chapter and does not write it to cache", async () => {
    const res = await request("/static/1/10/4/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(readFileSync(join(fixtures, "wait.html"), "utf8"));
    await expect(access(join(chapterCacheDir, "10", "1", "4-1.html"))).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("returns the stop page for a missing chapter on a manual novel", async () => {
    const res = await request("/static/2/10/4/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("There are no new chapters");
    expect(res.body).toContain('href="/static/2/10/3/1">Previous</a>');
    expect(res.body).not.toContain("The current chapter has not been loaded yet.");
  });

  it("returns 404 for a missing novel or dictionary", async () => {
    expect((await request("/static/999/10/1/")).statusCode).toBe(404);
    expect((await request("/static/1/999/1/")).statusCode).toBe(404);
  });

  it("serves a pre-existing Laravel cache file as-is (byte identity, no regen)", async () => {
    const cache = new LaravelChapterCache(chapterCacheDir);
    await cache.set(10, 1, 9, 1, "<html>preexisting-synthetic</html>");
    const res = await request("/static/1/10/9/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("<html>preexisting-synthetic</html>");
  });

  it("purges static HTML for a novel", async () => {
    const cache = new LaravelChapterCache(chapterCacheDir);
    await cache.invalidateNovel(1);
    await expect(access(join(chapterCacheDir, "10", "1", "2-1.html"))).rejects.toMatchObject({ code: "ENOENT" });
  });
});
