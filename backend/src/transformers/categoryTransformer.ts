function asInt(value: number | boolean | Buffer | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") return Number(value);
  return value[0] ?? 0;
}

export type CategoryRow = {
  id: number;
  idDictionary: number;
  name: string;
  count_entries?: number | string | null;
};

export type CategoryItem = {
  id: number;
  idDictionary: number;
  name: string;
  count_entries: number;
};

export function transformCategory(row: CategoryRow): CategoryItem {
  return {
    id: Number(row.id),
    idDictionary: Number(row.idDictionary),
    name: row.name,
    count_entries: asInt(row.count_entries),
  };
}
