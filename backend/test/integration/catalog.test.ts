import { access } from "node:fs/promises";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { FileCache } from "../../src/cache/fileCache.js";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

let db: Db;
let app: FastifyInstance;
let cacheDir: string;
let baseUrl: string;

async function request(path: string, init?: RequestInit) {
  const res = await fetch(baseUrl + path, init);
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
        numberChapters: 0,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      },
      {
        id: 3,
        code: "1234567890123456789",
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
    .insertInto("dictionaries")
    .values([
      {
        id: 10,
        name: "人名",
        language: "english",
        dateCreated: "2020-01-02 03:04:05",
        dateRevision: "2021-02-03 04:05:06",
      },
      {
        id: 11,
        name: "Places",
        language: "english",
        dateCreated: "2020-03-04 05:06:07",
        dateRevision: null,
      },
    ])
    .execute();

  await db
    .insertInto("novelsDictionaries")
    .values([
      { id: 1, idNovel: 1, idDictionary: 10 },
      { id: 2, idNovel: 1, idDictionary: 11 },
      { id: 3, idNovel: 2, idDictionary: 10 },
    ])
    .execute();

  await db
    .insertInto("dictionaryCategories")
    .values([
      { id: 100, idDictionary: 10, name: "Names" },
      { id: 101, idDictionary: 10, name: "Title" },
    ])
    .execute();

  await db
    .insertInto("dictionaryEntries")
    .values([
      {
        id: 1,
        idCategory: 100,
        idDictionary: 10,
        entryOriginal: "短",
        entryTranslation: "short",
        description: null,
        length: 3,
        sufix: null,
        prefix: null,
        simplified: "短",
      },
      {
        id: 2,
        idCategory: 100,
        idDictionary: 10,
        entryOriginal: "長い単語",
        entryTranslation: "long",
        description: "note",
        length: 12,
        sufix: null,
        prefix: null,
        simplified: "長い単語",
      },
      {
        id: 3,
        idCategory: 100,
        idDictionary: 10,
        entryOriginal: "後",
        entryTranslation: "after",
        description: null,
        length: 3,
        sufix: 100,
        prefix: null,
        simplified: "後",
      },
    ])
    .execute();
}

