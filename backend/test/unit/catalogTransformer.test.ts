import { describe, expect, it } from "vitest";
import { phpJsonEncode } from "../../src/json/phpJson.js";
import { transformNovelWithDictionaries } from "../../src/transformers/novelTransformer.js";
import { transformDictionaryWithNovels, transformDictionary } from "../../src/transformers/dictionaryTransformer.js";
import { transformCategory } from "../../src/transformers/categoryTransformer.js";
import { transformEntry, transformCacheDictionaryEntry, transformCacheCategory } from "../../src/transformers/entryTransformer.js";
import { META_DRIVERS, META_LANGUAGES } from "../../src/services/meta.js";

describe("catalog transformers", () => {
  it("encodes a novel with nested dictionaries the way Laravel does", () => {
    const dict = transformDictionary({
      id: 10,
      name: "人名",
      language: "english",
      dateCreated: "2020-01-02 03:04:05",
      dateRevision: "2021-02-03 04:05:06",
      count_categories: 2,
    });
    const novel = transformNovelWithDictionaries(
      {
        id: 1,
        code: "n1234ab",
        nameOriginal: "源",
        nameCustom: "Source",
        driver: "syosetu",
        numberChapters: 3,
        flagR18: 0,
        completed: 0,
        addedBy: "me",
        show: 1,
      },
      [dict],
    );
    expect(phpJsonEncode(novel)).toBe(
      '{"id":1,"code":"n1234ab","nameOriginal":"\\u6e90","nameCustom":"Source","driver":"syosetu","numberChapters":3,"flagR18":0,"completed":0,"addedBy":"me","show":1,"urlSource":"https:\\/\\/ncode.syosetu.com\\/n1234ab\\/","dictionary":[{"id":10,"name":"\\u4eba\\u540d","language":"english","dateCreated":"2020-01-02T03:04:05.000000Z","dateRevision":"2021-02-03T04:05:06.000000Z","count_categories":2}]}',
    );
  });

  it("uses an empty urlSource for a manual novel and omits nested dictionaries on the dictionary.novel side", () => {
    const novel = transformDictionaryWithNovels(
      {
        id: 10,
        name: "D",
        language: "english",
        dateCreated: "2020-01-02 03:04:05",
        dateRevision: null,
        count_categories: 0,
      },
      [
        {
          id: 2,
          code: "book-manual",
          nameOriginal: "手動",
          nameCustom: "Manual",
          driver: "manual",
          numberChapters: 0,
          flagR18: 0,
          completed: 0,
          addedBy: "me",
          show: 1,
          urlSource: "",
        },
      ],
    );
    expect(novel.novel[0].urlSource).toBe("");
    expect("dictionary" in (novel.novel[0] as object)).toBe(false);
    expect(phpJsonEncode(novel.dateRevision)).toBe("null");
  });

  it("encodes categories, entries, and the cache-dictionary blob field order", () => {
    expect(phpJsonEncode(transformCategory({ id: 1, idDictionary: 10, name: "Names", count_entries: 2 }))).toBe(
      '{"id":1,"idDictionary":10,"name":"Names","count_entries":2}',
    );
    const entry = transformEntry({
      id: 7,
      idCategory: 1,
      entryOriginal: "剣",
      entryTranslation: "sword",
      description: null,
      length: 3,
      sufix: null,
      prefix: 1,
      simplified: "剣",
    });
    expect(phpJsonEncode(entry)).toBe(
      '{"id":7,"idCategory":1,"entryOriginal":"\\u5263","entryTranslation":"sword","description":null,"length":3,"sufix":null,"prefix":1,"simplified":"\\u5263"}',
    );
    expect(phpJsonEncode(transformCacheDictionaryEntry(entry, 10))).toBe(
      '{"id":7,"idCategory":1,"entryOriginal":"\\u5263","entryTranslation":"sword","description":null,"length":3,"sufix":null,"prefix":1,"simplified":"\\u5263","laravel_through_key":10}',
    );
    expect(phpJsonEncode(transformCacheCategory({ id: 1, idDictionary: 10, name: "Names" }, 2))).toBe(
      '{"id":1,"idDictionary":10,"name":"Names","count_entries":[{"idCategory":1,"count":2}]}',
    );
    expect(phpJsonEncode(transformCacheCategory({ id: 2, idDictionary: 10, name: "Title" }, 0))).toBe(
      '{"id":2,"idDictionary":10,"name":"Title","count_entries":[]}',
    );
  });

  it("encodes POST /api/meta the way Laravel does", () => {
    expect(phpJsonEncode({ drivers: META_DRIVERS, languages: META_LANGUAGES })).toBe(
      '{"drivers":{"manual":"Manual","syosetu":"Syosetu ni Narou \\/ \\u5c0f\\u8aac\\u5bb6\\u306b\\u306a\\u308d\\u3046","kakuyomu":"Kakuyomu \\/ \\u30ab\\u30af\\u30e8\\u30e0"},"languages":{"english":"English"}}',
    );
  });
});
