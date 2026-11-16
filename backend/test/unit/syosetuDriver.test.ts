import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  chapterUrl,
  indexUrl,
  parseChapterBody,
  parseChapterTitle,
  parseIndexPage,
  parseLastPage,
  parseSyosetuDate,
  r18Headers,
  SyosetuClient,
} from "../../src/drivers/syosetu.js";
import { PoliteHttp } from "../../src/drivers/politeHttp.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures/syosetu");

function load(name: string): string {
  return readFileSync(join(fixtures, name), "utf8");
}

describe("Syosetu driver", () => {
  it("normalizes index dates the way Laravel stored them (naive, seconds forced to 00)", () => {
    expect(parseSyosetuDate("2020/01/02 03:04")).toBe("2020-01-02 03:04:00");
    expect(parseSyosetuDate("span title=\"2012/09/01 20:09 改稿\"")).toBe("2012-09-01 20:09:00");
    expect(parseSyosetuDate("no date here")).toBeNull();
  });

  it("parses a paged index: last-page button, arcs, titles, post and revision dates", () => {
    const html = load("index-page.html");
    expect(parseLastPage(html)).toBe(3);
    const { episodes, lastPage } = parseIndexPage(html, "n0000aa");
    expect(lastPage).toBe(3);
    expect(episodes).toHaveLength(2);
    expect(episodes[0]).toEqual({
      no: 1,
      title: "First chapter",
      arc: "Arc One",
      dateOriginalPost: "2020-01-02 03:04:00",
      dateOriginalRevision: "2020-02-03 04:05:00",
    });
    expect(episodes[1]).toEqual({
      no: 2,
      title: "Second & last",
      arc: "Arc One",
      dateOriginalPost: "2020-01-03 10:00:00",
      dateOriginalRevision: null,
    });
  });

  it("treats a last-page pager with no last href as a single remaining page", () => {
    const html = load("index-page-last.html");
    expect(parseLastPage(html)).toBe(1);
    const { episodes } = parseIndexPage(html, "N0000AA");
    expect(episodes).toEqual([
      {
        no: 201,
        title: "Last page chapter",
        arc: null,
        dateOriginalPost: "2021-12-31 23:59:00",
        dateOriginalRevision: null,
      },
    ]);
  });

  it("keeps two chapters that share a post date as separate episodes", () => {
    const { episodes, lastPage } = parseIndexPage(load("index-same-date.html"), "n0000aa");
    expect(lastPage).toBe(1);
    expect(episodes.map((ep) => [ep.no, ep.title, ep.dateOriginalPost])).toEqual([
      [1, "Morning", "2020-05-01 12:00:00"],
      [2, "Afternoon", "2020-05-01 12:00:00"],
    ]);
  });

  it("joins preface, body and afterword with <ht/> and reads the title hook", () => {
    const html = load("episode-body.html");
    expect(parseChapterTitle(html)).toBe("First chapter");
    expect(parseChapterBody(html)).toBe(
      "<p>A short preface.</p><ht/><p>Main body paragraph.</p><ht/><p>Afterword note.</p>",
    );
  });

  it("still understands the legacy novel__text / novel_subtitle markup", () => {
    const html = load("episode-body-legacy.html");
    expect(parseChapterTitle(html)).toBe("Legacy title");
    expect(parseChapterBody(html)).toBe("<p>Old preface.</p><ht/><p>Old main.</p>");
  });

  it("uses novel18 + over18 cookie only for R18 works", () => {
    expect(indexUrl("n0000aa", 1, false)).toBe("https://ncode.syosetu.com/n0000aa/");
    expect(indexUrl("n0000aa", 3, true)).toBe("https://novel18.syosetu.com/n0000aa/?p=3");
    expect(chapterUrl("n0000aa", 12, true)).toBe("https://novel18.syosetu.com/n0000aa/12/");
    expect(r18Headers(false).Cookie).toBeUndefined();
    expect(r18Headers(true).Cookie).toBe("over18=yes");
  });

  it("paginates fetchIndex and does not store more than metadata", async () => {
    const pages = new Map<string, string>([
      ["https://ncode.syosetu.com/n0000aa/", load("index-page.html")],
      ["https://ncode.syosetu.com/n0000aa/?p=2", load("index-page.html")], // fixture reuse; dedupes by no
      ["https://ncode.syosetu.com/n0000aa/?p=3", load("index-page-last.html")],
    ]);
    const client = new SyosetuClient(
      new PoliteHttp(0, async (url) => {
        const body = pages.get(String(url));
        if (!body) return new Response("missing", { status: 404 });
        return new Response(body, { status: 200 });
      }),
    );
    const index = await client.fetchIndex("n0000aa", false);
    expect(index.lastPage).toBe(3);
    expect(index.episodes.map((ep) => ep.no)).toEqual([1, 2, 201]);
  });
});
