import { sql } from "kysely";
import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import type { LaravelChapterCache } from "../cache/laravelChapterCache.js";
import type { CatalogService } from "./catalog.js";
import type { ChapterListService } from "./chapterList.js";
import { ChapterNotFoundError, NovelNotFoundError } from "./chapterList.js";
import {
  KakuyomuClient,
  nowMysqlUtc,
  revisionIsNewer,
  signalsUnchanged,
  type EpisodeMeta,
  type IndexEpisode,
  type WorkIndex,
  type WorkSignals,
} from "../drivers/kakuyomu.js";
import { SyosetuClient, type SyosetuEpisode, type SyosetuIndex } from "../drivers/syosetu.js";
import { matchSyosetuChapters as matchSyosetuChaptersPure } from "./syosetuMatch.js";
import { phpJsonEncode } from "../json/phpJson.js";
import { refreshNovelUpdateDates } from "./novelUpdateDates.js";
import { KakuyomuJobConflictError, KakuyomuJobStore, type KakuyomuJob } from "./kakuyomuJob.js";

export class DriverNotSupportedError extends Error {
  constructor(
    public readonly driver: string | null,
    message?: string,
  ) {
    super(message ?? `Driver ${driver ?? "none"} is not supported on the Node updater yet`);
    this.name = "DriverNotSupportedError";
  }
}

export class KnownChapterMissingError extends Error {
  constructor(
    public readonly no: number,
    public readonly noCode: string | null,
  ) {
    super(`Known chapter ${no} was not found on the source index`);
    this.name = "KnownChapterMissingError";
  }
}

export type KakuyomuWorkSnapshot = {
  code: string;
  etag: string | null;
  fetchedAt: string;
  completeSweepAt: string | null;
  work: WorkSignals;
  episodes: Array<Pick<IndexEpisode, "no" | "noCode" | "arc" | "title" | "publishedAt" | "dateOriginalPost">>;
};

const INDEX_SNAPSHOT_TTL_MS = 10 * 60 * 1000;

type KnownChapter = {
  no: number;
  noCode: string | null;
  arc: string | null;
  title: string | null;
  hasText: number;
  dateOriginalPost: string | null;
  dateOriginalRevision: string | null;
  textOriginal: string | null;
  textRevision: string | null;
};

export type KakuyomuUpdateDeps = {
  db: Db;
  cache: FileCache;
  catalog: CatalogService;
  chapterList: ChapterListService;
  chapterHtml: LaravelChapterCache;
  client: KakuyomuClient;
  syosetuClient: SyosetuClient;
  jobs: KakuyomuJobStore;
  now?: () => Date;
  indexSnapshotTtlMs?: number;
};

export class KakuyomuUpdateService {
  private readonly now: () => Date;
  private readonly indexSnapshotTtlMs: number;

  constructor(private readonly deps: KakuyomuUpdateDeps) {
    this.now = deps.now ?? (() => new Date());
    this.indexSnapshotTtlMs = deps.indexSnapshotTtlMs ?? INDEX_SNAPSHOT_TTL_MS;
  }

  async autoUpdate(idNovel: number): Promise<string> {
    const novel = await this.requireOnlineNovel(idNovel);
    const { job, started } = this.deps.jobs.startOrAttach(idNovel, "autoUpdate", this.now());
    if (started) {
      const run = novel.driver === "syosetu" ? this.runSyosetuAutoUpdate(job, novel) : this.runAutoUpdate(job, novel);
      void run.catch((err: unknown) => {
        job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      });
    }
    await job.finished;
    await refreshNovelUpdateDates(this.deps.db, idNovel);
    await this.invalidateNovelCaches(idNovel);
    return this.deps.catalog.getNovelJson(idNovel);
  }

  async updateChapter(idNovel: number, no: number): Promise<string> {
    const novel = await this.requireOnlineNovel(idNovel);
    const { job, started } = this.deps.jobs.startOrAttach(idNovel, "updateChapter", this.now());
    if (started) {
      const run =
        novel.driver === "syosetu"
          ? this.runSyosetuUpdateChapter(job, novel, no)
          : this.runUpdateChapter(job, novel, no);
      void run.catch((err: unknown) => {
        job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      });
    }
    await job.finished;
    await refreshNovelUpdateDates(this.deps.db, idNovel);
    await this.invalidateNovelCaches(idNovel);
    return this.deps.chapterList.getChapterJson(idNovel, no);
  }

