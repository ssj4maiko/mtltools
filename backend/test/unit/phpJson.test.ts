import { describe, expect, it } from "vitest";
import { laravelTimestampToJson, mysqlDatetimeOrNull, phpJsonEncode } from "../../src/json/phpJson.js";

describe("phpJsonEncode", () => {
  it("is compact, escapes slashes, and emits \\uXXXX for non-ASCII", () => {
    const json = phpJsonEncode({ url: "https://example.com/a", title: "本" });
    expect(json).toBe('{"url":"https:\\/\\/example.com\\/a","title":"\\u672c"}');
    expect(json.includes(": ")).toBe(false);
    expect(json.includes("本")).toBe(false);
  });

  it("escapes BMP and surrogate pairs the way PHP does", () => {
    expect(phpJsonEncode("日本")).toBe('"\\u65e5\\u672c"');
    // grinning face U+1F600 -> UTF-16 surrogates
    expect(phpJsonEncode("😀")).toBe('"\\ud83d\\ude00"');
  });

  it("keeps a bare array at the top level", () => {
    expect(phpJsonEncode([])).toBe("[]");
    expect(phpJsonEncode([{ a: 1, b: null }])).toBe('[{"a":1,"b":null}]');
  });
});

describe("date helpers", () => {
  it("formats Eloquent timestamps as Carbon toJSON (UTC, 6 zero microseconds)", () => {
    expect(laravelTimestampToJson("2020-01-02 03:04:05")).toBe("2020-01-02T03:04:05.000000Z");
    expect(laravelTimestampToJson("2020-01-02T03:04:05")).toBe("2020-01-02T03:04:05.000000Z");
    expect(laravelTimestampToJson("2020-01-02T03:04:05.000000Z")).toBe("2020-01-02T03:04:05.000000Z");
    expect(laravelTimestampToJson(null)).toBeNull();
    expect(laravelTimestampToJson("")).toBeNull();
  });

  it("passes MySQL DATETIME through unchanged", () => {
    expect(mysqlDatetimeOrNull("2020-01-02 03:04:05")).toBe("2020-01-02 03:04:05");
    expect(mysqlDatetimeOrNull(null)).toBeNull();
  });
});
