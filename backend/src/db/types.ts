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

export interface DictionariesTable {
  id: Generated<number>;
  name: string;
  language: string;
  dateCreated: Generated<string>;
  dateRevision: string | null;
}

export interface NovelsDictionariesTable {
  id: Generated<number>;
  idNovel: number;
  idDictionary: number;
}

export interface DictionaryCategoriesTable {
  id: Generated<number>;
  idDictionary: number;
  name: string;
}

export interface DictionaryEntriesTable {
  id: Generated<number>;
  idCategory: number;
  entryOriginal: string | null;
  entryTranslation: string;
  description: string | null;
  length: number;
  idDictionary: number | null;
  sufix: number | null;
  prefix: number | null;
  simplified: string | null;
}

export interface Database {
  novels: NovelsTable;
  chapters: ChaptersTable;
  dictionaries: DictionariesTable;
  novelsDictionaries: NovelsDictionariesTable;
  dictionaryCategories: DictionaryCategoriesTable;
  dictionaryEntries: DictionaryEntriesTable;
}
