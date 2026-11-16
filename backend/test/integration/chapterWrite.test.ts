import { access, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

const now = () => new Date("2026-11-16T14:00:00Z");
const created = "2020-01-02 03:04:06";

describe("chapter PUT/POST/DELETE", () => {
  let db: Db;
  let app: FastifyInstance;
  let cacheDir: string;
  let chapterCacheDir: string;
  let baseUrl: string;

  async function request(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const res = await fetch(baseUrl + path, { ...init, headers });
    return { status: res.status, body: await res.text() };
  }

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { kakuyomuNow: now, chapterNow: now });
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    chapterCacheDir = harness.chapterCacheDir;
    baseUrl = harness.baseUrl;
    await db
      .insertInto("novels")
      .values({
        id: 40,
        code: "manual-40",
        nameOriginal: "手動",
        nameCustom: "Manual Write",
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
        title: "old title",
        textOriginal: "keep-me",
        textRevision: null,
        textCustom: null,
        dateOriginalPost: "2020-01-02 03:04:05",
        dateCreated: created,
        dateRevision: "2021-02-03 04:05:06",
        noCode: null,
      })
      .execute();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("fixes PUT: updates the requested fields, keeps dateCreated and textOriginal, and invalidates caches", async () => {
    const listBefore = await request("/api/chapter/40");
    expect(listBefore.status).toBe(200);
    expect(JSON.parse(listBefore.body)[0].title).toBe("old title");
    await access(`${cacheDir}/chapter-list/40.json`);

    const htmlDir = join(chapterCacheDir, "1", "40");
    await mkdir(htmlDir, { recursive: true });
    await writeFile(join(htmlDir, "1-1.html"), "<p>stale</p>");

    const res = await request("/api/chapter/40/1", {
      method: "PUT",
      body: JSON.stringify({
        title: "new title",
        textCustom: "pong",
        textOriginal: "keep-me",
        dateCreated: "1999-01-01 00:00:00",
        no: 99,
        hasText: 0,
      }),
    });
    expect(res.status, res.body).toBe(200);
    const chapter = JSON.parse(res.body);
    expect(chapter.no).toBe(1);
    expect(chapter.title).toBe("new title");
    expect(chapter.textOriginal).toBe("keep-me");
    expect(chapter.textCustom).toBe("pong");
    expect(chapter.hasText).toBe(1);

    const row = await db
      .selectFrom("chapters")
      .select(["no", "title", "textOriginal", "textCustom", "dateCreated", "dateRevision"])
      .where("idNovel", "=", 40)
      .where("no", "=", 1)
      .executeTakeFirstOrThrow();
    expect(Number(row.no)).toBe(1);
    expect(row.dateCreated).toBe(created);
    expect(row.dateRevision).toBe("2026-11-16 14:00:00");
    expect(row.textOriginal).toBe("keep-me");
    expect(row.textCustom).toBe("pong");

    const listAfter = await request("/api/chapter/40");
    expect(JSON.parse(listAfter.body)[0].title).toBe("new title");
    await expect(access(join(htmlDir, "1-1.html"))).rejects.toThrow();
  });

  it("returns 400 for a non-object PUT body and 404 for a missing chapter", async () => {
    const bad = await request("/api/chapter/40/1", { method: "PUT", body: "[]" });
    expect(bad.status).toBe(400);
    const missing = await request("/api/chapter/40/404", { method: "PUT", body: JSON.stringify({ title: "x" }) });
    expect(missing.status).toBe(404);
  });

  it("inserts a chapter, rejects a duplicate, then deletes it and invalidates the list", async () => {
    const createdChapter = await request("/api/chapter/40", {
      method: "POST",
      body: JSON.stringify({ no: 2, title: "inserted", textOriginal: "new-chapter" }),
    });
    expect(createdChapter.status, createdChapter.body).toBe(200);
    const chapter = JSON.parse(createdChapter.body);
    expect(chapter.no).toBe(2);
    expect(chapter.textOriginal).toBe("new-chapter");
    expect(chapter.hasText).toBe(1);

    const dup = await request("/api/chapter/40", {
      method: "POST",
      body: JSON.stringify({ no: 2, title: "again" }),
    });
    expect(dup.status).toBe(409);

    const missingNo = await request("/api/chapter/40", { method: "POST", body: JSON.stringify({ title: "nope" }) });
    expect(missingNo.status).toBe(400);

    const list = await request("/api/chapter/40");
    expect(JSON.parse(list.body).map((c: { no: number }) => c.no)).toEqual([1, 2]);

    const deleted = await request("/api/chapter/40/2", { method: "DELETE" });
    expect(deleted.status, deleted.body).toBe(200);
    expect(JSON.parse(deleted.body)).toBe(1);

    const gone = await request("/api/chapter/40/2");
    expect(gone.status).toBe(404);
    const listAfter = await request("/api/chapter/40");
    expect(JSON.parse(listAfter.body).map((c: { no: number }) => c.no)).toEqual([1]);

    const missingDelete = await request("/api/chapter/40/2", { method: "DELETE" });
    expect(missingDelete.status).toBe(404);
  });
});