  /** Remote index only. Unlike Laravel's controller, this does not run autoUpdate first. */
  async importIndex(idNovel: number): Promise<string> {
    const novel = await this.requireOnlineNovel(idNovel);
    if (novel.driver === "syosetu") {
      const index = await this.deps.syosetuClient.fetchIndex(novel.code, novel.flagR18);
      this.deps.jobs.assertCap(index);
      const grouped: Record<string, Array<Record<string, unknown>>> = {};
      for (const ep of index.episodes) {
        const key = ep.dateOriginalPost;
        (grouped[key] ??= []).push({
          idNovel: novel.id,
          no: ep.no,
          arc: ep.arc,
          title: ep.title,
          dateOriginalPost: ep.dateOriginalPost,
          dateOriginalRevision: ep.dateOriginalRevision,
        });
      }
      return phpJsonEncode(grouped);
    }
    const fetched = await this.deps.client.fetchWorkIndex(novel.code);
    if (fetched.notModified) {
      throw new Error("Kakuyomu work index was not modified but autoIndex has no stored snapshot to reuse");
    }
    this.deps.jobs.assertCap(fetched.index);
    const grouped: Record<string, Array<Record<string, unknown>>> = {};
    for (const ep of fetched.index.episodes) {
      (grouped[ep.noCode] ??= []).push({
        idNovel: novel.id,
        no: ep.no,
        noCode: ep.noCode,
        arc: ep.arc,
        title: ep.title,
        dateOriginalPost: ep.dateOriginalPost,
        dateOriginalRevision: ep.dateOriginalRevision,
      });
    }
    return phpJsonEncode(grouped);
  }

  private async runAutoUpdate(
    job: KakuyomuJob,
    novel: { id: number; code: string; numberChapters: number },
  ): Promise<void> {
    try {
      job.setPhase("index", this.now());
      const stored = await this.loadWorkSnapshot(novel.code);
      const fetched = await this.deps.client.fetchWorkIndex(novel.code, stored?.etag ?? null);

      if (fetched.notModified && stored?.completeSweepAt && stored.work.editedAt) {
        // ETag 304 and we already persisted work.editedAt from the document that ETag covers.
        job.setPhase("done", this.now());
        job.succeed(this.now());
        return;
      }

      const index = fetched.notModified && stored ? this.indexFromSnapshot(stored) : fetched.notModified ? null : fetched.index;
      if (!index) {
        throw new Error("Kakuyomu work index was not modified but no stored snapshot is available");
      }
      this.deps.jobs.assertCap(index);

      const known = await this.loadKnownChapters(novel.id);
      const remaining = new Map<string, IndexEpisode>();
      for (const ep of index.episodes) remaining.set(ep.noCode, ep);

      const previouslyKnown: Array<{ known: KnownChapter; found: IndexEpisode }> = [];
      for (const chapter of known) {
        const byCode = chapter.noCode ? remaining.get(chapter.noCode) : undefined;
        if (byCode) {
          remaining.delete(byCode.noCode);
          previouslyKnown.push({ known: chapter, found: byCode });
          continue;
        }
        const reposted = [...remaining.values()].find((ep) => ep.no === chapter.no);
        if (reposted) {
          remaining.delete(reposted.noCode);
          previouslyKnown.push({ known: chapter, found: reposted });
          continue;
        }
        throw new KnownChapterMissingError(chapter.no, chapter.noCode);
      }

      const newcomers = [...remaining.values()].sort((a, b) => a.no - b.no);
      const midInserts = newcomers.filter((ep) => ep.no < novel.numberChapters).sort((a, b) => b.no - a.no);
      if (midInserts.length > 0) {
        await this.renumberFrom(novel.id, midInserts.map((ep) => ep.no));
      }

      job.setPhase("insert", this.now());
      job.progress(0, newcomers.length, undefined, this.now());
      if (newcomers.length > 0) {
        await this.insertChaptersWithoutText(novel.id, newcomers);
        const nextCount = Math.max(novel.numberChapters, index.episodes.length);
        if (nextCount > novel.numberChapters) {
          await this.deps.db.updateTable("novels").set({ numberChapters: nextCount }).where("id", "=", novel.id).execute();
        }
        await this.invalidateNovelCaches(novel.id);
      }
      job.progress(newcomers.length, newcomers.length, undefined, this.now());

      job.setPhase("fill", this.now());
      const empty = await this.loadChaptersWithoutText(novel.id);
      const skipSweep =
        newcomers.length === 0 &&
        empty.length === 0 &&
        stored?.completeSweepAt &&
        signalsUnchanged(stored.work, index.work);
      const batchMetas = await this.loadEpisodeMetaBatch(novel.code, empty.length > 0 || !skipSweep);
      job.progress(0, empty.length, undefined, this.now());
      for (let i = 0; i < empty.length; i++) {
        const chapter = empty[i];
        const noCode = chapter.noCode;
        if (!noCode) continue;
        job.progress(i + 1, empty.length, { no: chapter.no, noCode }, this.now());
        const meta = await this.episodeMeta(novel.code, noCode, batchMetas);
        const body = await this.deps.client.fetchEpisodeBody(novel.code, noCode);
        await this.deps.db
          .updateTable("chapters")
          .set({
            textOriginal: body,
            dateOriginalPost: meta.dateOriginalPost,
            dateOriginalRevision: meta.dateOriginalRevision,
            dateRevision: nowMysqlUtc(this.now()),
          })
          .where("idNovel", "=", novel.id)
          .where("no", "=", chapter.no)
          .execute();
        await this.invalidateNovelCaches(novel.id);
      }

      job.setPhase("check-updates", this.now());
      if (!skipSweep) {
        job.progress(0, previouslyKnown.length, undefined, this.now());
        for (let i = 0; i < previouslyKnown.length; i++) {
          const { known, found } = previouslyKnown[i];
          job.progress(i + 1, previouslyKnown.length, { no: known.no, noCode: found.noCode }, this.now());
          const wrote = await this.applyRevisionCheck(novel.code, novel.id, known, found, batchMetas);
          if (wrote) await this.invalidateNovelCaches(novel.id);
        }
      }

      await this.saveWorkSnapshot(index, { completeSweep: !skipSweep || Boolean(stored?.completeSweepAt) });
      await this.invalidateNovelCaches(novel.id);
      job.succeed(this.now());
    } catch (err) {
      job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      throw err;
    }
  }

