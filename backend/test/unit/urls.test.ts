import { describe, expect, it } from "vitest";
import { chapterUrlSource, novelUrlSource } from "../../src/drivers/urls.js";

describe("chapterUrlSource", () => {
  it("builds Syosetu ncode and R18 novel18 URLs from chapter number", () => {
    expect(
      chapterUrlSource({ driver: "syosetu", code: "n1234ab", flagR18: 0, no: 12, noCode: null }),
    ).toBe("https://ncode.syosetu.com/n1234ab/12");
    expect(
      chapterUrlSource({ driver: "syosetu", code: "n1234ab", flagR18: 1, no: 12, noCode: null }),
    ).toBe("https://novel18.syosetu.com/n1234ab/12");
  });

  it("builds Kakuyomu URLs from noCode, not no", () => {
    expect(
      chapterUrlSource({ driver: "kakuyomu", code: "1234567890", flagR18: 0, no: 7, noCode: "987654" }),
    ).toBe("https://kakuyomu.jp/works/1234567890/episodes/987654");
  });

  it("returns null for manual / unknown drivers", () => {
    expect(
      chapterUrlSource({ driver: "manual", code: "x", flagR18: 0, no: 1, noCode: null }),
    ).toBeNull();
    expect(
      chapterUrlSource({ driver: null, code: "x", flagR18: 0, no: 1, noCode: null }),
    ).toBeNull();
  });
});

describe("novelUrlSource", () => {
  it("adds a trailing slash for Syosetu and uses novel18 when R18", () => {
    expect(novelUrlSource({ driver: "syosetu", code: "n1234ab", flagR18: 0 })).toBe(
      "https://ncode.syosetu.com/n1234ab/",
    );
    expect(novelUrlSource({ driver: "syosetu", code: "n1234ab", flagR18: 1 })).toBe(
      "https://novel18.syosetu.com/n1234ab/",
    );
  });

  it("builds a Kakuyomu work URL with no trailing slash", () => {
    expect(novelUrlSource({ driver: "kakuyomu", code: "1234567890", flagR18: 1 })).toBe(
      "https://kakuyomu.jp/works/1234567890",
    );
  });

  it("returns an empty string for manual / unknown drivers", () => {
    expect(novelUrlSource({ driver: "manual", code: "x", flagR18: 0 })).toBe("");
    expect(novelUrlSource({ driver: null, code: "x", flagR18: 0 })).toBe("");
  });
});
