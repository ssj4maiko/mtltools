function asIntOrNull(value: number | boolean | Buffer | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") return Number(value);
  return value[0] ?? 0;
}

function asInt(value: number | boolean | Buffer | string | null | undefined): number {
  return asIntOrNull(value) ?? 0;
}

export type EntryRow = {
  id: number;
  idCategory: number;
  entryOriginal: string | null;
  entryTranslation: string;
  description: string | null;
  length: number | string;
  sufix: number | string | null;
  prefix: number | string | null;
  simplified: string | null;
  idDictionary?: number | string | null;
};

export type EntryItem = {
  id: number;
  idCategory: number;
  entryOriginal: string | null;
  entryTranslation: string;
  description: string | null;
  length: number;
  sufix: number | null;
  prefix: number | null;
  simplified: string | null;
};

export function transformEntry(row: EntryRow): EntryItem {
  return {
    id: Number(row.id),
    idCategory: Number(row.idCategory),
    entryOriginal: row.entryOriginal,
    entryTranslation: row.entryTranslation,
    description: row.description,
    length: asInt(row.length),
    sufix: asIntOrNull(row.sufix),
    prefix: asIntOrNull(row.prefix),
    simplified: row.simplified,
  };
}

export type CacheDictionaryEntry = EntryItem & {
  laravel_through_key: number;
};

export function transformCacheDictionaryEntry(row: EntryRow, dictionaryId: number): CacheDictionaryEntry {
  return {
    ...transformEntry(row),
    laravel_through_key: Number(dictionaryId),
  };
}

export type CacheCategoryCount = {
  idCategory: number;
  count: number;
};

export type CacheCategoryItem = {
  id: number;
  idDictionary: number;
  name: string;
  count_entries: CacheCategoryCount[];
};

export function transformCacheCategory(row: CategoryRowLike, count: number): CacheCategoryItem {
  const id = Number(row.id);
  const n = Number(count);
  return {
    id,
    idDictionary: Number(row.idDictionary),
    name: row.name,
    // Laravel's countEntries relation is [] when the category has no entries.
    count_entries: n > 0 ? [{ idCategory: id, count: n }] : [],
  };
}

type CategoryRowLike = {
  id: number;
  idDictionary: number;
  name: string;
};

export type CacheDictionaryBlob = {
  id: number;
  name: string;
  language: string;
  dateCreated: string;
  dateRevision: string | null;
  count_categories: number;
  dictionary_category: CacheCategoryItem[];
  dictionary_entry: CacheDictionaryEntry[];
};
