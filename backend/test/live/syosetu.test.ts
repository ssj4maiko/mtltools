import { describe, expect, it } from "vitest";
import { fetchText, visibleTextLength } from "./http.js";
import { parseChapterBody, parseChapterTitle, parseIndexPage, parseSyosetuDate } from "../../src/drivers/syosetu.js";

/**
 * Live canary against a public Syosetu work: the index post/revision dates
 * (p-eplist__update) and one chapter body (p-novel__text / novel__text).
 * Few requests, polite delays, no story text written or logged.
 *
 * Default ncode is a short public work; override with MTLTOOLS_LIVE_SYOSETU_NCODE.
 */
const NCODE = process.env.MTLTOOLS_LIVE_SYOSETU_NCODE ?? "n2267be";

describe("live Syosetu (public work, opt-in)", () => {
  it("exposes post and optional revision dates on the index and a non-empty chapter body", async () => {
    const index = await fetchText(`https://ncode.syosetu.com/${NCODE}/`);
    expect(index.status, "index page should be 200").toBe(200);
    const parsed = parseIndexPage(index.body, NCODE);
    expect(parsed.episodes.length, "should parse at least one dated chapter").toBeGreaterThan(0);
    expect(parsed.lastPage).toBeGreaterThanOrEqual(1);
    if (NCODE === "n2267be") {
      expect(parsed.lastPage, "the default public canary should advertise more than one index page").toBeGreaterThan(1);
    }
    const first = parsed.episodes[0];
    expect(first.dateOriginalPost).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:00$/);
    expect(parseSyosetuDate(first.dateOriginalPost.replaceAll("-", "/").slice(0, 16))).toBe(first.dateOriginalPost);
    if (first.dateOriginalRevision) {
      expect(first.dateOriginalRevision >= first.dateOriginalPost).toBe(true);
    }

    const no = Number(process.env.MTLTOOLS_LIVE_SYOSETU_NO ?? first.no);
    const chapter = await fetchText(`https://ncode.syosetu.com/${NCODE}/${no}/`);
    expect(chapter.status, "chapter page should be 200").toBe(200);
    const body = parseChapterBody(chapter.body);
    const len = visibleTextLength(body);
    expect(len, "chapter body should be non-empty (length only)").toBeGreaterThan(20);
    expect(parseChapterTitle(chapter.body), "chapter should have a title hook").toBeTruthy();
  });
});
