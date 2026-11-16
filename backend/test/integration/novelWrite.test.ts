import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

describe("novel POST, PUT, and DELETE", () => {
  let db: Db;
  let app: FastifyInstance;
  let cacheDir: string;
  let chapterCacheDir: string;
  let baseUrl: string;
  let createdId: number;

  async function request(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const res = await fetch(baseUrl + path, { ...init, headers });
    return { status: res.status, body: await res.text() };
  }

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp();
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    chapterCacheDir = harness.chapterCacheDir;
    baseUrl = harness.baseUrl;

    await db
      .insertInto("novels")
      .values({
        id: 50,
        code: "n0000aa",
        nameOriginal: "既存",
        nameCustom: "Existing",
        driver: "syosetu",
        numberChapters: 1,
        flagSyosetu: 1,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      })
      .execute();
    await db
      .insertInto("dictionaries")
      .values({
        id: 10,
        name: "人名",
        language: "english",
        dateCreated: "2020-01-02 03:04:05",
        dateRevision: "2021-02-03 04:05:06",
      })
      .execute();
    await db
      .insertInto("dictionaries")
      .values({
        id: 11,
        name: "Places",
        language: "english",
        dateCreated: "2020-03-04 05:06:07",
        dateRevision: null,
      })
      .execute();
    await db.insertInto("novelsDictionaries").values({ idNovel: 50, idDictionary: 10 }).execute();
    await db
      .insertInto("chapters")
      .values({
        idNovel: 50,
        no: 1,
        title: "既存話",
        textOriginal: "text",
        textRevision: null,
        textCustom: null,
        dateOriginalPost: null,
        dateCreated: "2020-01-01 00:00:00",
        dateRevision: null,
        noCode: null,
      })
      .execute();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("creates a novel with optional dictionaries and invalidates the catalog cache", async () => {
    const primed = await request("/api/novel");
    expect(primed.status).toBe(200);
    expect(JSON.parse(primed.body)).toHaveLength(1);

    const res = await request("/api/novel/", {
      method: "POST",
      body: JSON.stringify({
        novel: {
          code: "n1234zz",
          nameOriginal: "新作",
          nameCustom: "New Work",
          driver: "syosetu",
          flagR18: null,
          completed: false,
          addedBy: "tester",
          show: true,
        },
        dictionaries: [10, 11],
      }),
    });
    expect(res.status, res.body).toBe(200);
    const novel = JSON.parse(res.body);
    expect(novel.code).toBe("n1234zz");
    expect(novel.nameOriginal).toBe("新作");
    expect(novel.nameCustom).toBe("New Work");
    expect(novel.driver).toBe("syosetu");
    expect(novel.numberChapters).toBe(0);
    expect(novel.flagR18).toBe(0);
    expect(novel.completed).toBe(0);
    expect(novel.addedBy).toBe("tester");
    expect(novel.show).toBe(1);
    expect(novel.urlSource).toBe("https://ncode.syosetu.com/n1234zz/");
    expect(novel.dictionary.map((d: { id: number }) => d.id)).toEqual([10, 11]);
    createdId = novel.id;
    expect(createdId).toBeGreaterThan(0);

    const list = JSON.parse((await request("/api/novel")).body);
    expect(list.map((n: { id: number }) => n.id).sort((a: number, b: number) => a - b)).toEqual([createdId, 50].sort((a, b) => a - b));

    const chapters = await db.selectFrom("chapters").select("no").where("idNovel", "=", createdId).execute();
    expect(chapters).toEqual([]);
  });

  it("returns 409 on a duplicate code and 400 on an invalid body or missing dictionary", async () => {
    const dup = await request("/api/novel", {
      method: "POST",
      body: JSON.stringify({ novel: { code: "n0000aa", nameOriginal: "dup", addedBy: "tester" } }),
    });
    expect(dup.status).toBe(409);

    const missing = await request("/api/novel", { method: "POST", body: JSON.stringify({ novel: { code: "n1" } }) });
    expect(missing.status).toBe(400);

    const badDict = await request("/api/novel", {
      method: "POST",
      body: JSON.stringify({
        novel: { code: "n9999zz", nameOriginal: "x", addedBy: "tester" },
        dictionaries: [999],
      }),
    });
    expect(badDict.status).toBe(400);

    const badDriver = await request("/api/novel", {
      method: "POST",
      body: JSON.stringify({
        novel: { code: "n5555zz", nameOriginal: "x", addedBy: "tester", driver: "alphapolis" },
      }),
    });
    expect(badDriver.status, badDriver.body).toBe(200);
    const novel = JSON.parse(badDriver.body);
    expect(novel.driver).toBe(null);
    expect(novel.urlSource).toBe("");
    await request(`/api/novel/${novel.id}`, { method: "DELETE" });
  });

  it("updates fillable fields and replaces dictionaries without zeroing omitted numberChapters", async () => {
    await db.updateTable("novels").set({ numberChapters: 3 }).where("id", "=", createdId).execute();

    const res = await request(`/api/novel/${createdId}/`, {
      method: "PUT",
      body: JSON.stringify({
        novel: {
          nameCustom: "Renamed",
          completed: 1,
          show: 0,
        },
        dictionaries: [11],
      }),
    });
    expect(res.status, res.body).toBe(200);
    const novel = JSON.parse(res.body);
    expect(novel.nameCustom).toBe("Renamed");
    expect(novel.completed).toBe(1);
    expect(novel.show).toBe(0);
    expect(novel.numberChapters).toBe(3);
    expect(novel.code).toBe("n1234zz");
    expect(novel.dictionary.map((d: { id: number }) => d.id)).toEqual([11]);

    const missing = await request("/api/novel/999", {
      method: "PUT",
      body: JSON.stringify({ novel: { nameCustom: "nope" } }),
    });
    expect(missing.status).toBe(404);
  });

  it("deletes the novel, its chapters, images, pivots, and cached catalog/html", async () => {
    const victim = JSON.parse(
      (
        await request("/api/novel", {
          method: "POST",
          body: JSON.stringify({
            novel: { code: "n4444zz", nameOriginal: "削除", addedBy: "tester", driver: "manual" },
            dictionaries: [10],
          }),
        })
      ).body,
    );
    const id = victim.id as number;
    await db
      .insertInto("chapters")
      .values({
        idNovel: id,
        no: 1,
        title: "話",
        textOriginal: "text",
        textRevision: null,
        textCustom: null,
        dateOriginalPost: null,
        dateCreated: "2020-01-01 00:00:00",
        dateRevision: null,
        noCode: null,
      })
      .execute();
    await db
      .insertInto("chapter_images")
      .values({
        idNovel: id,
        no: 1,
        col: "textOriginal",
        sha256: "a".repeat(64),
        ext: "png",
        bytes: 12,
        refs: 1,
      })
      .execute();

    const htmlDir = join(chapterCacheDir, "10", String(id));
    await mkdir(htmlDir, { recursive: true });
    await writeFile(join(htmlDir, "1.html"), "<p>stale</p>");
    await mkdir(join(cacheDir, "novel"), { recursive: true });
    await mkdir(join(cacheDir, "novel-list"), { recursive: true });
    await writeFile(join(cacheDir, "novel", `${id}.json`), '{"stale":true}');
    await writeFile(join(cacheDir, "novel-list", "all.json"), "[]");

    const res = await request(`/api/novel/${id}`, { method: "DELETE" });
    expect(res.status, res.body).toBe(200);
    expect(res.body).toBe("1");

    const gone = await request(`/api/novel/${id}`);
    expect(gone.status).toBe(404);
    const chapters = await db.selectFrom("chapters").select("no").where("idNovel", "=", id).execute();
    expect(chapters).toEqual([]);
    const images = await db.selectFrom("chapter_images").select("id").where("idNovel", "=", id).execute();
    expect(images).toEqual([]);
    const pivots = await db.selectFrom("novelsDictionaries").select("id").where("idNovel", "=", id).execute();
    expect(pivots).toEqual([]);
    const htmlGone = await readFile(join(htmlDir, "1.html")).then(
      () => false,
      () => true,
    );
    expect(htmlGone).toBe(true);
    const cacheGone = await readFile(join(cacheDir, "novel", `${id}.json`)).then(
      () => false,
      () => true,
    );
    expect(cacheGone).toBe(true);

    const missing = await request("/api/novel/999", { method: "DELETE" });
    expect(missing.status).toBe(404);
  });
});