  private async runUpdateChapter(
    job: KakuyomuJob,
    novel: { id: number; code: string; numberChapters: number },
    no: number,
  ): Promise<void> {
    try {
      job.setPhase("index", this.now());
      const index = await this.loadIndexReusable(novel.code);
      this.deps.jobs.assertCap(index);
      const known = await this.loadKnownChapter(novel.id, no);
      if (!known) throw new ChapterNotFoundError(novel.id, no);
      const found = known.noCode
        ? index.episodes.find((ep) => ep.noCode === known.noCode)
        : index.episodes.find((ep) => ep.no === known.no);
      if (!found) throw new KnownChapterMissingError(known.no, known.noCode);

      job.setPhase("check-updates", this.now());
      job.progress(1, 1, { no: known.no, noCode: found.noCode }, this.now());
      await this.applyRevisionCheck(novel.code, novel.id, known, found);
      await this.invalidateNovelCaches(novel.id);
      job.succeed(this.now());
    } catch (err) {
      job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      throw err;
    }
  }

  private async loadEpisodeMetaBatch(workCode: string, needed: boolean): Promise<Map<string, EpisodeMeta> | null> {
    if (!needed) return null;
    try {
      const metas = await this.deps.client.fetchWorkEpisodeMetas(workCode);
      return metas.size > 0 ? metas : null;
    } catch {
      // Fall back to one publicEpisodeUnion / sidebar request per chapter.
      return null;
    }
  }

  private async episodeMeta(
    workCode: string,
    noCode: string,
    batch: Map<string, EpisodeMeta> | null,
  ): Promise<EpisodeMeta> {
    return batch?.get(noCode) ?? this.deps.client.fetchEpisodeMeta(workCode, noCode);
  }

