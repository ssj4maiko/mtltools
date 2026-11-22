import { describe, expect, it } from "vitest";
import { matchSyosetuChapters } from "../../src/services/syosetuMatch.js";
import type { SyosetuEpisode } from "../../src/drivers/syosetu.js";

const ep = (no: number, post: string): SyosetuEpisode => ({ no, title: `t${no}`, arc: null, dateOriginalPost: post, dateOriginalRevision: null });
const missing = (c: { no: number }): never => { throw new Error(`missing ${c.no}`); };

describe("matchSyosetuChapters", () => {
  it("matches by exact datetime and reports newcomers", () => {
    const r = matchSyosetuChapters(
      [{ no: 1, dateOriginalPost: "2020-01-01 00:00:00" }],
      [ep(1, "2020-01-01 00:00:00"), ep(2, "2020-02-01 00:00:00")],
      missing,
    );
    expect(r.previouslyKnown[0].found.no).toBe(1);
    expect(r.newcomers.map((e) => e.no)).toEqual([2]);
  });

  it("matches a DST-shifted stored time (one hour off) by chapter number", () => {
    const r = matchSyosetuChapters(
      [{ no: 38, dateOriginalPost: "2015-10-18 01:19:00" }, { no: 39, dateOriginalPost: "2015-10-22 00:39:00" }],
      [ep(38, "2015-10-18 00:19:00"), ep(39, "2015-10-22 00:39:00")],
      missing,
    );
    expect(r.previouslyKnown.map((p) => p.found.no)).toEqual([38, 39]);
    expect(r.newcomers).toEqual([]);
  });

  it("does not match when the number differs or the gap exceeds one hour", () => {
    expect(() => matchSyosetuChapters([{ no: 5, dateOriginalPost: "2015-10-18 01:19:00" }], [ep(6, "2015-10-18 00:19:00")], missing)).toThrow(/missing 5/);
    expect(() => matchSyosetuChapters([{ no: 5, dateOriginalPost: "2015-10-18 03:19:00" }], [ep(5, "2015-10-18 00:19:00")], missing)).toThrow(/missing 5/);
  });
});
