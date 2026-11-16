import { access } from "node:fs/promises";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import type { SyosetuClient, SyosetuEpisode, SyosetuIndex } from "../../src/drivers/syosetu.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

function ep(partial: Partial<SyosetuEpisode> & Pick<SyosetuEpisode, "no" | "title" | "dateOriginalPost">): SyosetuEpisode {
  return { arc: null, dateOriginalRevision: null, ...partial };
}

class ScriptedSyosetuClient implements SyosetuClient {
  index: SyosetuIndex;
  bodies = new Map<number, string>();
  indexFetches = 0;
  bodyFetches: number[] = [];

  constructor(index: SyosetuIndex) {
    this.index = index;
  }

  async fetchIndex(): Promise<SyosetuIndex> {
    this.indexFetches += 1;
    return this.index;
  }

  async fetchChapter(_ncode: string, no: number): Promise<{ title: string | null; body: string }> {
    const body = await this.fetchChapterBody(_ncode, no, false);
    const found = this.index.episodes.find((e) => e.no === no);
    return { title: found?.title ?? null, body };
  }

  async fetchChapterBody(_ncode: string, no: number, _r18: boolean): Promise<string> {
    this.bodyFetches.push(no);
    const value = this.bodies.get(no);
    if (value === undefined) throw new Error(`no scripted body for ${no}`);
    return value;
  }
}

const ncode = "n0000aa";

const baseIndex = (): SyosetuIndex => ({
  code: ncode,
  r18: false,
  lastPage: 1,
  episodes: [
    ep({ no: 1, title: "First", dateOriginalPost: "2020-01-02 03:04:00", dateOriginalRevision: "2020-02-03 04:05:00", arc: "Arc One" }),
    ep({ no: 2, title: "Second", dateOriginalPost: "2020-01-03 10:00:00" }),
    ep({ no: 3, title: "Third", dateOriginalPost: "2026-11-01 14:31:00", dateOriginalRevision: "2026-11-01 14:31:00" }),
  ],
});

async function seed(
  db: Db,
  id: number,
  chapters: Array<{ no: number; title: string; post: string; revision?: string | null; text?: string | null; arc?: string | null }>,
) {
  await db
    .insertInto("novels")
    .values({
      id,
      code: ncode,
      nameOriginal: "源",
      nameCustom: "Syosetu Source",
      driver: "syosetu",
      numberChapters: chapters.length,
      flagSyosetu: 1,
      flagR18: 0,
      completed: 0,
      addedBy: "test",
      show: 1,
    })
    .execute();
  if (chapters.length === 0) return;
  await db
    .insertInto("chapters")
    .values(
      chapters.map((c) => ({
        idNovel: id,
        no: c.no,
        noCode: null,
        title: c.title,
        arc: c.arc ?? (c.no < 3 ? "Arc One" : null),
        dateOriginalPost: c.post,
        dateOriginalRevision: c.revision ?? null,
        textOriginal: c.text ?? "old-body",
        dateRevision: "2020-01-01 00:00:00",
      })),
    )
    .execute();
}

