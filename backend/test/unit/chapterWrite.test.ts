import { describe, expect, it } from "vitest";
import { asMysqlDatetime, parseChapterWriteBody, InvalidChapterWriteError } from "../../src/services/chapterWrite.js";

describe("chapter write body parsing", () => {
  it("keeps naive MySQL datetimes and accepts JSON ISO without requiring a body no on update", () => {
    expect(asMysqlDatetime("2020-01-02 03:04:05")).toBe("2020-01-02 03:04:05");
    expect(asMysqlDatetime("2020-01-02T03:04:05.000Z")).toBe("2020-01-02 03:04:05");
    expect(asMysqlDatetime(null)).toBeNull();
    const parsed = parseChapterWriteBody({
      title: "Hello",
      textCustom: "note",
      dateOriginalPost: "2020-01-02 03:04:05",
      hasText: 1,
      dateCreated: "1999-01-01 00:00:00",
    });
    expect(parsed.no).toBeUndefined();
    expect(parsed.fields).toEqual({
      title: "Hello",
      textCustom: "note",
      dateOriginalPost: "2020-01-02 03:04:05",
    });
  });

  it("requires a positive no on insert and rejects a non-object body", () => {
    expect(() => parseChapterWriteBody({ title: "x" }, { requireNo: true })).toThrow(InvalidChapterWriteError);
    expect(() => parseChapterWriteBody({ no: 0, title: "x" }, { requireNo: true })).toThrow(InvalidChapterWriteError);
    expect(() => parseChapterWriteBody([])).toThrow(InvalidChapterWriteError);
    expect(parseChapterWriteBody({ no: "4", title: "x" }, { requireNo: true }).no).toBe(4);
  });
});
