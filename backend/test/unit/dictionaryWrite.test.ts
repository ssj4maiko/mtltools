import { describe, expect, it } from "vitest";
import { categoryRefOrNull, simplifyEntry } from "../../src/services/dictionaryWrite.js";

describe("dictionary write helpers", () => {
  it("strips Unicode punctuation and counts length in bytes like PHP strlen", () => {
    const ascii = simplifyEntry("Hello, world!");
    expect(ascii.simplified).toBe("Hello world");
    expect(ascii.length).toBe(11);
    const jp = simplifyEntry("「名前」");
    expect(jp.simplified).toBe("名前");
    expect(jp.length).toBe(Buffer.byteLength("名前", "utf8"));
    expect(simplifyEntry(null).simplified).toBe("");
  });

  it("treats the string null as SQL NULL for sufix/prefix", () => {
    expect(categoryRefOrNull("null")).toBeNull();
    expect(categoryRefOrNull(null)).toBeNull();
    expect(categoryRefOrNull(12)).toBe(12);
    expect(categoryRefOrNull("8")).toBe(8);
  });
});