  private async applyRevisionCheck(
    workCode: string,
    idNovel: number,
    known: KnownChapter,
    found: IndexEpisode,
    batchMetas: Map<string, EpisodeMeta> | null = null,
  ): Promise<boolean> {
    const meta = await this.episodeMeta(workCode, found.noCode, batchMetas);
    const patch: Record<string, unknown> = {};
    if (found.arc !== known.arc) patch.arc = found.arc;
    if (found.title !== (known.title ?? "")) patch.title = found.title;
    // Mid-list renumber already moved `no`. Don't patch it here against a stale in-memory no.
    if (found.noCode && found.noCode !== known.noCode) patch.noCode = found.noCode;
    if (meta.dateOriginalPost && meta.dateOriginalPost !== known.dateOriginalPost) {
      patch.dateOriginalPost = meta.dateOriginalPost;
    }
    const newerRevision = revisionIsNewer(meta.dateOriginalRevision, known.dateOriginalRevision);
    if (newerRevision) patch.dateOriginalRevision = meta.dateOriginalRevision;
    else if (!known.dateOriginalRevision && meta.dateOriginalRevision) {
      patch.dateOriginalRevision = meta.dateOriginalRevision;
    }

    if (!known.hasText || !known.textOriginal) {
      patch.textOriginal = await this.deps.client.fetchEpisodeBody(workCode, found.noCode);
    } else if (newerRevision) {
      patch.textRevision = await this.deps.client.fetchEpisodeBody(workCode, found.noCode);
    }

    if (Object.keys(patch).length === 0) return false;
    patch.dateRevision = nowMysqlUtc(this.now());
    let query = this.deps.db.updateTable("chapters").set(patch).where("idNovel", "=", idNovel);
    if (found.noCode) query = query.where("noCode", "=", found.noCode);
    else query = query.where("no", "=", known.no);
    await query.execute();
    return true;
  }

  private async requireOnlineNovel(
    idNovel: number,
  ): Promise<{ id: number; code: string; numberChapters: number; driver: string; flagR18: boolean }> {
    const novel = await this.deps.db
      .selectFrom("novels")
      .select(["id", "code", "driver", "numberChapters", "flagR18"])
      .where("id", "=", idNovel)
      .executeTakeFirst();
    if (!novel) throw new NovelNotFoundError(idNovel);
    if (novel.driver !== "kakuyomu" && novel.driver !== "syosetu") {
      throw new DriverNotSupportedError(novel.driver);
    }
    return {
      id: Number(novel.id),
      code: novel.code,
      numberChapters: Number(novel.numberChapters),
      driver: novel.driver,
      flagR18: Boolean(Number(novel.flagR18)),
    };
  }

  private async loadKnownChapters(idNovel: number): Promise<KnownChapter[]> {
    const rows = await this.deps.db
      .selectFrom("chapters")
      .select([
        "no",
        "noCode",
        "arc",
        "title",
        "hasText",
        "dateOriginalPost",
        "dateOriginalRevision",
        // Only "has original text?" is needed here; loading every chapter body OOM-killed the
        // 128 MB backend on long novels. The single-chapter loader still reads the real text.
        sql<string | null>`CASE WHEN textOriginal IS NULL OR textOriginal = '' THEN NULL ELSE '1' END`.as("textOriginal"),
        sql<string | null>`NULL`.as("textRevision"),
      ])
      .where("idNovel", "=", idNovel)
      .orderBy("no", "asc")
      .execute();
    return rows.map((r) => this.asKnown(r));
  }

  private async loadKnownChapter(idNovel: number, no: number): Promise<KnownChapter | undefined> {
    const row = await this.deps.db
      .selectFrom("chapters")
      .select([
        "no",
        "noCode",
        "arc",
        "title",
        "hasText",
        "dateOriginalPost",
        "dateOriginalRevision",
        "textOriginal",
        "textRevision",
      ])
      .where("idNovel", "=", idNovel)
      .where("no", "=", no)
      .executeTakeFirst();
    return row ? this.asKnown(row) : undefined;
  }

  private async loadChaptersWithoutText(idNovel: number): Promise<Array<{ no: number; noCode: string | null }>> {
    return this.deps.db
      .selectFrom("chapters")
      .select(["no", "noCode"])
      .where("idNovel", "=", idNovel)
      .where("hasText", "=", 0)
      .orderBy("no", "asc")
      .execute();
  }

