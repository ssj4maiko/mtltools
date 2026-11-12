import { novelUrlSource } from "../drivers/urls.js";
import type { DictionaryListItem } from "./dictionaryTransformer.js";

function asInt(value: number | boolean | Buffer | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") return Number(value);
  return value[0] ?? 0;
}

export type NovelRow = {
  id: number;
  code: string;
  nameOriginal: string;
  nameCustom: string | null;
  driver: string | null;
  numberChapters: number;
  flagR18: number | boolean | Buffer | string;
  completed: number | boolean | Buffer | string;
  addedBy: string;
  show: number | boolean | Buffer | string;
};

export type NovelListItem = {
  id: number;
  code: string;
  nameOriginal: string;
  nameCustom: string | null;
  driver: string | null;
  numberChapters: number;
  flagR18: number;
  completed: number;
  addedBy: string;
  show: number;
  urlSource: string;
};

export type NovelWithDictionaries = NovelListItem & {
  dictionary: DictionaryListItem[];
};

export function transformNovel(row: NovelRow): NovelListItem {
  const flagR18 = asInt(row.flagR18) ? 1 : 0;
  return {
    id: Number(row.id),
    code: row.code,
    nameOriginal: row.nameOriginal,
    nameCustom: row.nameCustom,
    driver: row.driver,
    numberChapters: Number(row.numberChapters),
    flagR18,
    completed: asInt(row.completed) ? 1 : 0,
    addedBy: row.addedBy,
    show: asInt(row.show) ? 1 : 0,
    urlSource: novelUrlSource({ driver: row.driver, code: row.code, flagR18 }),
  };
}

export function transformNovelWithDictionaries(
  row: NovelRow,
  dictionaries: DictionaryListItem[],
): NovelWithDictionaries {
  return { ...transformNovel(row), dictionary: dictionaries };
}

export type DictionaryRow = {
  id: number;
  name: string;
  language: string;
  dateCreated: string;
  dateRevision: string | null;
  count_categories?: number | string | null;
};
