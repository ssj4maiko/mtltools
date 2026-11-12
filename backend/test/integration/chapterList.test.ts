import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { FileCache } from "../../src/cache/fileCache.js";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

let db: Db;
let app: FastifyInstance;
let cacheDir: string;
let baseUrl: string;

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
        nameCustom: "Source",
        driver: "syosetu",
        numberChapters: 2,
        flagSyosetu: 1,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
      {
        id: 2,
        code: "book-manual",
        nameOriginal: "手動",
        nameCustom: "Manual",
        driver: "manual",
        numberChapters: 1,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
      {
        id: 3,
        code: "12345678901234567890",
        nameOriginal: "カクヨム",
        nameCustom: "Kakuyomu",
        driver: "kakuyomu",
        numberChapters: 1,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
    ])
    .execute();

  await db
    .insertInto("chapters")
    .values([
      {
        idNovel: 1,
        no: 2,
        arc: "中",
        title: "二 / second",
        textOriginal: "synthetic body 2",
        textRevision: null,
        textCustom: null,
        dateOriginalPost: "2020-01-02 03:04:05",
        dateOriginalRevision: "2020-01-03 03:04:05",
        dateCreated: "2020-01-02 03:04:06",
        dateRevision: "2021-02-03 04:05:06",
        noCode: null,
      },
      {
        idNovel: 1,
        no: 1,
        arc: null,
        title: "一",
        textOriginal: "synthetic body 1",
        textRevision: null,
        textCustom: null,
        dateOriginalPost: "2020-01-01 00:00:00",
        dateOriginalRevision: null,
        dateCreated: "2020-01-01 00:00:01",
        dateRevision: null,
        noCode: null,
      },
      {
        idNovel: 2,
        no: 10,
        arc: null,
        title: "manual",
        textOriginal: null,
        textRevision: null,
        textCustom: null,
        dateOriginalPost: null,
        dateOriginalRevision: null,
        dateCreated: "2022-05-06 07:08:09",
        dateRevision: null,
        noCode: null,
      },
      {
        idNovel: 3,
        no: 1,
        arc: "Arc",
        title: "ep",
        textOriginal: "synthetic",
        textRevision: "revised / 改",
        textCustom: null,
        dateOriginalPost: "2021-03-04 05:06:07",
        dateOriginalRevision: null,
        dateCreated: "2021-03-04 05:06:08",
        dateRevision: null,
        noCode: "99887766",
      },
    ])
    .execute();
}

