import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

const now = () => new Date("2026-11-16T15:00:00Z");

describe("dictionary, category, and entry writes", () => {
  let db: Db;
  let app: FastifyInstance;
  let cacheDir: string;
  let chapterCacheDir: string;
  let laravelDictDir: string;
  let baseUrl: string;
  let dictId: number;
  let defaultCat: number;
  let extraCat: number;
  let entryId: number;

  async function request(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const res = await fetch(baseUrl + path, { ...init, headers });
    return { status: res.status, body: await res.text() };
  }

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp(
      { LARAVEL_DICTIONARY_CACHE_DIR: "" },
      { kakuyomuNow: now, chapterNow: now },
    );
    // startApp uses env for laravel dict dir only if provided before mkdtemp override.
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    chapterCacheDir = harness.chapterCacheDir;
    laravelDictDir = harness.chapterCacheDir + "-dict";
    baseUrl = harness.baseUrl;
    await mkdir(laravelDictDir, { recursive: true });
    await db
      .insertInto("novels")
      .values({
        id: 40,
        code: "manual-40",
        nameOriginal: "手動",
        nameCustom: "Manual",
        driver: "manual",
        numberChapters: 0,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      })
      .execute();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("creates a dictionary with a default category and optional novel links", async () => {
    const res = await request("/api/dictionary", {
      method: "POST",
      body: JSON.stringify({ dictionary: { name: "Probe", language: "english" }, novels: [40] }),
    });
    expect(res.status, res.body).toBe(200);
    const dict = JSON.parse(res.body);
    expect(dict.name).toBe("Probe");
    expect(dict.language).toBe("english");
    expect(dict.count_categories).toBe(1);
    expect(dict.novel.map((n: { id: number }) => n.id)).toEqual([40]);
    dictId = dict.id;
    const cats = JSON.parse((await request(`/api/category/${dictId}`)).body);
    expect(cats).toEqual([{ id: cats[0].id, idDictionary: dictId, name: "default", count_entries: 0 }]);
    defaultCat = cats[0].id;
  });

  it("renames a dictionary, adds a category, and writes entries with simplified/length", async () => {
    const renamed = await request(`/api/dictionary/${dictId}`, {
      method: "PUT",
      body: JSON.stringify({ dictionary: { name: "Probe 2", language: "english" } }),
    });
    expect(renamed.status, renamed.body).toBe(200);
    expect(JSON.parse(renamed.body).name).toBe("Probe 2");

    const cat = await request(`/api/category/${dictId}`, { method: "POST", body: JSON.stringify({ name: "Names" }) });
    expect(cat.status, cat.body).toBe(200);
    const category = JSON.parse(cat.body);
    expect(category.name).toBe("Names");
    expect(category.count_entries).toBe(0);
    extraCat = category.id;

    const entry = await request(`/api/entry/${dictId}/${extraCat}`, {
      method: "POST",
      body: JSON.stringify({ entryOriginal: "「名前」", entryTranslation: "Name", description: "d", sufix: "null" }),
    });
    expect(entry.status, entry.body).toBe(200);
    const saved = JSON.parse(entry.body);
    expect(saved.entryOriginal).toBe("「名前」");
    expect(saved.simplified).toBe("名前");
    expect(saved.length).toBe(Buffer.byteLength("名前", "utf8"));
    expect(saved.sufix).toBeNull();
    entryId = saved.id;

    const list = JSON.parse((await request(`/api/category/${dictId}`)).body);
    expect(list.find((c: { name: string }) => c.name === "Names").count_entries).toBe(1);
  });

  it("fullSave updates entries, bumps dateRevision, and purges static HTML plus list cache", async () => {
    const htmlDir = join(chapterCacheDir, String(dictId), "40");
    await mkdir(htmlDir, { recursive: true });
    await writeFile(join(htmlDir, "1-1.html"), "<p>stale</p>");
    await request(`/api/dictionary/${dictId}`);
    await access(`${cacheDir}/dictionary/${dictId}.json`);

    const res = await request(`/api/dictionary/fullSave/${dictId}`, {
      method: "PUT",
      body: JSON.stringify([
        { id: extraCat, name: "Names", update: true, entries: [{ id: entryId, update: true, entryOriginal: "称号", entryTranslation: "Title", description: "", idCategory: extraCat }] },
        { name: "NewCat", entries: [{ entryOriginal: "added", entryTranslation: "Added" }] },
      ]),
    });
    expect(res.status, res.body).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.changes).toBe(true);
    expect(payload.dateRevision).toBe("2026-11-16T15:00:00.000000Z");
    await expect(access(join(htmlDir, "1-1.html"))).rejects.toThrow();
    const cats = JSON.parse((await request(`/api/category/${dictId}`)).body);
    expect(cats.map((c: { name: string }) => c.name).sort()).toEqual(["Names", "NewCat", "default"]);
    const names = JSON.parse((await request(`/api/entry/${dictId}/${extraCat}`)).body);
    expect(names[0].entryTranslation).toBe("Title");
    expect(names[0].simplified).toBe("称号");
  });

  it("updatebycategory inserts and deletes, then CRUD delete cleans up", async () => {
    const res = await request(`/api/entry/${dictId}/updatebycategory/${extraCat}`, {
      method: "PUT",
      body: JSON.stringify([
        { entryOriginal: "batch", entryTranslation: "Batch" },
        { id: entryId, delete: true, idCategory: extraCat },
      ]),
    });
    expect(res.status, res.body).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.categories.some((c: { name: string }) => c.name === "Names")).toBe(true);
    expect(payload.entries.map((e: { entryOriginal: string }) => e.entryOriginal)).toEqual(["batch"]);

    const delEntry = await request(`/api/entry/${dictId}/${extraCat}/${payload.entries[0].id}`, { method: "DELETE" });
    expect(delEntry.status).toBe(200);
    expect(JSON.parse(delEntry.body)).toBe(1);

    const delCat = await request(`/api/category/${dictId}/${extraCat}`, { method: "DELETE" });
    expect(delCat.status).toBe(200);

    const delDict = await request(`/api/dictionary/${dictId}`, { method: "DELETE" });
    expect(delDict.status, delDict.body).toBe(200);
    expect(JSON.parse(delDict.body)).toBe(1);
    expect((await request(`/api/dictionary/${dictId}`)).status).toBe(404);
  });
});
