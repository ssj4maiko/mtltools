import type { Generated } from "kysely";

export interface NovelsTable {
  id: Generated<number>;
  code: string;
  nameOriginal: string;
  nameCustom: string | null;
  driver: string | null;
  numberChapters: number;
  flagSyosetu: number;
  flagR18: number;
  completed: number;
  addedBy: string;
  show: number;
}

export interface ChaptersTable {
  idNovel: number;
  no: number;
  arc: string | null;
  title: string | null;
  textOriginal: string | null;
  textRevision: string | null;
  textCustom: string | null;
  dateOriginalPost: string | null;
  dateOriginalRevision: string | null;
  dateCreated: Generated<string>;
  dateRevision: string | null;
  noCode: string | null;
  hasText: Generated<number>;
}

export interface Database {
  novels: NovelsTable;
  chapters: ChaptersTable;
}