  private asKnown(row: {
    no: number | string;
    noCode: string | null;
    arc: string | null;
    title: string | null;
    hasText: number | boolean | Buffer | string;
    dateOriginalPost: string | null;
    dateOriginalRevision: string | null;
    textOriginal: string | null;
    textRevision: string | null;
  }): KnownChapter {
    const hasText = typeof row.hasText === "number" ? row.hasText : typeof row.hasText === "boolean" ? (row.hasText ? 1 : 0) : Number(row.hasText);
    return {
      no: Number(row.no),
      noCode: row.noCode,
      arc: row.arc,
      title: row.title,
      hasText: hasText ? 1 : 0,
      dateOriginalPost: row.dateOriginalPost,
      dateOriginalRevision: row.dateOriginalRevision,
      textOriginal: row.textOriginal,
      textRevision: row.textRevision,
    };
  }

  private async insertChaptersWithoutText(
    idNovel: number,
    episodes: Array<{
      no: number;
      noCode?: string | null;
      arc: string | null;
      title: string;
      dateOriginalPost: string;
      dateOriginalRevision?: string | null;
    }>,
  ): Promise<void> {
    if (episodes.length === 0) return;
    await this.deps.db
      .insertInto("chapters")
      .values(
        episodes.map((ep) => ({
          idNovel,
          no: ep.no,
          noCode: ep.noCode ?? null,
          arc: ep.arc,
          title: ep.title,
          dateOriginalPost: ep.dateOriginalPost,
          dateOriginalRevision: ep.dateOriginalRevision ?? null,
        })),
      )
      .execute();
  }

  private async renumberFrom(idNovel: number, startNosDescending: number[]): Promise<void> {
    // Shift through a free high range so primary-key (idNovel, no) never collides mid-update.
    // no is a smallint; novels in this app stay well below 10_000 chapters.
    const offset = 10_000;
    await this.deps.db.transaction().execute(async (trx) => {
      for (const start of startNosDescending) {
        await sql`
          UPDATE chapters
          SET no = no + ${offset}
          WHERE idNovel = ${idNovel} AND no >= ${start}
        `.execute(trx);
        await sql`
          UPDATE chapters
          SET no = no - ${offset - 1}
          WHERE idNovel = ${idNovel} AND no >= ${start + offset}
        `.execute(trx);
      }
    });
  }

  /** Mark a novel completed (used by the weekly updater when the source is gone). */
  async markCompleted(idNovel: number): Promise<void> {
    await this.deps.db.updateTable("novels").set({ completed: 1 }).where("id", "=", idNovel).execute();
    await this.invalidateNovelCaches(idNovel);
  }

  private async invalidateNovelCaches(idNovel: number): Promise<void> {
    await this.deps.cache.invalidateNovel(idNovel);
    await this.deps.chapterHtml.invalidateNovel(idNovel);
  }

  private async loadWorkSnapshot(code: string): Promise<KakuyomuWorkSnapshot | null> {
    const raw = await this.deps.cache.get(this.deps.cache.kakuyomuWorkPath(code));
    if (!raw) return null;
    try {
      return JSON.parse(raw.toString("utf8")) as KakuyomuWorkSnapshot;
    } catch {
      return null;
    }
  }

  private async saveWorkSnapshot(index: WorkIndex, opts: { completeSweep: boolean }): Promise<void> {
    const previous = await this.loadWorkSnapshot(index.code);
    const snapshot: KakuyomuWorkSnapshot = {
      code: index.code,
      etag: index.etag,
      fetchedAt: this.now().toISOString(),
      completeSweepAt: opts.completeSweep ? this.now().toISOString() : (previous?.completeSweepAt ?? null),
      work: index.work,
      episodes: index.episodes.map((ep) => ({
        no: ep.no,
        noCode: ep.noCode,
        arc: ep.arc,
        title: ep.title,
        publishedAt: ep.publishedAt,
        dateOriginalPost: ep.dateOriginalPost,
      })),
    };
    await this.deps.cache.set(this.deps.cache.kakuyomuWorkPath(index.code), JSON.stringify(snapshot));
  }

  private indexFromSnapshot(stored: KakuyomuWorkSnapshot): WorkIndex {
    return {
      code: stored.code,
      etag: stored.etag,
      work: stored.work,
      episodes: stored.episodes.map((ep) => ({
        ...ep,
        dateOriginalRevision: null,
      })),
    };
  }

