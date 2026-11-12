import { describe, expect, it } from "vitest";
import { fixRuby } from "../../src/translate/fixRuby.js";
import { phpTruthy, translateText } from "../../src/translate/translateText.js";

describe("fixRuby", () => {
  it("merges split rt/span groups inside a ruby tag", () => {
    expect(fixRuby("<ruby><span>あ</span><rt>a</rt><span>い</span><rt>i</rt></ruby>")).toBe(
      "<ruby><span>あい</span><rt>ai</rt></ruby>",
    );
  });

  it("leaves a simple ruby tag unchanged", () => {
    const simple = "<ruby><span>あ</span><rt>a</rt></ruby>";
    expect(fixRuby(simple)).toBe(simple);
  });

  it("does not merge when </rt><span> is at position 0 (PHP $pos > 0)", () => {
    const input = "<ruby></rt><span>x</span></ruby>";
    expect(fixRuby(input)).toBe(input);
  });
});

describe("phpTruthy", () => {
  it("matches PHP if() for sufix/prefix", () => {
    expect(phpTruthy(100)).toBe(true);
    expect(phpTruthy("100")).toBe(true);
    expect(phpTruthy(0)).toBe(false);
    expect(phpTruthy("0")).toBe(false);
    expect(phpTruthy("")).toBe(false);
    expect(phpTruthy(null)).toBe(false);
    expect(phpTruthy(undefined)).toBe(false);
  });
});

describe("translateText", () => {
  it("applies entries in the given order, so callers must sort length DESC", () => {
    const text = "ABC";
    const longFirst = translateText(text, [
      { idCategory: 1, entryOriginal: "AB", entryTranslation: "XY" },
      { idCategory: 2, entryOriginal: "A", entryTranslation: "Z" },
    ]);
    const shortFirst = translateText(text, [
      { idCategory: 2, entryOriginal: "A", entryTranslation: "Z" },
      { idCategory: 1, entryOriginal: "AB", entryTranslation: "XY" },
    ]);
    expect(longFirst).toBe("XYC");
    expect(shortFirst).toBe("ZBC");
  });

  it("deletes the original when the translation is empty", () => {
    expect(translateText("hello world", [{ idCategory: 1, entryOriginal: "world", entryTranslation: "" }])).toBe(
      "hello ",
    );
  });

  it("strips leftover suffix and prefix markers after replacements", () => {
    // After a suffix/prefix rewrite, the leftover ]id] / [id[ markers are cleaned up.
    expect(
      translateText("]100]剣の使い手", [
        { idCategory: 7, entryOriginal: "剣", entryTranslation: "sword", sufix: 100 },
      ]),
    ).toBe("swordの使い手");
    expect(
      translateText("炎[100[の魔法", [
        { idCategory: 8, entryOriginal: "炎", entryTranslation: "flame", prefix: 100 },
      ]),
    ).toBe("flameの魔法");
  });

  it("does not rewrite image URLs (absoluteImageUrls happens later)", () => {
    const html = '<p><img src="/images/x.png">世界</p>';
    expect(translateText(html, [])).toBe(html);
  });
});