describe("GET /api/chapter/:idNovel", () => {
  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp();
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    baseUrl = harness.baseUrl;
    await seed();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("returns the Laravel JSON contract for a syosetu novel, ordered by no, without text fields", async () => {
    const res = await request("/api/chapter/1");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const expected =
      '[{"idNovel":1,"no":1,"arc":null,"title":"\\u4e00","dateOriginalPost":"2020-01-01 00:00:00","dateOriginalRevision":null,"dateCreated":"2020-01-01T00:00:01.000000Z","dateRevision":null,"hasText":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/1"},{"idNovel":1,"no":2,"arc":"\\u4e2d","title":"\\u4e8c \\/ second","dateOriginalPost":"2020-01-02 03:04:05","dateOriginalRevision":"2020-01-03 03:04:05","dateCreated":"2020-01-02T03:04:06.000000Z","dateRevision":"2021-02-03T04:05:06.000000Z","hasText":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/2"}]';
    expect(res.body).toBe(expected);
    const parsed = JSON.parse(res.body);
    expect(parsed[0].textOriginal).toBeUndefined();
    expect(parsed[1].title).toBe("二 / second");
  });

  it("returns hasText 0 and null urlSource for a manual chapter without text", async () => {
    const res = await request("/api/chapter/2");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(
      '[{"idNovel":2,"no":10,"arc":null,"title":"manual","dateOriginalPost":null,"dateOriginalRevision":null,"dateCreated":"2022-05-06T07:08:09.000000Z","dateRevision":null,"hasText":0,"urlSource":null}]',
    );
  });

  it("builds Kakuyomu urlSource from noCode", async () => {
    const res = await request("/api/chapter/3");
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("https:\\/\\/kakuyomu.jp\\/works\\/12345678901234567890\\/episodes\\/99887766");
  });

  it("returns 404 for a missing novel", async () => {
    const res = await request("/api/chapter/999");
    expect(res.statusCode).toBe(404);
  });

  it("serves a disk cache and only refreshes after invalidation", async () => {
    const first = await request("/api/chapter/1");
    expect(first.statusCode).toBe(200);
    const cache = new FileCache(cacheDir);
    const path = cache.chapterListPath(1);
    const onDisk = await readFile(path, "utf8");
    expect(onDisk).toBe(first.body);

    await writeFile(path, '[{"cached":true}]');
    const cached = await request("/api/chapter/1");
    expect(cached.body).toBe('[{"cached":true}]');

    await cache.invalidateChapterList(1);
    const fresh = await request("/api/chapter/1");
    expect(fresh.body).toBe(first.body);
  });


  it("returns a single chapter with text fields and the Laravel JSON contract", async () => {
    const res = await request("/api/chapter/1/1");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const expected =
      '{"idNovel":1,"no":1,"arc":null,"title":"\\u4e00","dateOriginalPost":"2020-01-01 00:00:00","dateOriginalRevision":null,"dateCreated":"2020-01-01T00:00:01.000000Z","dateRevision":null,"hasText":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/1","textOriginal":"synthetic body 1"}';
    expect(res.body).toBe(expected);
    const parsed = JSON.parse(res.body);
    expect(parsed.textOriginal).toBe("synthetic body 1");
    expect(parsed.textRevision).toBeUndefined();
  });

  it("includes textRevision when set and builds a Kakuyomu urlSource", async () => {
    const res = await request("/api/chapter/3/1");
    expect(res.statusCode).toBe(200);
    const expected =
      '{"idNovel":3,"no":1,"arc":"Arc","title":"ep","dateOriginalPost":"2021-03-04 05:06:07","dateOriginalRevision":null,"dateCreated":"2021-03-04T05:06:08.000000Z","dateRevision":null,"hasText":1,"urlSource":"https:\\/\\/kakuyomu.jp\\/works\\/12345678901234567890\\/episodes\\/99887766","textOriginal":"synthetic","textRevision":"revised \\\/ \\u6539"}';
    expect(res.body).toBe(expected);
  });

  it("omits text keys for a chapter without text", async () => {
    const res = await request("/api/chapter/2/10");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(
      '{"idNovel":2,"no":10,"arc":null,"title":"manual","dateOriginalPost":null,"dateOriginalRevision":null,"dateCreated":"2022-05-06T07:08:09.000000Z","dateRevision":null,"hasText":0,"urlSource":null}',
    );
    const parsed = JSON.parse(res.body);
    expect(parsed.textOriginal).toBeUndefined();
  });

  it("returns 404 for a missing chapter", async () => {
    const res = await request("/api/chapter/1/99");
    expect(res.statusCode).toBe(404);
  });

  it("serves a single-chapter disk cache and refreshes after invalidation", async () => {
    const first = await request("/api/chapter/1/2");
    expect(first.statusCode).toBe(200);
    const cache = new FileCache(cacheDir);
    const path = cache.chapterPath(1, 2);
    const onDisk = await readFile(path, "utf8");
    expect(onDisk).toBe(first.body);

    await writeFile(path, '{"cached":true}');
    const cached = await request("/api/chapter/1/2");
    expect(cached.body).toBe('{"cached":true}');

    await cache.invalidateNovel(1);
    const fresh = await request("/api/chapter/1/2");
    expect(fresh.body).toBe(first.body);
    const list = await request("/api/chapter/1");
    expect(list.statusCode).toBe(200);
    expect(JSON.parse(list.body)[0].textOriginal).toBeUndefined();
  });
});
