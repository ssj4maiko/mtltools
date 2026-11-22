import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Db } from "../db/client.js";
import type { KakuyomuJobStore } from "./kakuyomuJob.js";
import { KakuyomuJobConflictError } from "./kakuyomuUpdate.js";

export type WeeklyCandidate = { id: number; driver: "kakuyomu" | "syosetu"; title: string };

export type WeeklyPlan = {
  candidates: WeeklyCandidate[];
  counts: { kakuyomu: number; syosetu: number };
  skippedManual: number;
  skippedOtherDriver: number;
};

export type WeeklyOutcome = "updated" | "marked-completed" | "error" | "busy";
export type WeeklyResult = { id: number; driver: string; outcome: WeeklyOutcome; message?: string };

export type WeeklyRunSummary = {
  startedAt: string;
  finishedAt: string | null;
  running: boolean;
  /** Set when the file says "running" but the backend restarted since (crash, deploy). */
  interrupted?: boolean;
  total: number;
  done: number;
  lastId?: number;
  updated: number;
  markedCompleted: number[];
  errors: Array<{ id: number; message: string }>;
  busySkipped: number[];
};

export type WeeklyUpdateDeps = {
  db: Db;
  jobs: KakuyomuJobStore;
  updater: { autoUpdate(id: number): Promise<string>; markCompleted(id: number): Promise<void> };
  lastRunPath: string | null;
  delayBetweenMs?: number;
  confirmDelayMs?: number;
  busyWaitMs?: number;
  sleep?: (ms: number) => Promise<void>;
  now?: () => Date;
};

export class WeeklyUpdateAlreadyRunningError extends Error {
  constructor() {
    super("A weekly update run is already in progress");
    this.name = "WeeklyUpdateAlreadyRunningError";
  }
}

/**
 * Conservative "the work is gone" rule: only the index/work page itself answering 404 or 410.
 * Chapter, GraphQL, 5xx, timeouts, rate limits and parse errors never match.
 */
export function isSourceGone(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /^(Kakuyomu work page|Syosetu index) HTTP (404|410)$/.test(msg);
}

export class WeeklyUpdateService {
  private current: WeeklyRunSummary | null = null;
  private starting = false;
  private readonly sleep: (ms: number) => Promise<void>;
  private readonly now: () => Date;

  constructor(private readonly deps: WeeklyUpdateDeps) {
    this.sleep = deps.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
    this.now = deps.now ?? (() => new Date());
  }

  /** In-memory state, else the last persisted run (flagged interrupted if it never finished). */
  async status(): Promise<WeeklyRunSummary | { running: false; message: string }> {
    if (this.current) return this.current;
    const path = this.deps.lastRunPath;
    if (path) {
      try {
        const saved = JSON.parse(await readFile(path, "utf8")) as WeeklyRunSummary;
        if (saved.running) return { ...saved, running: false, interrupted: true };
        return saved;
      } catch {
        // no file yet
      }
    }
    return { running: false, message: "No weekly run recorded yet" };
  }

  async plan(): Promise<WeeklyPlan> {
    const rows = await this.deps.db
      .selectFrom("novels")
      .select(["id", "driver", "nameCustom", "nameOriginal"])
      .where("completed", "=", 0)
      .orderBy("id")
      .execute();
    const plan: WeeklyPlan = { candidates: [], counts: { kakuyomu: 0, syosetu: 0 }, skippedManual: 0, skippedOtherDriver: 0 };
    for (const r of rows) {
      if (r.driver === "kakuyomu" || r.driver === "syosetu") {
        plan.candidates.push({ id: Number(r.id), driver: r.driver, title: r.nameCustom || r.nameOriginal });
        plan.counts[r.driver]++;
      } else if (r.driver === "manual") {
        plan.skippedManual++;
      } else {
        plan.skippedOtherDriver++;
      }
    }
    return plan;
  }

