import { laravelTimestampToJson, mysqlDatetimeOrNull } from "../json/phpJson.js";
import { chapterUrlSource } from "../drivers/urls.js";

export type ChapterListRow = {
  idNovel: number;
  no: number;
  arc: string | null;
  title: string | null;
  dateOriginalPost: string | null;
  dateOriginalRevision: string | null;
  dateCreated: string;
  dateRevision: string | null;
  hasText: number | boolean | Buffer;
  noCode: string | null;
  driver: string | null;
  code: string;
  flagR18: number | boolean;
};

export type ChapterListItem = {
  idNovel: number;
  no: number;
  arc: string | null;
  title: string | null;
  dateOriginalPost: string | null;
  dateOriginalRevision: string | null;
  dateCreated: string;
  dateRevision: string | null;
  hasText: 0 | 1;
  urlSource: string | null;
};

function asInt(value: number | boolean | Buffer | string): number {
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") return Number(value);
  return value[0] ?? 0;
}

export function transformChapterListItem(row: ChapterListRow): ChapterListItem {
  return {
    idNovel: Number(row.idNovel),
    no: Number(row.no),
    arc: row.arc ?? null,
    title: row.title ?? null,
    dateOriginalPost: mysqlDatetimeOrNull(row.dateOriginalPost),
    dateOriginalRevision: mysqlDatetimeOrNull(row.dateOriginalRevision),
    dateCreated: laravelTimestampToJson(row.dateCreated) as string,
    dateRevision: laravelTimestampToJson(row.dateRevision),
    hasText: asInt(row.hasText) ? 1 : 0,
    urlSource: chapterUrlSource({
      driver: row.driver,
      code: row.code,
      flagR18: asInt(row.flagR18),
      no: Number(row.no),
      noCode: row.noCode,
    }),
  };
}
