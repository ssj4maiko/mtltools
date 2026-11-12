import { describe, expect, it } from "vitest";
import {
  absoluteImageUrls,
  adjacentStaticUrl,
  assetUrl,
  staticPagePath,
  waitSourceUrl,
} from "../../src/render/staticUrls.js";

describe("absoluteImageUrls", () => {
  const base = "https://img.example:8443";
  it("prefixes double- and single-quoted src|href=/images/ and leaves other paths alone", () => {
    const html = `<img src="/images/x.png"><a href='/images/y.png'></a><img src="/other/z.png">`;
    expect(absoluteImageUrls(html, base)).toBe(
      `<img src="https://img.example:8443/images/x.png"><a href='https://img.example:8443/images/y.png'></a><img src="/other/z.png">`,
    );
  });

  it("is a no-op when the base is empty", () => {
    const html = `<img src="/images/x.png">`;
    expect(absoluteImageUrls(html, "")).toBe(html);
  });
});

describe("adjacentStaticUrl", () => {
  const base = { idNovel: 1, idDictionary: 10, noChapter: 2, numberChapters: 3, driver: "syosetu" as const };

  it("builds previous/next with part 1, and previous is null at chapter 0", () => {
    expect(adjacentStaticUrl({ ...base, direction: "-" })).toBe("/static/1/10/1/1");
    expect(adjacentStaticUrl({ ...base, direction: "+" })).toBe("/static/1/10/3/1");
    expect(adjacentStaticUrl({ ...base, noChapter: 1, direction: "-" })).toBeNull();
  });

  it("keeps next for a source-backed novel past numberChapters, but not for a missing driver", () => {
    expect(adjacentStaticUrl({ ...base, noChapter: 3, direction: "+" })).toBe("/static/1/10/4/1");
    expect(adjacentStaticUrl({ ...base, driver: null, noChapter: 3, direction: "+" })).toBeNull();
    expect(adjacentStaticUrl({ ...base, driver: "manual", noChapter: 3, direction: "+" })).toBe(
      "/static/1/10/4/1",
    );
  });

  it("uses part+1 (Laravel always passes part 0)", () => {
    expect(staticPagePath(1, 10, 2, 1)).toBe("/static/1/10/2/1");
  });
});

describe("waitSourceUrl", () => {
  it("uses numberChapters+1, not the requested chapter number, and honors Syosetu R18", () => {
    expect(waitSourceUrl({ driver: "syosetu", code: "n1234ab", flagR18: 0, numberChapters: 3 })).toBe(
      "https://ncode.syosetu.com/n1234ab/4",
    );
    expect(waitSourceUrl({ driver: "syosetu", code: "n1234ab", flagR18: 1, numberChapters: 3 })).toBe(
      "https://novel18.syosetu.com/n1234ab/4",
    );
  });

  it("builds a Kakuyomu URL with numberChapters+1 as the episode segment (Laravel startDriver)", () => {
    expect(waitSourceUrl({ driver: "kakuyomu", code: "1234567890", flagR18: 0, numberChapters: 3 })).toBe(
      "https://kakuyomu.jp/works/1234567890/episodes/4",
    );
  });

  it("returns null for manual or missing drivers so the stop page is used", () => {
    expect(waitSourceUrl({ driver: "manual", code: "x", numberChapters: 3 })).toBeNull();
    expect(waitSourceUrl({ driver: null, code: "x", numberChapters: 3 })).toBeNull();
  });
});

describe("assetUrl", () => {
  it("joins APP_URL and a relative asset path", () => {
    expect(assetUrl("https://img.example:8443", "assets/hyperdimension_ff_fanfare.mp3")).toBe(
      "https://img.example:8443/assets/hyperdimension_ff_fanfare.mp3",
    );
  });
});