describe("catalog and cache-dictionary routes", () => {
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

  it("returns the novel list and a single novel with nested dictionaries", async () => {
    const list = await request("/api/novel");
    expect(list.statusCode).toBe(200);
    expect(list.headers["content-type"]).toMatch(/application\/json/);
    const expectedList =
      '[{"id":1,"code":"n1234ab","nameOriginal":"\\u6e90","nameCustom":"Source","driver":"syosetu","numberChapters":2,"flagR18":0,"completed":0,"addedBy":"test","show":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/","dictionary":[{"id":10,"name":"\\u4eba\\u540d","language":"english","dateCreated":"2020-01-02T03:04:05.000000Z","dateRevision":"2021-02-03T04:05:06.000000Z","count_categories":2},{"id":11,"name":"Places","language":"english","dateCreated":"2020-03-04T05:06:07.000000Z","dateRevision":null,"count_categories":0}]},{"id":2,"code":"book-manual","nameOriginal":"\\u624b\\u52d5","nameCustom":"Manual","driver":"manual","numberChapters":0,"flagR18":0,"completed":0,"addedBy":"test","show":1,"urlSource":"","dictionary":[{"id":10,"name":"\\u4eba\\u540d","language":"english","dateCreated":"2020-01-02T03:04:05.000000Z","dateRevision":"2021-02-03T04:05:06.000000Z","count_categories":2}]},{"id":3,"code":"1234567890123456789","nameOriginal":"\\u30ab\\u30af\\u30e8\\u30e0","nameCustom":"Kakuyomu","driver":"kakuyomu","numberChapters":1,"flagR18":0,"completed":0,"addedBy":"test","show":1,"urlSource":"https:\\/\\/kakuyomu.jp\\/works\\/1234567890123456789","dictionary":[]}]';
    expect(list.body).toBe(expectedList);

    const one = await request("/api/novel/1");
    expect(one.statusCode).toBe(200);
    expect(one.body).toBe(
      '{"id":1,"code":"n1234ab","nameOriginal":"\\u6e90","nameCustom":"Source","driver":"syosetu","numberChapters":2,"flagR18":0,"completed":0,"addedBy":"test","show":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/","dictionary":[{"id":10,"name":"\\u4eba\\u540d","language":"english","dateCreated":"2020-01-02T03:04:05.000000Z","dateRevision":"2021-02-03T04:05:06.000000Z","count_categories":2},{"id":11,"name":"Places","language":"english","dateCreated":"2020-03-04T05:06:07.000000Z","dateRevision":null,"count_categories":0}]}',
    );
  });

  it("filters novels by nameCustom when search is set, and 404s a missing novel", async () => {
    const res = await request("/api/novel?search=Manual");
    expect(res.statusCode).toBe(200);
    const parsed = JSON.parse(res.body);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(2);
    expect(parsed[0].urlSource).toBe("");
    const missing = await request("/api/novel/99");
    expect(missing.statusCode).toBe(404);
  });

  it("returns novels by dictionary and dictionaries by novel", async () => {
    const novels = await request("/api/novel/dictionary/10");
    expect(novels.statusCode).toBe(200);
    const novelIds = JSON.parse(novels.body).map((n: { id: number }) => n.id);
    expect(novelIds).toEqual([1, 2]);

    const dicts = await request("/api/dictionary/novel/1");
    expect(dicts.statusCode).toBe(200);
    const dictIds = JSON.parse(dicts.body).map((d: { id: number }) => d.id);
    expect(dictIds).toEqual([10, 11]);
    expect(JSON.parse(dicts.body)[0].novel[0].urlSource).toMatch(/^https:\/\//);
    expect("dictionary" in JSON.parse(dicts.body)[0].novel[0]).toBe(false);
  });

  it("returns categories, entries, and a single entry (lookup by id only)", async () => {
    const cats = await request("/api/category/10");
    expect(cats.body).toBe(
      '[{"id":100,"idDictionary":10,"name":"Names","count_entries":3},{"id":101,"idDictionary":10,"name":"Title","count_entries":0}]',
    );
    const one = await request("/api/category/10/100");
    expect(one.body).toBe('{"id":100,"idDictionary":10,"name":"Names","count_entries":3}');
    expect((await request("/api/category/10/999")).statusCode).toBe(404);

    const entries = await request("/api/entry/10/100");
    const parsed = JSON.parse(entries.body);
    expect(parsed.map((e: { id: number }) => e.id)).toEqual([1, 2, 3]);
    expect(parsed[0].entryOriginal).toBe("短");
    const single = await request("/api/entry/10/101/2");
    expect(single.statusCode).toBe(200);
    expect(JSON.parse(single.body).id).toBe(2);
    expect((await request("/api/entry/10/100/99")).statusCode).toBe(404);
  });

  it("returns POST /api/meta for drivers and languages, and [] when meta is omitted", async () => {
    const res = await request("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meta: ["drivers", "languages"] }),
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(
      '{"drivers":{"manual":"Manual","syosetu":"Syosetu ni Narou \\/ \\u5c0f\\u8aac\\u5bb6\\u306b\\u306a\\u308d\\u3046","kakuyomu":"Kakuyomu \\/ \\u30ab\\u30af\\u30e8\\u30e0"},"languages":{"english":"English"}}',
    );
    const empty = await request("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    expect(empty.body).toBe("[]");
  });

  it("builds the cache-dictionary blob, caches it on disk, and PUT rebuilds after invalidation", async () => {
    const first = await request("/api/cache/dictionary/10");
    expect(first.statusCode).toBe(200);
    const parsed = JSON.parse(first.body);
    expect(Object.keys(parsed)).toEqual([
      "id",
      "name",
      "language",
      "dateCreated",
      "dateRevision",
      "count_categories",
      "dictionary_category",
      "dictionary_entry",
    ]);
    expect(parsed.count_categories).toBe(2);
    expect(parsed.dictionary_category[0].count_entries).toEqual([{ idCategory: 100, count: 3 }]);
    expect(parsed.dictionary_category[1].count_entries).toEqual([]);
    expect(parsed.dictionary_entry.map((e: { id: number }) => e.id)).toEqual([2, 1, 3]);
    expect(parsed.dictionary_entry[0].laravel_through_key).toBe(10);
    expect(parsed.dateCreated).toBe("2020-01-02T03:04:05.000000Z");

    const cache = new FileCache(cacheDir);
    const path = cache.cacheDictionaryPath(10);
    await access(path);

    await cache.invalidateDictionary(10);
    const rebuilt = await request("/api/cache/dictionary/10", { method: "PUT" });
    expect(rebuilt.statusCode).toBe(200);
    expect(rebuilt.body).toBe(first.body);
    expect((await request("/api/cache/dictionary/99")).statusCode).toBe(404);
  });
});