describe("Syosetu autoUpdate and updateChapter", () => {
  const client = new ScriptedSyosetuClient(baseIndex());
  let db: Db;
  let app: FastifyInstance;
  let cacheDir: string;
  let baseUrl: string;

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { syosetuClient: client as unknown as SyosetuClient, kakuyomuNow: () => new Date("2026-11-16T13:40:00Z") });
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    baseUrl = harness.baseUrl;
    await seed(db, 30, [
      { no: 1, title: "First", post: "2020-01-02 03:04:00", revision: "2019-10-13 06:53:41", text: "old-1" },
      { no: 2, title: "Second", post: "2020-01-03 10:00:00", text: "old-2" },
    ]);
    client.bodies.set(1, "<p>new-1</p>");
    client.bodies.set(2, "<p>new-2</p>");
    client.bodies.set(3, "<p>new-3</p>");
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("inserts new chapters, fills their text from the chapter page, then writes textRevision from newer index dates", async () => {
    const res = await fetch(`${baseUrl}/api/chapter/autoUpdate/30`);
    const body = await res.text();
    expect(res.status, body).toBe(200);
    const novel = JSON.parse(body);
    expect(novel.id).toBe(30);
    expect(novel.numberChapters).toBe(3);
    expect(novel.driver).toBe("syosetu");

    const rows = await db
      .selectFrom("chapters")
      .select(["no", "noCode", "hasText", "dateOriginalPost", "dateOriginalRevision", "textOriginal", "textRevision"])
      .where("idNovel", "=", 30)
      .orderBy("no", "asc")
      .execute();
    expect(rows.map((r) => Number(r.no))).toEqual([1, 2, 3]);
    expect(rows[2]!.noCode).toBeNull();
    expect(Number(rows[2]!.hasText)).toBe(1);
    expect(rows[2]!.textOriginal).toBe("<p>new-3</p>");
    expect(rows[2]!.dateOriginalPost).toBe("2026-11-01 14:31:00");
    expect(rows[2]!.dateOriginalRevision).toBe("2026-11-01 14:31:00");
    expect(rows[0]!.textOriginal).toBe("old-1");
    expect(rows[0]!.textRevision).toBe("<p>new-1</p>");
    expect(rows[0]!.dateOriginalRevision).toBe("2020-02-03 04:05:00");
    expect(rows[1]!.textOriginal).toBe("old-2");
    expect(rows[1]!.textRevision).toBeNull();
    expect(client.bodyFetches).toContain(3);
    expect(client.bodyFetches).toContain(1);
    expect(client.bodyFetches).not.toContain(2);

    const list = await fetch(`${baseUrl}/api/chapter/30`);
    expect(list.status).toBe(200);
    const chapters = JSON.parse(await list.text());
    expect(chapters).toHaveLength(3);
    expect(chapters[2].no).toBe(3);
    expect(chapters[2].hasText).toBe(1);
    await access(`${cacheDir}/chapter-list/30.json`);
  });

  it("returns the remote index grouped by dateOriginalPost and does not write chapters", async () => {
    const before = await db.selectFrom("chapters").select((eb) => eb.fn.countAll().as("n")).where("idNovel", "=", 30).executeTakeFirstOrThrow();
    const res = await fetch(`${baseUrl}/api/chapter/autoIndex/30`);
    const body = await res.text();
    expect(res.status, body).toBe(200);
    const index = JSON.parse(body);
    expect(index["2020-01-02 03:04:00"][0]).toMatchObject({ idNovel: 30, no: 1, title: "First" });
    expect(index["2026-11-01 14:31:00"][0].no).toBe(3);
    const after = await db.selectFrom("chapters").select((eb) => eb.fn.countAll().as("n")).where("idNovel", "=", 30).executeTakeFirstOrThrow();
    expect(Number(after.n)).toBe(Number(before.n));
  });

  it("reuses the index snapshot for updateChapter and does not fetch a body when dates are unchanged", async () => {
    const before = client.indexFetches;
    const bodiesBefore = client.bodyFetches.length;
    const res = await fetch(`${baseUrl}/api/chapter/30/2/updateChapter`);
    const body = await res.text();
    expect(res.status, body).toBe(200);
    const chapter = JSON.parse(body);
    expect(chapter.no).toBe(2);
    expect(chapter.textOriginal).toBe("old-2");
    expect(client.indexFetches).toBe(before);
    expect(client.bodyFetches.length).toBe(bodiesBefore);
  });
});

describe("Syosetu mid-list insert", () => {
  const index: SyosetuIndex = {
    code: ncode,
    r18: false,
    lastPage: 1,
    episodes: [
      ep({ no: 1, title: "A", dateOriginalPost: "2020-01-01 00:00:00" }),
      ep({ no: 2, title: "Inserted", dateOriginalPost: "2020-06-01 00:00:00" }),
      ep({ no: 3, title: "B", dateOriginalPost: "2020-02-01 00:00:00" }),
      ep({ no: 4, title: "C", dateOriginalPost: "2020-03-01 00:00:00" }),
    ],
  };
  const client = new ScriptedSyosetuClient(index);
  let localApp: FastifyInstance;
  let localDb: Db;
  let localBase: string;
  let cacheDir: string;

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { syosetuClient: client as unknown as SyosetuClient, kakuyomuNow: () => new Date("2026-11-16T14:00:00Z") });
    localDb = harness.db;
    localApp = harness.app;
    localBase = harness.baseUrl;
    cacheDir = harness.cacheDir;
    await seed(localDb, 31, [
      { no: 1, title: "A", post: "2020-01-01 00:00:00", text: "A" },
      { no: 2, title: "B", post: "2020-02-01 00:00:00", text: "B" },
      { no: 3, title: "C", post: "2020-03-01 00:00:00", text: "C" },
    ]);
    for (const no of [1, 2, 3, 4]) client.bodies.set(no, `<p>${no === 2 ? "new" : String.fromCharCode(64 + no)}</p>`);
  }, 120_000);

  afterAll(async () => {
    if (localApp) await localApp.close();
    if (localDb) await localDb.destroy();
  });

  it("matches by dateOriginalPost, shifts nos, and inserts the new chapter in the hole", async () => {
    const res = await fetch(`${localBase}/api/chapter/autoUpdate/31`);
    const body = await res.text();
    expect(res.status, body).toBe(200);
    const rows = await localDb
      .selectFrom("chapters")
      .select(["no", "title", "dateOriginalPost", "textOriginal"])
      .where("idNovel", "=", 31)
      .orderBy("no", "asc")
      .execute();
    expect(rows.map((r) => [Number(r.no), r.title, r.dateOriginalPost])).toEqual([
      [1, "A", "2020-01-01 00:00:00"],
      [2, "Inserted", "2020-06-01 00:00:00"],
      [3, "B", "2020-02-01 00:00:00"],
      [4, "C", "2020-03-01 00:00:00"],
    ]);
    expect(rows[1]!.textOriginal).toBe("<p>new</p>");
    expect(rows[2]!.textOriginal).toBe("B");
    const list = await fetch(`${localBase}/api/chapter/31`);
    expect(list.status).toBe(200);
    expect(JSON.parse(await list.text())).toHaveLength(4);
    await access(`${cacheDir}/chapter-list/31.json`);
  });
});
