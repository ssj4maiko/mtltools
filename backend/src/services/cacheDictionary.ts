import { rm } from "node:fs/promises";
import { join } from "node:path";
import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import { phpJsonEncode } from "../json/phpJson.js";
import { laravelTimestampToJson } from "../json/phpJson.js";
import {
  transformCacheCategory,
  transformCacheDictionaryEntry,
  type CacheDictionaryBlob,
  type EntryRow,
} from "../transformers/entryTransformer.js";

export class DictionaryNotFoundError extends Error {
  constructor() {
    super("Dictionary not found");
    this.name = "DictionaryNotFoundError";
  }
}

export class CacheDictionaryService {
  constructor(
    private readonly db: Db,
    private readonly cache: FileCache,
    private readonly laravelCacheDir: string = "",
  ) {}

  async getJson(idDictionary: number): Promise<string> {
    const path = this.cache.cacheDictionaryPath(idDictionary);
    const hit = await this.cache.get(path);
    if (hit) return hit.toString("utf8");
    const body = await this.build(idDictionary);
    await this.cache.set(path, body);
    return body;
  }

  async rebuildJson(idDictionary: number): Promise<string> {
    const body = await this.build(idDictionary);
    await this.cache.set(this.cache.cacheDictionaryPath(idDictionary), body);
    await this.deleteLaravelCacheFiles(idDictionary);
    return body;
  }

  private async build(idDictionary: number): Promise<string> {
    const dict = await this.db
      .selectFrom("dictionaries")
      .selectAll()
      .where("id", "=", idDictionary)
      .executeTakeFirst();
    if (!dict) throw new DictionaryNotFoundError();

    const categories = await this.db
      .selectFrom("dictionaryCategories as c")
      .leftJoin(
        this.db
          .selectFrom("dictionaryEntries")
          .select((eb) => ["idCategory", eb.fn.countAll<number>().as("count")])
          .groupBy("idCategory")
          .as("ce"),
        "ce.idCategory",
        "c.id",
      )
      .select(["c.id", "c.idDictionary", "c.name", "ce.count"])
      .where("c.idDictionary", "=", idDictionary)
      .orderBy("c.id", "asc")
      .execute();

    const entries = await this.db
      .selectFrom("dictionaryEntries as e")
      .innerJoin("dictionaryCategories as c", "c.id", "e.idCategory")
      .select([
        "e.id",
        "e.idCategory",
        "e.entryOriginal",
        "e.entryTranslation",
        "e.description",
        "e.length",
        "e.sufix",
        "e.prefix",
        "e.simplified",
      ])
      .where("c.idDictionary", "=", idDictionary)
      .orderBy("e.sufix", "asc")
      .orderBy("e.prefix", "asc")
      .orderBy("e.length", "desc")
      .execute();

    const blob: CacheDictionaryBlob = {
      id: Number(dict.id),
      name: dict.name,
      language: dict.language,
      dateCreated: laravelTimestampToJson(dict.dateCreated) as string,
      dateRevision: laravelTimestampToJson(dict.dateRevision),
      count_categories: categories.length,
      dictionary_category: categories.map((row) =>
        transformCacheCategory(
          { id: Number(row.id), idDictionary: Number(row.idDictionary), name: row.name },
          Number(row.count ?? 0),
        ),
      ),
      dictionary_entry: entries.map((row) =>
        transformCacheDictionaryEntry(row as EntryRow, Number(dict.id)),
      ),
    };
    return phpJsonEncode(blob);
  }

  private async deleteLaravelCacheFiles(idDictionary: number): Promise<void> {
    if (!this.laravelCacheDir) return;
    await Promise.all([
      rm(join(this.laravelCacheDir, `${idDictionary}.json`), { force: true }),
      rm(join(this.laravelCacheDir, `${idDictionary}.txt`), { force: true }),
    ]);
  }
}
