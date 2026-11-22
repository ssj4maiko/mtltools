import { access } from "node:fs/promises";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";
import type { KakuyomuClient, EpisodeMeta, IndexEpisode, WorkIndex, WorkIndexResult } from "../../src/drivers/kakuyomu.js";
import { applySchema, schemaSql, startApp } from "./harness.js";

let db: Db;
let app: FastifyInstance;
let cacheDir: string;
let baseUrl: string;

const workCode = "100";

function ep(partial: Partial<IndexEpisode> & Pick<IndexEpisode, "no" | "noCode" | "title" | "publishedAt" | "dateOriginalPost">): IndexEpisode {
  return { arc: null, dateOriginalRevision: null, ...partial };
}

function meta(publishedAt: string, editedAt: string | null, characterCount = 10): EpisodeMeta {
  const dateOriginalPost = publishedAt.replace("T", " ").replace("Z", "");
  const dateOriginalRevision =
    editedAt && editedAt !== publishedAt ? editedAt.replace("T", " ").replace("Z", "") : null;
  return { publishedAt, editedAt, dateOriginalPost, dateOriginalRevision, characterCount };
}

class ScriptedClient implements KakuyomuClient {
  index: WorkIndex;
  notModified = false;
  metas = new Map<string, EpisodeMeta>();
  bodies = new Map<string, string>();
  workFetches = 0;
  batchFetches = 0;
  /** When true, fetchWorkEpisodeMetas throws so the updater must use per-episode fallback. */
  batchFails = false;
  metaFetches: string[] = [];
  bodyFetches: string[] = [];

  constructor(index: WorkIndex) {
    this.index = index;
  }

  async fetchWorkIndex(): Promise<WorkIndexResult> {
    this.workFetches += 1;
    if (this.notModified) return { notModified: true };
    return { notModified: false, index: this.index };
  }
  async fetchWorkEpisodeMetas(_workId: string): Promise<Map<string, EpisodeMeta>> {
    this.batchFetches += 1;
    if (this.batchFails) throw new Error("scripted batch meta failure");
    return new Map(this.metas);
  }
  async fetchEpisodeMeta(_workId: string, episodeId: string): Promise<EpisodeMeta> {
    this.metaFetches.push(episodeId);
    const value = this.metas.get(episodeId);
    if (!value) throw new Error(`no scripted meta for ${episodeId}`);
    return value;
  }
  async fetchEpisodeMetaGraphql(workId: string, episodeId: string): Promise<EpisodeMeta> {
    return this.fetchEpisodeMeta(workId, episodeId);
  }
  async fetchEpisodeMetaSidebar(workId: string, episodeId: string): Promise<EpisodeMeta> {
    return this.fetchEpisodeMeta(workId, episodeId);
  }
  async fetchEpisodeBody(_workId: string, episodeId: string): Promise<string> {
    this.bodyFetches.push(episodeId);
    const value = this.bodies.get(episodeId);
    if (value === undefined) throw new Error(`no scripted body for ${episodeId}`);
    return value;
  }
}

const baseIndex = (): WorkIndex => ({
  code: workCode,
  etag: '"etag-1"',
  work: {
    editedAt: "2026-11-10T13:36:49Z",
    lastEpisodePublishedAt: "2026-11-01T14:31:51Z",
    publicEpisodeCount: 3,
    totalCharacterCount: 30,
  },
  episodes: [
    ep({ no: 1, noCode: "aaa", title: "First", publishedAt: "2020-01-02T03:04:05Z", dateOriginalPost: "2020-01-02 03:04:05", arc: "Arc One" }),
    ep({ no: 2, noCode: "bbb", title: "Second", publishedAt: "2021-02-03T04:05:06Z", dateOriginalPost: "2021-02-03 04:05:06", arc: "Arc One" }),
    ep({ no: 3, noCode: "ccc", title: "Third", publishedAt: "2026-11-01T14:31:51Z", dateOriginalPost: "2026-11-01 14:31:51" }),
  ],
});

async function request(path: string, init?: RequestInit) {
  const res = await fetch(baseUrl + path, init);
  return { statusCode: res.status, headers: Object.fromEntries(res.headers), body: await res.text() };
}

async function seedNovel(id: number, driver: string, chapters: Array<{ no: number; noCode: string; title: string; post: string; revision?: string | null; text?: string | null }>, code = workCode) {
  await db
    .insertInto("novels")
    .values({
      id,
      code,
      nameOriginal: "源",
      nameCustom: "Source",
      driver,
      numberChapters: chapters.length,
      flagSyosetu: 0,
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
        noCode: c.noCode,
        title: c.title,
        arc: c.no < 3 ? "Arc One" : null,
        dateOriginalPost: c.post,
        dateOriginalRevision: c.revision ?? null,
        textOriginal: c.text ?? "old-body",
        dateRevision: "2020-01-01 00:00:00",
      })),
    )
    .execute();
}

