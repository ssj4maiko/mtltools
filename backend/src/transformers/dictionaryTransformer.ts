import { laravelTimestampToJson } from "../json/phpJson.js";
import type { NovelListItem } from "./novelTransformer.js";

function asInt(value: number | boolean | Buffer | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") return Number(value);
  return value[0] ?? 0;
}

export type DictionaryRow = {
  id: number;
  name: string;
  language: string;
  dateCreated: string;
  dateRevision: string | null;
  count_categories?: number | string | null;
};

export type DictionaryListItem = {
  id: number;
  name: string;
  language: string;
  dateCreated: string;
  dateRevision: string | null;
  count_categories: number;
};

export type DictionaryWithNovels = DictionaryListItem & {
  novel: NovelListItem[];
};

export function transformDictionary(row: DictionaryRow): DictionaryListItem {
  return {
    id: Number(row.id),
    name: row.name,
    language: row.language,
    dateCreated: laravelTimestampToJson(row.dateCreated) as string,
    dateRevision: laravelTimestampToJson(row.dateRevision),
    count_categories: asInt(row.count_categories),
  };
}

export function transformDictionaryWithNovels(
  row: DictionaryRow,
  novels: NovelListItem[],
): DictionaryWithNovels {
  return { ...transformDictionary(row), novel: novels };
}
