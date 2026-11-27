import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import { refreshNovelUpdateDates } from "../../src/services/novelUpdateDates.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

const now = () => new Date("2026-11-16T14:00:00Z");

describe("novels.lastChapterAddedAt / lastChapterRevisedAt", () => {
  let db: Db;
  let app: FastifyInstance;
  let baseUrl: string;

  async function request(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const res = await fetch(baseUrl + path, { ...init, headers });
    return { status: res.status, body: await res.text() };
  }

  async function dates(id: number) {
    const row = await db
      .selectFrom("novels")
      .select(["lastChapterAddedAt", "lastChapterRevisedAt"])
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    return { added: row.lastChapterAddedAt, revised: row.lastChapterRevisedAt };
  }

  function novel(id: number) {
    return {
      id,
      code: `manual-${id}`,
      nameOriginal: "手動",
      nameCustom: `Manual ${id}`,
      driver: "manual",
      numberChapters: 0,
      flagSyosetu: 0,
      flagR18: 0,
      completed: 0,
      addedBy: "test",
      show: 1,
    };
  }

  function chapter(idNovel: number, no: number, dateCreated: string, dateRevision: string | null) {
    return {
      idNovel,
      no,
      title: `c${no}`,
      textOriginal: "x",
      textRevision: null,
      textCustom: null,
      dateOriginalPost: "2020-01-01 00:00:00",
      dateCreated,
      dateRevision,
      noCode: null,
    };
  }

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { kakuyomuNow: now, chapterNow: now });
    db = harness.db;
    app = harness.app;
    baseUrl = harness.baseUrl;
    await db.insertInto("novels").values([novel(60), novel(61)]).execute();
    await db
      .insertInto("chapters")
      .values([
        // genuinely revised long after creation
        chapter(60, 1, "2020-01-02 03:04:06", "2021-02-03 04:05:06"),
        // freshly inserted: the insert stamps dateRevision 2s after dateCreated, which is not a revision
        chapter(60, 2, "2022-05-06 07:08:09", "2022-05-06 07:08:11"),
        chapter(61, 1, "2023-01-01 00:00:00", null),
      ])
      .execute();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("starts empty, then the backfill/recompute fills every novel", async () => {
    expect(await dates(60)).toEqual({ added: null, revised: null });
    const touched = await refreshNovelUpdateDates(db);
    expect(touched).toBe(2);
    expect(await dates(60)).toEqual({ added: "2022-05-06 07:08:09", revised: "2021-02-03 04:05:06" });
    expect(await dates(61)).toEqual({ added: "2023-01-01 00:00:00", revised: null });
  });

  it("can be limited to one novel", async () => {
    await db.updateTable("novels").set({ lastChapterAddedAt: null }).execute();
    expect(await refreshNovelUpdateDates(db, 61)).toBe(1);
    expect((await dates(61)).added).toBe("2023-01-01 00:00:00");
    expect((await dates(60)).added).toBeNull();
    await refreshNovelUpdateDates(db, 60);
  });

  it("is exposed on the novel JSON as ISO timestamps", async () => {
    const res = await request("/api/novel/60");
    expect(res.status, res.body).toBe(200);
    const json = JSON.parse(res.body);
    expect(json.lastChapterAddedAt).toBe("2022-05-06T07:08:09.000000Z");
    expect(json.lastChapterRevisedAt).toBe("2021-02-03T04:05:06.000000Z");
    const empty = JSON.parse((await request("/api/novel/61")).body);
    expect(empty.lastChapterRevisedAt).toBeNull();
  });

  it("follows chapter insert, revise and delete through the API", async () => {
    const inserted = await request("/api/chapter/61", {
      method: "POST",
      body: JSON.stringify({ no: 2, title: "new", textOriginal: "t" }),
    });
    expect(inserted.status, inserted.body).toBe(200);
    // an insert counts as added, not revised
    const afterInsert = await dates(61);
    expect(afterInsert.added! > "2026-11-01 00:00:00").toBe(true);
    expect(afterInsert.revised).toBeNull();

    const revised = await request("/api/chapter/61/1", { method: "PUT", body: JSON.stringify({ title: "edited" }) });
    expect(revised.status, revised.body).toBe(200);
    const afterRevise = await dates(61);
    expect(afterRevise.added).toBe(afterInsert.added);
    expect(afterRevise.revised! > "2026-11-01 00:00:00").toBe(true);
    // the cached novel JSON is refreshed too
    expect(JSON.parse((await request("/api/novel/61")).body).lastChapterAddedAt).toBe(
      afterInsert.added!.replace(" ", "T") + ".000000Z",
    );

    const deleted = await request("/api/chapter/61/2", { method: "DELETE" });
    expect(deleted.status, deleted.body).toBe(200);
    expect(await dates(61)).toEqual({ added: "2023-01-01 00:00:00", revised: afterRevise.revised });
  });
});