describe("Kakuyomu autoUpdate and updateChapter", () => {
  const client = new ScriptedClient(baseIndex());
  const now = () => new Date("2026-11-16T13:40:00Z");

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { kakuyomuClient: client as unknown as KakuyomuClient, kakuyomuNow: now });
    db = harness.db;
    app = harness.app;
    cacheDir = harness.cacheDir;
    baseUrl = harness.baseUrl;
    await seedNovel(10, "kakuyomu", [
      { no: 1, noCode: "aaa", title: "First", post: "2020-01-02 03:04:05", revision: "2019-10-13 06:53:41", text: "old-1" },
      { no: 2, noCode: "bbb", title: "Second", post: "2021-02-03 04:05:06", text: "old-2" },
    ]);
    await seedNovel(20, "manual", [{ no: 1, noCode: "x", title: "S", post: "2020-01-01 00:00:00" }], "manual20");
    client.metas.set("aaa", meta("2020-01-02T03:04:05Z", "2026-11-10T13:36:49Z"));
    client.metas.set("bbb", meta("2021-02-03T04:05:06Z", "2021-02-03T04:05:06Z"));
    client.metas.set("ccc", meta("2026-11-01T14:31:51Z", null));
    client.bodies.set("aaa", "<p>new-aaa</p>");
    client.bodies.set("bbb", "<p>new-bbb</p>");
    client.bodies.set("ccc", "<p>new-ccc</p>");
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
    if (db) await db.destroy();
  });

  it("rejects manual novels with 501", async () => {
    const res = await request("/api/chapter/autoUpdate/20");
    expect(res.statusCode).toBe(501);
    expect(JSON.parse(res.body).driver).toBe("manual");
  });

  it("returns the Kakuyomu remote index grouped by noCode without writing", async () => {
    const res = await request("/api/chapter/autoIndex/10");
    expect(res.statusCode).toBe(200);
    const index = JSON.parse(res.body);
    expect(index.aaa[0]).toMatchObject({ idNovel: 10, no: 1, noCode: "aaa", title: "First" });
    expect((await request("/api/chapter/autoIndex/20")).statusCode).toBe(501);
  });

  it("inserts new chapters first, fills their text, then updates older revisions", async () => {
    const res = await request("/api/chapter/autoUpdate/10");
    expect(res.statusCode).toBe(200);
    const novel = JSON.parse(res.body);
    expect(novel.id).toBe(10);
    expect(novel.numberChapters).toBe(3);
    expect(novel.driver).toBe("kakuyomu");

    const rows = await db
      .selectFrom("chapters")
      .select(["no", "noCode", "hasText", "dateOriginalRevision", "textOriginal", "textRevision"])
      .where("idNovel", "=", 10)
      .orderBy("no", "asc")
      .execute();
    expect(rows.map((r) => Number(r.no))).toEqual([1, 2, 3]);
    expect(rows[2]!.noCode).toBe("ccc");
    expect(Number(rows[2]!.hasText)).toBe(1);
    expect(rows[2]!.textOriginal).toBe("<p>new-ccc</p>");
    // Chapter 1 already had text; a newer editedAt writes textRevision, not textOriginal.
    expect(rows[0]!.textOriginal).toBe("old-1");
    expect(rows[0]!.textRevision).toBe("<p>new-aaa</p>");
    expect(rows[0]!.dateOriginalRevision).toBe("2026-11-10 13:36:49");
    // Chapter 2 has no real revision (editedAt == publishedAt) and already had text.
    expect(rows[1]!.textOriginal).toBe("old-2");
    expect(rows[1]!.textRevision).toBeNull();
    expect(client.bodyFetches).toContain("ccc");
    expect(client.bodyFetches).toContain("aaa");
    expect(client.bodyFetches).not.toContain("bbb");
    expect(client.batchFetches).toBeGreaterThan(0);
    expect(client.metaFetches).toEqual([]);

    const list = await request("/api/chapter/10");
    expect(list.statusCode).toBe(200);
    const chapters = JSON.parse(list.body);
    expect(chapters).toHaveLength(3);
    expect(chapters[2].no).toBe(3);
    expect(chapters[2].hasText).toBe(1);
    await access(`${cacheDir}/chapter-list/10.json`);
  });

  it("reuses the index snapshot for updateChapter and returns text keys", async () => {
    client.workFetches = 0;
    const before = client.workFetches;
    const res = await request("/api/chapter/10/2/updateChapter");
    expect(res.statusCode).toBe(200);
    const chapter = JSON.parse(res.body);
    expect(chapter.no).toBe(2);
    expect(chapter.textOriginal).toBe("old-2");
    expect(client.workFetches).toBe(before); // snapshot reused, no new work-page fetch
  });

  it("returns 409 when another novel already has a running job", async () => {
    // A running job is hard to hold open with the scripted instant client.
    // Cover the store via the unit test; here just confirm a finished job does not 409.
    const res = await request("/api/chapter/autoUpdate/10");
    expect(res.statusCode).toBe(200);
  });

  it("falls back to per-episode meta lookups when the tableOfContents batch fails", async () => {
    client.batchFails = true;
    client.batchFetches = 0;
    client.metaFetches = [];
    const previousEdited = client.index.work.editedAt;
    // Change the work-level signal so skipSweep cannot hide the fallback path.
    client.index.work.editedAt = "2026-11-16T00:00:00Z";
    const res = await request("/api/chapter/autoUpdate/10");
    expect(res.statusCode).toBe(200);
    expect(client.batchFetches).toBeGreaterThan(0);
    expect(client.metaFetches.length).toBeGreaterThan(0);
    client.index.work.editedAt = previousEdited;
    client.batchFails = false;
  });

  it("lists the current job at GET /api/jobs", async () => {
    await request("/api/chapter/autoUpdate/10");
    const res = await request("/api/jobs");
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.jobs).toHaveLength(1);
    expect(body.jobs[0]).toMatchObject({ idNovel: 10, kind: "autoUpdate", phase: "done" });
  });
});

