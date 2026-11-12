import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import { phpJsonEncode } from "../json/phpJson.js";
import { transformNovel, transformNovelWithDictionaries, type NovelRow } from "../transformers/novelTransformer.js";
import {
  transformDictionary,
  transformDictionaryWithNovels,
  type DictionaryRow,
} from "../transformers/dictionaryTransformer.js";
import { transformCategory, type CategoryRow } from "../transformers/categoryTransformer.js";
import { transformEntry, type EntryRow } from "../transformers/entryTransformer.js";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class CatalogService {
  constructor(
    private readonly db: Db,
    private readonly cache: FileCache,
  ) {}

  private async cached(path: string, build: () => Promise<unknown>): Promise<string> {
    const hit = await this.cache.get(path);
    if (hit) return hit.toString("utf8");
    const body = phpJsonEncode(await build());
    await this.cache.set(path, body);
    return body;
  }

  async getNovelsJson(search?: string): Promise<string> {
    if (search !== undefined) {
      return phpJsonEncode(await this.loadNovels(search));
    }
    return this.cached(this.cache.novelListPath(), () => this.loadNovels());
  }

  async getNovelJson(idNovel: number): Promise<string> {
    return this.cached(this.cache.novelPath(idNovel), async () => {
      const novels = await this.loadNovelsByIds([idNovel]);
      if (novels.length === 0) throw new NotFoundError("Novel not found");
      return novels[0];
    });
  }

  async getNovelsByDictionaryJson(idDictionary: number): Promise<string> {
    return this.cached(this.cache.novelsByDictionaryPath(idDictionary), async () => {
      const links = await this.db
        .selectFrom("novelsDictionaries")
        .select(["idNovel"])
        .where("idDictionary", "=", idDictionary)
        .orderBy("id", "asc")
        .execute();
      const ids = links.map((r) => Number(r.idNovel));
      return this.loadNovelsByIds(ids);
    });
  }

  async getDictionariesJson(): Promise<string> {
    return this.cached(this.cache.dictionaryListPath(), () => this.loadDictionaries());
  }

  async getDictionaryJson(idDictionary: number): Promise<string> {
    return this.cached(this.cache.dictionaryPath(idDictionary), async () => {
      const dicts = await this.loadDictionariesByIds([idDictionary]);
      if (dicts.length === 0) throw new NotFoundError("Dictionary not found");
      return dicts[0];
    });
  }

  async getDictionariesByNovelJson(idNovel: number): Promise<string> {
    return this.cached(this.cache.dictionariesByNovelPath(idNovel), async () => {
      const links = await this.db
        .selectFrom("novelsDictionaries")
        .select(["idDictionary"])
        .where("idNovel", "=", idNovel)
        .orderBy("id", "asc")
        .execute();
      return this.loadDictionariesByIds(links.map((r) => Number(r.idDictionary)));
    });
  }

  async getCategoriesJson(idDictionary: number): Promise<string> {
    return this.cached(this.cache.categoryListPath(idDictionary), () => this.loadCategories(idDictionary));
  }

  async getCategoryJson(idDictionary: number, idCategory: number): Promise<string> {
    return this.cached(this.cache.categoryPath(idDictionary, idCategory), async () => {
      const rows = await this.loadCategories(idDictionary, idCategory);
      if (rows.length === 0) throw new NotFoundError("Category not found");
      return rows[0];
    });
  }

  async getEntriesJson(idDictionary: number, idCategory: number): Promise<string> {
    return this.cached(this.cache.entryListPath(idDictionary, idCategory), async () => {
      const rows = await this.db
        .selectFrom("dictionaryEntries")
        .select([
          "id",
          "idCategory",
          "entryOriginal",
          "entryTranslation",
          "description",
          "length",
          "sufix",
          "prefix",
          "simplified",
        ])
        .where("idDictionary", "=", idDictionary)
        .where("idCategory", "=", idCategory)
        .orderBy("id", "asc")
        .execute();
      return rows.map((row) => transformEntry(row as EntryRow));
    });
  }

  async getEntryJson(idEntry: number): Promise<string> {
    // Laravel looks up by entry id only and ignores the path's dictionary/category.
    return this.cached(this.cache.entryPath(idEntry), async () => {
      const row = await this.db
        .selectFrom("dictionaryEntries")
        .select([
          "id",
          "idCategory",
          "entryOriginal",
          "entryTranslation",
          "description",
          "length",
          "sufix",
          "prefix",
          "simplified",
        ])
        .where("id", "=", idEntry)
        .executeTakeFirst();
      if (!row) throw new NotFoundError("Entry not found");
      return transformEntry(row as EntryRow);
    });
  }

  private async loadNovels(search?: string) {
    let query = this.db.selectFrom("novels").selectAll().orderBy("id", "asc");
    if (search !== undefined) {
      // Laravel searches nameCustom twice and never nameOriginal.
      const like = `%${search}%`;
      query = query.where((eb) => eb("nameCustom", "like", like).or("nameCustom", "like", like));
    }
    const rows = await query.execute();
    return this.attachDictionaries(rows as NovelRow[]);
  }

  private async loadNovelsByIds(ids: number[]) {
    if (ids.length === 0) return [];
    const rows = await this.db
      .selectFrom("novels")
      .selectAll()
      .where("id", "in", ids)
      .execute();
    const byId = new Map((rows as NovelRow[]).map((row) => [Number(row.id), row]));
    const ordered = ids.map((id) => byId.get(id)).filter((row): row is NovelRow => !!row);
    return this.attachDictionaries(ordered);
  }

  private async attachDictionaries(novels: NovelRow[]) {
    if (novels.length === 0) return [];
    const ids = novels.map((n) => Number(n.id));
    const links = await this.db
      .selectFrom("novelsDictionaries as nd")
      .innerJoin("dictionaries as d", "d.id", "nd.idDictionary")
      .leftJoin(
        this.db
          .selectFrom("dictionaryCategories")
          .select((eb) => ["idDictionary", eb.fn.countAll<number>().as("count_categories")])
          .groupBy("idDictionary")
          .as("cc"),
        "cc.idDictionary",
        "d.id",
      )
      .select([
        "nd.id as linkId",
        "nd.idNovel",
        "d.id",
        "d.name",
        "d.language",
        "d.dateCreated",
        "d.dateRevision",
        "cc.count_categories",
      ])
      .where("nd.idNovel", "in", ids)
      .orderBy("nd.id", "asc")
      .execute();

    const byNovel = new Map<number, ReturnType<typeof transformDictionary>[]>();
    for (const link of links) {
      const idNovel = Number(link.idNovel);
      const item = transformDictionary({
        id: Number(link.id),
        name: link.name,
        language: link.language,
        dateCreated: link.dateCreated,
        dateRevision: link.dateRevision,
        count_categories: link.count_categories,
      } as DictionaryRow);
      const list = byNovel.get(idNovel) ?? [];
      list.push(item);
      byNovel.set(idNovel, list);
    }
    return novels.map((row) => transformNovelWithDictionaries(row, byNovel.get(Number(row.id)) ?? []));
  }

  private async loadDictionaries() {
    const rows = await this.dictionaryBase().orderBy("d.id", "asc").execute();
    return this.attachNovels(rows);
  }

  private async loadDictionariesByIds(ids: number[]) {
    if (ids.length === 0) return [];
    const rows = await this.dictionaryBase().where("d.id", "in", ids).execute();
    const byId = new Map(rows.map((row) => [Number(row.id), row]));
    const ordered = ids.map((id) => byId.get(id)).filter((row): row is (typeof rows)[number] => !!row);
    return this.attachNovels(ordered);
  }

  private dictionaryBase() {
    return this.db
      .selectFrom("dictionaries as d")
      .leftJoin(
        this.db
          .selectFrom("dictionaryCategories")
          .select((eb) => ["idDictionary", eb.fn.countAll<number>().as("count_categories")])
          .groupBy("idDictionary")
          .as("cc"),
        "cc.idDictionary",
        "d.id",
      )
      .select([
        "d.id",
        "d.name",
        "d.language",
        "d.dateCreated",
        "d.dateRevision",
        "cc.count_categories",
      ]);
  }

  private async attachNovels(dicts: Array<DictionaryRow & { count_categories?: number | string | null }>) {
    if (dicts.length === 0) return [];
    const ids = dicts.map((d) => Number(d.id));
    const links = await this.db
      .selectFrom("novelsDictionaries as nd")
      .innerJoin("novels as n", "n.id", "nd.idNovel")
      .select([
        "nd.id as linkId",
        "nd.idDictionary",
        "n.id",
        "n.code",
        "n.nameOriginal",
        "n.nameCustom",
        "n.driver",
        "n.numberChapters",
        "n.flagR18",
        "n.completed",
        "n.addedBy",
        "n.show",
      ])
      .where("nd.idDictionary", "in", ids)
      .orderBy("nd.id", "asc")
      .execute();

    const byDict = new Map<number, ReturnType<typeof transformNovel>[]>();
    for (const link of links) {
      const idDictionary = Number(link.idDictionary);
      const item = transformNovel({
        id: Number(link.id),
        code: link.code,
        nameOriginal: link.nameOriginal,
        nameCustom: link.nameCustom,
        driver: link.driver,
        numberChapters: Number(link.numberChapters),
        flagR18: link.flagR18,
        completed: link.completed,
        addedBy: link.addedBy,
        show: link.show,
      });
      const list = byDict.get(idDictionary) ?? [];
      list.push(item);
      byDict.set(idDictionary, list);
    }
    return dicts.map((row) => transformDictionaryWithNovels(row, byDict.get(Number(row.id)) ?? []));
  }

  private async loadCategories(idDictionary: number, idCategory?: number) {
    let query = this.db
      .selectFrom("dictionaryCategories as c")
      .leftJoin(
        this.db
          .selectFrom("dictionaryEntries")
          .select((eb) => ["idCategory", eb.fn.countAll<number>().as("count_entries")])
          .groupBy("idCategory")
          .as("ce"),
        "ce.idCategory",
        "c.id",
      )
      .select(["c.id", "c.idDictionary", "c.name", "ce.count_entries"])
      .where("c.idDictionary", "=", idDictionary)
      .orderBy("c.id", "asc");
    if (idCategory !== undefined) {
      query = query.where("c.id", "=", idCategory);
    }
    const rows = await query.execute();
    return rows.map((row) => transformCategory(row as CategoryRow));
  }
}