  /** Starts the run in the background and returns immediately. */
  async start(): Promise<WeeklyRunSummary> {
    // `starting` is set synchronously so a double POST cannot slip in during the awaits below.
    if (this.starting || this.current?.running || KakuyomuJobRunning(this.deps.jobs)) {
      throw new WeeklyUpdateAlreadyRunningError();
    }
    this.starting = true;
    let plan: WeeklyPlan;
    try {
      plan = await this.plan();
    } catch (err) {
      this.starting = false;
      throw err;
    }
    const summary: WeeklyRunSummary = {
      startedAt: this.now().toISOString(),
      finishedAt: null,
      running: true,
      total: plan.candidates.length,
      done: 0,
      updated: 0,
      markedCompleted: [],
      errors: [],
      busySkipped: [],
    };
    this.current = summary;
    this.starting = false;
    await this.persist(summary);
    void this.run(plan.candidates, summary).catch((err) => {
      summary.errors.push({ id: 0, message: `run aborted: ${err instanceof Error ? err.message : String(err)}` });
    }).finally(async () => {
      summary.running = false;
      summary.finishedAt = this.now().toISOString();
      await this.persist(summary);
    });
    return summary;
  }

  private async run(candidates: WeeklyCandidate[], summary: WeeklyRunSummary): Promise<void> {
    const delay = this.deps.delayBetweenMs ?? 20_000;
    for (let i = 0; i < candidates.length; i++) {
      if (i > 0) await this.sleep(delay);
      const res = await this.processOne(candidates[i]);
      summary.done++;
      summary.lastId = res.id;
      if (res.outcome === "updated") summary.updated++;
      else if (res.outcome === "marked-completed") summary.markedCompleted.push(res.id);
      else if (res.outcome === "busy") summary.busySkipped.push(res.id);
      else summary.errors.push({ id: res.id, message: (res.message ?? "").slice(0, 200) });
      await this.persist(summary);
    }
  }

  async processOne(c: WeeklyCandidate): Promise<WeeklyResult> {
    const attempt = async (): Promise<void> => {
      for (let tries = 0; ; tries++) {
        try {
          await this.deps.updater.autoUpdate(c.id);
          return;
        } catch (err) {
          if (err instanceof KakuyomuJobConflictError && tries < 5) {
            await this.sleep(this.deps.busyWaitMs ?? 60_000);
            continue;
          }
          throw err;
        }
      }
    };
    try {
      await attempt();
      return { id: c.id, driver: c.driver, outcome: "updated" };
    } catch (err) {
      if (err instanceof KakuyomuJobConflictError) {
        return { id: c.id, driver: c.driver, outcome: "busy", message: err.message };
      }
      if (isSourceGone(err)) {
        // Confirm once after a pause so a transient 404 does not retire a live novel.
        await this.sleep(this.deps.confirmDelayMs ?? 60_000);
        try {
          await attempt();
          return { id: c.id, driver: c.driver, outcome: "updated" };
        } catch (err2) {
          if (isSourceGone(err2)) {
            await this.deps.updater.markCompleted(c.id);
            return { id: c.id, driver: c.driver, outcome: "marked-completed", message: (err2 as Error).message };
          }
          return { id: c.id, driver: c.driver, outcome: "error", message: err2 instanceof Error ? err2.message : String(err2) };
        }
      }
      return { id: c.id, driver: c.driver, outcome: "error", message: err instanceof Error ? err.message : String(err) };
    }
  }

  private async persist(summary: WeeklyRunSummary): Promise<void> {
    const path = this.deps.lastRunPath;
    if (!path) return;
    try {
      await mkdir(dirname(path), { recursive: true });
      const tmp = `${path}.tmp`;
      await writeFile(tmp, JSON.stringify(summary) + "\n");
      await rename(tmp, path);
    } catch {
      // Best effort: the summary is also available at GET /api/internal/weekly-update.
    }
  }
}

function KakuyomuJobRunning(jobs: KakuyomuJobStore): boolean {
  const j = jobs.get();
  return !!j && j.phase !== "done" && j.phase !== "error";
}