  private async loadIndexReusable(code: string): Promise<WorkIndex> {
    const stored = await this.loadWorkSnapshot(code);
    if (stored) {
      const age = this.now().getTime() - Date.parse(stored.fetchedAt);
      if (Number.isFinite(age) && age >= 0 && age < this.indexSnapshotTtlMs && stored.episodes.length > 0) {
        return this.indexFromSnapshot(stored);
      }
    }
    const fetched = await this.deps.client.fetchWorkIndex(code, stored?.etag ?? null);
    if (fetched.notModified && stored) {
      return this.indexFromSnapshot(stored);
    }
    if (fetched.notModified) {
      throw new Error("Kakuyomu work index was not modified but no stored snapshot is available");
    }
    await this.saveWorkSnapshot(fetched.index, { completeSweep: false });
    return fetched.index;
  }

  private async runSyosetuAutoUpdate(
    job: KakuyomuJob,
    novel: { id: number; code: string; numberChapters: number; flagR18: boolean },
  ): Promise<void> {
    try {
      job.setPhase("index", this.now());
      const index = await this.deps.syosetuClient.fetchIndex(novel.code, novel.flagR18);
      this.deps.jobs.assertCap(index);
      await this.saveSyosetuIndexSnapshot(index);

      const known = await this.loadKnownChapters(novel.id);
      const { previouslyKnown, newcomers } = this.matchSyosetuChapters(known, index.episodes);

      const midInserts = newcomers.filter((ep) => ep.no < novel.numberChapters).sort((a, b) => b.no - a.no);
      if (midInserts.length > 0) {
        await this.renumberFrom(novel.id, midInserts.map((ep) => ep.no));
      }

      job.setPhase("insert", this.now());
      job.progress(0, newcomers.length, undefined, this.now());
      if (newcomers.length > 0) {
        await this.insertChaptersWithoutText(novel.id, newcomers);
        const nextCount = Math.max(novel.numberChapters, index.episodes.length);
        if (nextCount > novel.numberChapters) {
          await this.deps.db.updateTable("novels").set({ numberChapters: nextCount }).where("id", "=", novel.id).execute();
        }
        await this.invalidateNovelCaches(novel.id);
      }
      job.progress(newcomers.length, newcomers.length, undefined, this.now());

      job.setPhase("fill", this.now());
      const empty = await this.loadChaptersWithoutText(novel.id);
      job.progress(0, empty.length, undefined, this.now());
      for (let i = 0; i < empty.length; i++) {
        const chapter = empty[i];
        job.progress(i + 1, empty.length, { no: chapter.no }, this.now());
        const body = await this.deps.syosetuClient.fetchChapterBody(novel.code, chapter.no, novel.flagR18);
        await this.deps.db
          .updateTable("chapters")
          .set({
            textOriginal: body,
            dateRevision: nowMysqlUtc(this.now()),
          })
          .where("idNovel", "=", novel.id)
          .where("no", "=", chapter.no)
          .execute();
        await this.invalidateNovelCaches(novel.id);
      }

      job.setPhase("check-updates", this.now());
      job.progress(0, previouslyKnown.length, undefined, this.now());
      for (let i = 0; i < previouslyKnown.length; i++) {
        const { known: stored, found } = previouslyKnown[i];
        job.progress(i + 1, previouslyKnown.length, { no: found.no }, this.now());
        const wrote = await this.applySyosetuRevisionCheck(novel, stored, found);
        if (wrote) await this.invalidateNovelCaches(novel.id);
      }

      await this.invalidateNovelCaches(novel.id);
      job.succeed(this.now());
    } catch (err) {
      job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      throw err;
    }
  }

  private async runSyosetuUpdateChapter(
    job: KakuyomuJob,
    novel: { id: number; code: string; numberChapters: number; flagR18: boolean },
    no: number,
  ): Promise<void> {
    try {
      job.setPhase("index", this.now());
      const index = await this.loadSyosetuIndexReusable(novel.code, novel.flagR18);
      this.deps.jobs.assertCap(index);
      const known = await this.loadKnownChapter(novel.id, no);
      if (!known) throw new ChapterNotFoundError(novel.id, no);
      const found = this.findSyosetuEpisode(index.episodes, known) ?? index.episodes.find((ep) => ep.no === known.no);
      if (!found) throw new KnownChapterMissingError(known.no, known.noCode);

      job.setPhase("check-updates", this.now());
      job.progress(1, 1, { no: found.no }, this.now());
      await this.applySyosetuRevisionCheck(novel, known, found);
      await this.invalidateNovelCaches(novel.id);
      job.succeed(this.now());
    } catch (err) {
      job.fail(err instanceof Error ? err : new Error(String(err)), this.now());
      throw err;
    }
  }