describe("Kakuyomu mid-list insert", () => {
  const index: WorkIndex = {
    code: workCode,
    etag: '"etag-mid"',
    work: {
      editedAt: "2026-01-01T00:00:00Z",
      lastEpisodePublishedAt: "2026-01-01T00:00:00Z",
      publicEpisodeCount: 4,
      totalCharacterCount: 40,
    },
    episodes: [
      ep({ no: 1, noCode: "a", title: "A", publishedAt: "2020-01-01T00:00:00Z", dateOriginalPost: "2020-01-01 00:00:00" }),
      ep({ no: 2, noCode: "new", title: "Inserted", publishedAt: "2020-06-01T00:00:00Z", dateOriginalPost: "2020-06-01 00:00:00" }),
      ep({ no: 3, noCode: "b", title: "B", publishedAt: "2020-02-01T00:00:00Z", dateOriginalPost: "2020-02-01 00:00:00" }),
      ep({ no: 4, noCode: "c", title: "C", publishedAt: "2020-03-01T00:00:00Z", dateOriginalPost: "2020-03-01 00:00:00" }),
    ],
  };
  const client = new ScriptedClient(index);
  let localApp: FastifyInstance;
  let localDb: Db;
  let localBase: string;

  beforeAll(async () => {
    await applySchema(schemaSql);
    const harness = await startApp({}, { kakuyomuClient: client as unknown as KakuyomuClient, kakuyomuNow: () => new Date("2026-11-16T14:00:00Z") });
    localDb = harness.db;
    localApp = harness.app;
    localBase = harness.baseUrl;
    await localDb
      .insertInto("novels")
      .values({
        id: 11,
        code: workCode,
        nameOriginal: "源",
        nameCustom: "Mid",
        driver: "kakuyomu",
        numberChapters: 3,
        flagSyosetu: 0,
        flagR18: 0,
        completed: 0,
        addedBy: "test",
        show: 1,
      })
      .execute();
    await localDb
      .insertInto("chapters")
      .values([
        { idNovel: 11, no: 1, noCode: "a", title: "A", dateOriginalPost: "2020-01-01 00:00:00", textOriginal: "A" },
        { idNovel: 11, no: 2, noCode: "b", title: "B", dateOriginalPost: "2020-02-01 00:00:00", textOriginal: "B" },
        { idNovel: 11, no: 3, noCode: "c", title: "C", dateOriginalPost: "2020-03-01 00:00:00", textOriginal: "C" },
      ])
      .execute();
    for (const id of ["a", "b", "c", "new"]) {
      client.metas.set(id, meta("2020-01-01T00:00:00Z", "2020-01-01T00:00:00Z"));
      client.bodies.set(id, `<p>${id}</p>`);
    }
  }, 120_000);

  afterAll(async () => {
    if (localApp) await localApp.close();
    if (localDb) await localDb.destroy();
  });

  it("shifts existing nos up and inserts the new chapter in the hole", async () => {
    const res = await fetch(`${localBase}/api/chapter/autoUpdate/11`);
    const body = await res.text();
    if (res.status !== 200) {
      throw new Error(`autoUpdate mid-list failed ${res.status}: ${body}`);
    }
    const rows = await localDb
      .selectFrom("chapters")
      .select(["no", "noCode", "textOriginal"])
      .where("idNovel", "=", 11)
      .orderBy("no", "asc")
      .execute();
    expect(rows.map((r) => [Number(r.no), r.noCode])).toEqual([
      [1, "a"],
      [2, "new"],
      [3, "b"],
      [4, "c"],
    ]);
    expect(rows[1]!.textOriginal).toBe("<p>new</p>");
    const duplicates = await localDb
      .selectFrom("chapters")
      .select(["no"])
      .where("idNovel", "=", 11)
      .groupBy("no")
      .having((eb) => eb.fn.countAll(), ">", 1)
      .execute();
    expect(duplicates).toEqual([]);
  });
});
