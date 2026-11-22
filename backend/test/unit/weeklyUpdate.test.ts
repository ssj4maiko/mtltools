import { describe, expect, it } from "vitest";
import { isSourceGone, WeeklyUpdateService } from "../../src/services/weeklyUpdate.js";
import { KakuyomuJobStore } from "../../src/services/kakuyomuJob.js";

describe("isSourceGone", () => {
  it("matches only 404/410 on the work/index page", () => {
    expect(isSourceGone(new Error("Kakuyomu work page HTTP 404"))).toBe(true);
    expect(isSourceGone(new Error("Syosetu index HTTP 410"))).toBe(true);
  });
  it("ignores transient and unrelated errors", () => {
    for (const m of [
      "Kakuyomu work page HTTP 503",
      "Kakuyomu work page HTTP 429",
      "Syosetu index HTTP 500",
      "Syosetu chapter HTTP 404",
      "Kakuyomu episode page HTTP 404",
      "Kakuyomu GraphQL HTTP 404",
      "Kakuyomu work page is missing __NEXT_DATA__",
      "fetch failed",
    ]) {
      expect(isSourceGone(new Error(m))).toBe(false);
    }
  });
});

function svc(autoUpdate: (id: number) => Promise<string>, marked: number[]) {
  return new WeeklyUpdateService({
    db: null as never,
    jobs: new KakuyomuJobStore(),
    updater: { autoUpdate, markCompleted: async (id) => void marked.push(id) },
    lastRunPath: null,
    sleep: async () => undefined,
  });
}

describe("WeeklyUpdateService.processOne", () => {
  const c = { id: 7, driver: "syosetu" as const, title: "x" };
  it("marks completed after two consecutive 404s", async () => {
    const marked: number[] = [];
    const r = await svc(async () => { throw new Error("Syosetu index HTTP 404"); }, marked).processOne(c);
    expect(r.outcome).toBe("marked-completed");
    expect(marked).toEqual([7]);
  });
  it("does not mark when the second try succeeds", async () => {
    const marked: number[] = [];
    let n = 0;
    const r = await svc(async () => { if (n++ === 0) throw new Error("Syosetu index HTTP 404"); return "{}"; }, marked).processOne(c);
    expect(r.outcome).toBe("updated");
    expect(marked).toEqual([]);
  });
  it("never marks on transient errors", async () => {
    const marked: number[] = [];
    const r = await svc(async () => { throw new Error("Syosetu index HTTP 503"); }, marked).processOne(c);
    expect(r.outcome).toBe("error");
    expect(marked).toEqual([]);
  });
});

describe("WeeklyUpdateService.start", () => {
  it("refuses a second start (including a simultaneous one)", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const rows = [{ id: 1, driver: "syosetu", nameCustom: "a", nameOriginal: "a" }];
    const db = { selectFrom: () => ({ select: () => ({ where: () => ({ orderBy: () => ({ execute: async () => rows }) }) }) }) };
    const s = new WeeklyUpdateService({
      db: db as never,
      jobs: new KakuyomuJobStore(),
      updater: { autoUpdate: async () => { await gate; return "{}"; }, markCompleted: async () => undefined },
      lastRunPath: null,
      sleep: async () => undefined,
    });
    const results = await Promise.allSettled([s.start(), s.start()]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    const rejected = results.find((r) => r.status === "rejected") as PromiseRejectedResult;
    expect(rejected.reason.message).toMatch(/already in progress/);
    await expect(s.start()).rejects.toThrow(/already in progress/);
    release();
  });
});
