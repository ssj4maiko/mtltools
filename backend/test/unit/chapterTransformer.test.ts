import { describe, expect, it } from "vitest";
import { phpJsonEncode } from "../../src/json/phpJson.js";
import { transformChapterListItem, type ChapterListRow } from "../../src/transformers/chapterTransformer.js";

const base: ChapterListRow = {
  idNovel: 1,
  no: 2,
  arc: "Arc",
  title: "Title / 本",
  dateOriginalPost: "2020-01-02 03:04:05",
  dateOriginalRevision: null,
  dateCreated: "2020-01-02 03:04:06",
  dateRevision: "2021-02-03 04:05:06",
  hasText: 1,
  noCode: null,
  driver: "syosetu",
  code: "n1234ab",
  flagR18: 0,
};

describe("transformChapterListItem", () => {
  it("uses the Laravel field order and types", () => {
    const item = transformChapterListItem(base);
    expect(Object.keys(item)).toEqual([
      "idNovel",
      "no",
      "arc",
      "title",
      "dateOriginalPost",
      "dateOriginalRevision",
      "dateCreated",
      "dateRevision",
      "hasText",
      "urlSource",
    ]);
    expect(item.hasText).toBe(1);
    expect(item.dateOriginalPost).toBe("2020-01-02 03:04:05");
    expect(item.dateOriginalRevision).toBeNull();
    expect(item.dateCreated).toBe("2020-01-02T03:04:06.000000Z");
    expect(item.dateRevision).toBe("2021-02-03T04:05:06.000000Z");
    expect(item.urlSource).toBe("https://ncode.syosetu.com/n1234ab/2");
  });

  it("emits hasText 0 and null urlSource for a manual chapter without text", () => {
    const item = transformChapterListItem({
      ...base,
      hasText: 0,
      driver: "manual",
      dateOriginalPost: null,
      dateRevision: null,
      arc: null,
    });
    expect(item.hasText).toBe(0);
    expect(item.urlSource).toBeNull();
    expect(item.arc).toBeNull();
  });

  it("encodes a list the way PHP json_encode does", () => {
    const json = phpJsonEncode([transformChapterListItem(base)]);
    expect(json.startsWith("[{")).toBe(true);
    expect(json).toContain("\\u672c");
    expect(json).toContain("https:\\/\\/ncode.syosetu.com\\/n1234ab\\/2");
    expect(json).toContain('"hasText":1');
    expect(json).toContain('"dateOriginalRevision":null');
  });
});