  private async applySyosetuRevisionCheck(
    novel: { id: number; code: string; flagR18: boolean },
    known: KnownChapter,
    found: SyosetuEpisode,
  ): Promise<boolean> {
    const patch: Record<string, unknown> = {};
    if (found.arc !== known.arc) patch.arc = found.arc;
    if (found.title !== (known.title ?? "")) patch.title = found.title;
    if (found.dateOriginalPost && found.dateOriginalPost !== known.dateOriginalPost) {
      patch.dateOriginalPost = found.dateOriginalPost;
    }
    const newerRevision = revisionIsNewer(found.dateOriginalRevision, known.dateOriginalRevision);
    if (newerRevision) patch.dateOriginalRevision = found.dateOriginalRevision;
    else if (!known.dateOriginalRevision && found.dateOriginalRevision) {
      patch.dateOriginalRevision = found.dateOriginalRevision;
    }

    if (!known.hasText || !known.textOriginal) {
      patch.textOriginal = await this.deps.syosetuClient.fetchChapterBody(novel.code, found.no, novel.flagR18);
    } else if (newerRevision) {
      patch.textRevision = await this.deps.syosetuClient.fetchChapterBody(novel.code, found.no, novel.flagR18);
    }

    if (Object.keys(patch).length === 0) return false;
    patch.dateRevision = nowMysqlUtc(this.now());
    // After a mid-list renumber, `known.no` is stale. The date pointer plus the index `no` is current.
    await this.deps.db
      .updateTable("chapters")
      .set(patch)
      .where("idNovel", "=", novel.id)
      .where("no", "=", found.no)
      .execute();
    return true;
  }

  private matchSyosetuChapters(
    known: KnownChapter[],
    episodes: SyosetuEpisode[],
  ): { previouslyKnown: Array<{ known: KnownChapter; found: SyosetuEpisode }>; newcomers: SyosetuEpisode[] } {
    return matchSyosetuChaptersPure(known, episodes, (chapter) => {
      throw new KnownChapterMissingError(chapter.no, chapter.noCode);
    });
  }

  private findSyosetuEpisode(episodes: SyosetuEpisode[], chapter: KnownChapter): SyosetuEpisode | undefined {
    try {
      return matchSyosetuChaptersPure([chapter], episodes, () => {
        throw new Error("missing");
      }).previouslyKnown[0]?.found;
    } catch {
      return undefined;
    }
  }

  private async loadSyosetuIndexReusable(code: string, r18: boolean): Promise<SyosetuIndex> {
    const stored = await this.loadSyosetuIndexSnapshot(code);
    if (stored) {
      const age = this.now().getTime() - Date.parse(stored.fetchedAt);
      if (Number.isFinite(age) && age >= 0 && age < this.indexSnapshotTtlMs && stored.index.episodes.length > 0) {
        return stored.index;
      }
    }
    const index = await this.deps.syosetuClient.fetchIndex(code, r18);
    await this.saveSyosetuIndexSnapshot(index);
    return index;
  }

  private async loadSyosetuIndexSnapshot(code: string): Promise<{ fetchedAt: string; index: SyosetuIndex } | null> {
    const raw = await this.deps.cache.get(this.deps.cache.syosetuIndexPath(code));
    if (!raw) return null;
    try {
      return JSON.parse(raw.toString("utf8")) as { fetchedAt: string; index: SyosetuIndex };
    } catch {
      return null;
    }
  }

  private async saveSyosetuIndexSnapshot(index: SyosetuIndex): Promise<void> {
    const snapshot = { fetchedAt: this.now().toISOString(), index };
    await this.deps.cache.set(this.deps.cache.syosetuIndexPath(index.code), JSON.stringify(snapshot));
  }
}


export { KakuyomuJobConflictError };
