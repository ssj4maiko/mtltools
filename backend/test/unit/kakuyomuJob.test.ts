import { describe, expect, it } from "vitest";
import { KakuyomuJobConflictError, KakuyomuJobStore } from "../../src/services/kakuyomuJob.js";

describe("KakuyomuJobStore", () => {
  it("allows only one running job and lets the same novel attach", async () => {
    const store = new KakuyomuJobStore(10);
    const first = store.startOrAttach(51, "autoUpdate", new Date("2026-11-16T13:00:00Z"));
    expect(first.started).toBe(true);
    const attached = store.startOrAttach(51, "autoUpdate");
    expect(attached.started).toBe(false);
    expect(attached.job.id).toBe(first.job.id);
    expect(() => store.startOrAttach(56, "autoUpdate")).toThrow(KakuyomuJobConflictError);
    first.job.succeed(new Date("2026-11-16T13:01:00Z"));
    await first.job.finished;
    expect(store.get()?.phase).toBe("done");
    store.reset();
  });
});
