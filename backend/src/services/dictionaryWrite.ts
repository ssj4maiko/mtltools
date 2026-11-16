import type { Db } from "../db/client.js";
import type { CatalogService } from "./catalog.js";
import { NotFoundError } from "./catalog.js";
import { CacheDictionaryService, DictionaryNotFoundError } from "./cacheDictionary.js";
import { nowMysqlUtc } from "../drivers/kakuyomu.js";
import { phpJsonEncode, laravelTimestampToJson } from "../json/phpJson.js";
import type { CategoryItem } from "../transformers/categoryTransformer.js";

export class InvalidDictionaryWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidDictionaryWriteError";
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super("Category not found");
    this.name = "CategoryNotFoundError";
  }
}

export class EntryNotFoundError extends Error {
  constructor() {
    super("Entry not found");
    this.name = "EntryNotFoundError";
  }
}

export function simplifyEntry(original: string | null | undefined): { simplified: string; length: number } {
  const simplified = (original ?? "").replace(/\p{P}/gu, "");
  return { simplified, length: Buffer.byteLength(simplified, "utf8") };
}

export function categoryRefOrNull(value: unknown): number | null {
  if (value === undefined || value === null || value === "" || value === "null") return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(n) || n < 1) {
    throw new InvalidDictionaryWriteError("sufix/prefix must be a category id, null, or the string \"null\"");
  }
  return n;
}

function asString(value: unknown, fallback = ""): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function truthyFlag(value: unknown): boolean {
  return Boolean(value);
}

type EntryWrite = {
  idDictionary: number;
  idCategory: number;
  entryOriginal: string;
  entryTranslation: string;
  description: string;
  sufix: number | null;
  prefix: number | null;
  simplified: string;
  length: number;
};

function parseEntryFields(raw: Record<string, unknown>, idDictionary: number, fallbackCategory: number): EntryWrite {
  const idCategory = raw.idCategory !== undefined ? Number(raw.idCategory) : fallbackCategory;
  if (!Number.isInteger(idCategory) || idCategory < 1) {
    throw new InvalidDictionaryWriteError("idCategory must be a positive integer");
  }
  const entryOriginal = asString(raw.entryOriginal, "");
  const { simplified, length } = simplifyEntry(entryOriginal);
  return {
    idDictionary,
    idCategory,
    entryOriginal,
    entryTranslation: asString(raw.entryTranslation, ""),
    description: asString(raw.description, ""),
    sufix: categoryRefOrNull(raw.sufix),
    prefix: categoryRefOrNull(raw.prefix),
    simplified,
    length,
  };
}

export type DictionaryWriteDeps = {
  db: Db;
  catalog: CatalogService;
  cacheDictionary: CacheDictionaryService;
  now?: () => Date;
};

export class DictionaryWriteService {
  private readonly now: () => Date;

  constructor(private readonly deps: DictionaryWriteDeps) {
    this.now = deps.now ?? (() => new Date());
  }

  async insertDictionary(body: unknown): Promise<string> {
    const { dictionary, novels } = parseDictionaryBody(body, { requireDictionary: true });
    const inserted = await this.deps.db
      .insertInto("dictionaries")
      .values({
        name: dictionary.name!,
        language: dictionary.language!,
        dateRevision: nowMysqlUtc(this.now()),
      })
      .executeTakeFirstOrThrow();
    const id = Number(inserted.insertId);
    if (!Number.isInteger(id) || id < 1) throw new Error("failed to insert dictionary");
    await this.deps.db.insertInto("dictionaryCategories").values({ idDictionary: id, name: "default" }).execute();
    if (novels) await this.replaceNovels(id, novels);
    await this.invalidate(id);
    return this.deps.catalog.getDictionaryJson(id);
  }

  async updateDictionary(idDictionary: number, body: unknown): Promise<string> {
    await this.requireDictionary(idDictionary);
    const { dictionary, novels } = parseDictionaryBody(body, { requireDictionary: false });
    const patch: Record<string, unknown> = { dateRevision: nowMysqlUtc(this.now()) };
    if (dictionary.name !== undefined) patch.name = dictionary.name;
    if (dictionary.language !== undefined) patch.language = dictionary.language;
    await this.deps.db.updateTable("dictionaries").set(patch).where("id", "=", idDictionary).execute();
    if (novels) await this.replaceNovels(idDictionary, novels);
    await this.invalidate(idDictionary);
    return this.deps.catalog.getDictionaryJson(idDictionary);
  }

  async deleteDictionary(idDictionary: number): Promise<number> {
    await this.requireDictionary(idDictionary);
    await this.deps.db.transaction().execute(async (trx) => {
      await trx.deleteFrom("dictionaryEntries").where("idDictionary", "=", idDictionary).execute();
      await trx.deleteFrom("dictionaryCategories").where("idDictionary", "=", idDictionary).execute();
      await trx.deleteFrom("novelsDictionaries").where("idDictionary", "=", idDictionary).execute();
      await trx.deleteFrom("dictionaries").where("id", "=", idDictionary).execute();
    });
    await this.invalidate(idDictionary);
    return 1;
  }

  async insertCategory(idDictionary: number, body: unknown): Promise<string> {
    await this.requireDictionary(idDictionary);
    const name = parseCategoryName(body);
    const inserted = await this.deps.db
      .insertInto("dictionaryCategories")
      .values({ idDictionary, name })
      .executeTakeFirstOrThrow();
    const id = Number(inserted.insertId);
    await this.invalidate(idDictionary);
    return this.deps.catalog.getCategoryJson(idDictionary, id);
  }

  async updateCategory(idDictionary: number, idCategory: number, body: unknown): Promise<string> {
    await this.requireCategory(idDictionary, idCategory);
    const name = parseCategoryName(body);
    await this.deps.db
      .updateTable("dictionaryCategories")
      .set({ name })
      .where("id", "=", idCategory)
      .where("idDictionary", "=", idDictionary)
      .execute();
    await this.invalidate(idDictionary);
    return this.deps.catalog.getCategoryJson(idDictionary, idCategory);
  }

  async deleteCategory(idDictionary: number, idCategory: number): Promise<number> {
    await this.requireCategory(idDictionary, idCategory);
    await this.deps.db.transaction().execute(async (trx) => {
      await trx.deleteFrom("dictionaryEntries").where("idDictionary", "=", idDictionary).where("idCategory", "=", idCategory).execute();
      await trx.deleteFrom("dictionaryCategories").where("id", "=", idCategory).where("idDictionary", "=", idDictionary).execute();
    });
    await this.invalidate(idDictionary);
    return 1;
  }

  async insertEntry(idDictionary: number, idCategory: number, body: unknown): Promise<string> {
    if (!isPlainObject(body)) throw new InvalidDictionaryWriteError("JSON object body required");
    await this.requireCategory(idDictionary, idCategory);
    const fields = parseEntryFields(body, idDictionary, idCategory);
    const inserted = await this.deps.db.insertInto("dictionaryEntries").values(fields).executeTakeFirstOrThrow();
    const id = Number(inserted.insertId);
    await this.invalidate(idDictionary);
    return this.deps.catalog.getEntryJson(id);
  }

  async updateEntry(idDictionary: number, idCategory: number, idEntry: number, body: unknown): Promise<string> {
    if (!isPlainObject(body)) throw new InvalidDictionaryWriteError("JSON object body required");
    const existing = await this.deps.db
      .selectFrom("dictionaryEntries")
      .select(["id", "idDictionary", "idCategory"])
      .where("id", "=", idEntry)
      .executeTakeFirst();
    if (!existing) throw new EntryNotFoundError();
    // Laravel looked up by id only; still refuse to move an entry across dictionaries.
    if (Number(existing.idDictionary) !== idDictionary) throw new EntryNotFoundError();
    const fields = parseEntryFields(body, idDictionary, body.idCategory !== undefined ? Number(body.idCategory) : idCategory);
    await this.deps.db.updateTable("dictionaryEntries").set(fields).where("id", "=", idEntry).execute();
    await this.invalidate(idDictionary);
    return this.deps.catalog.getEntryJson(idEntry);
  }

  async deleteEntry(idDictionary: number, idCategory: number, idEntry: number): Promise<number> {
    const existing = await this.deps.db
      .selectFrom("dictionaryEntries")
      .select(["id"])
      .where("id", "=", idEntry)
      .where("idDictionary", "=", idDictionary)
      .where("idCategory", "=", idCategory)
      .executeTakeFirst();
    if (!existing) throw new EntryNotFoundError();
    await this.deps.db.deleteFrom("dictionaryEntries").where("id", "=", idEntry).execute();
    await this.invalidate(idDictionary);
    return 1;
  }

  async fullSave(idDictionary: number, body: unknown): Promise<{ changes: boolean; dateRevision?: string }> {
    await this.requireDictionary(idDictionary);
    if (!Array.isArray(body)) throw new InvalidDictionaryWriteError("fullSave expects an array of categories");
    let changes = false;
    for (const raw of body) {
      if (!isPlainObject(raw)) throw new InvalidDictionaryWriteError("each category must be an object");
      let idCategory = raw.id !== undefined && raw.id !== null ? Number(raw.id) : undefined;
      if (idCategory === undefined) {
        const name = parseCategoryName(raw);
        const inserted = await this.deps.db
          .insertInto("dictionaryCategories")
          .values({ idDictionary, name })
          .executeTakeFirstOrThrow();
        idCategory = Number(inserted.insertId);
        changes = true;
      } else if (truthyFlag(raw.update)) {
        await this.requireCategory(idDictionary, idCategory);
        await this.deps.db
          .updateTable("dictionaryCategories")
          .set({ name: parseCategoryName(raw) })
          .where("id", "=", idCategory)
          .where("idDictionary", "=", idDictionary)
          .execute();
        changes = true;
      }
      if (Array.isArray(raw.entries)) {
        const affected = await this.applyEntryBatch(raw.entries, idDictionary, idCategory!);
        if (affected) changes = true;
      }
    }
    if (changes) await this.bumpRevision(idDictionary);
    if (changes) await this.invalidate(idDictionary);
    const result: { changes: boolean; dateRevision?: string } = { changes };
    if (changes) {
      const row = await this.deps.db
        .selectFrom("dictionaries")
        .select("dateRevision")
        .where("id", "=", idDictionary)
        .executeTakeFirstOrThrow();
      result.dateRevision = laravelTimestampToJson(row.dateRevision) ?? undefined;
    }
    return result;
  }

  async updateByCategory(
    idDictionary: number,
    idCategory: number,
    body: unknown,
  ): Promise<string> {
    await this.requireCategory(idDictionary, idCategory);
    if (!Array.isArray(body)) throw new InvalidDictionaryWriteError("updatebycategory expects an array of entries");
    const changed = await this.applyEntryBatch(body, idDictionary, idCategory);
    if (changed) {
      await this.bumpRevision(idDictionary);
      await this.invalidate(idDictionary);
    }
    // Return the current category list (frontend merges by id) and this category's entries.
    const entriesJson = await this.deps.catalog.getEntriesJson(idDictionary, idCategory);
    const categoriesJson = await this.deps.catalog.getCategoriesJson(idDictionary);
    const categories = JSON.parse(categoriesJson) as CategoryItem[];
    return phpJsonEncode({
      categories,
      entries: JSON.parse(entriesJson),
    });
  }

  private async applyEntryBatch(entries: unknown[], idDictionary: number, fallbackCategory: number): Promise<boolean> {
    let changed = false;
    for (const raw of entries) {
      if (!isPlainObject(raw)) throw new InvalidDictionaryWriteError("each entry must be an object");
      if (raw.id === undefined || raw.id === null) {
        if (raw.entryOriginal !== undefined || raw.entryTranslation !== undefined) {
          const fields = parseEntryFields(raw, idDictionary, fallbackCategory);
          await this.deps.db.insertInto("dictionaryEntries").values(fields).execute();
          changed = true;
        }
        continue;
      }
      const id = Number(raw.id);
      if (!Number.isInteger(id) || id < 1) throw new InvalidDictionaryWriteError("entry id must be a positive integer");
      if (truthyFlag(raw.delete)) {
        await this.deps.db.deleteFrom("dictionaryEntries").where("id", "=", id).where("idDictionary", "=", idDictionary).execute();
        changed = true;
        continue;
      }
      if (truthyFlag(raw.update)) {
        const fields = parseEntryFields(raw, idDictionary, fallbackCategory);
        const existing = await this.deps.db
          .selectFrom("dictionaryEntries")
          .select("id")
          .where("id", "=", id)
          .where("idDictionary", "=", idDictionary)
          .executeTakeFirst();
        if (!existing) throw new EntryNotFoundError();
        await this.deps.db.updateTable("dictionaryEntries").set(fields).where("id", "=", id).execute();
        changed = true;
      }
    }
    return changed;
  }

  private async bumpRevision(idDictionary: number): Promise<void> {
    await this.deps.db
      .updateTable("dictionaries")
      .set({ dateRevision: nowMysqlUtc(this.now()) })
      .where("id", "=", idDictionary)
      .execute();
  }

  private async replaceNovels(idDictionary: number, novelIds: number[]): Promise<void> {
    await this.deps.db.deleteFrom("novelsDictionaries").where("idDictionary", "=", idDictionary).execute();
    if (novelIds.length === 0) return;
    const existing = await this.deps.db.selectFrom("novels").select("id").where("id", "in", novelIds).execute();
    const have = new Set(existing.map((r) => Number(r.id)));
    const missing = novelIds.filter((id) => !have.has(id));
    if (missing.length > 0) {
      throw new InvalidDictionaryWriteError(`unknown novel id(s): ${missing.join(", ")}`);
    }
    await this.deps.db
      .insertInto("novelsDictionaries")
      .values(novelIds.map((idNovel) => ({ idNovel, idDictionary })))
      .execute();
  }

  private async requireDictionary(idDictionary: number): Promise<void> {
    const row = await this.deps.db.selectFrom("dictionaries").select("id").where("id", "=", idDictionary).executeTakeFirst();
    if (!row) throw new DictionaryNotFoundError();
  }

  private async requireCategory(idDictionary: number, idCategory: number): Promise<void> {
    await this.requireDictionary(idDictionary);
    const row = await this.deps.db
      .selectFrom("dictionaryCategories")
      .select("id")
      .where("id", "=", idCategory)
      .where("idDictionary", "=", idDictionary)
      .executeTakeFirst();
    if (!row) throw new CategoryNotFoundError();
  }

  private async invalidate(idDictionary: number): Promise<void> {
    await this.deps.cacheDictionary.invalidateOnWrite(idDictionary);
  }
}

function parseDictionaryBody(
  body: unknown,
  opts: { requireDictionary: boolean },
): { dictionary: { name?: string; language?: string }; novels?: number[] } {
  if (!isPlainObject(body)) throw new InvalidDictionaryWriteError("JSON object body required");
  const raw = isPlainObject(body.dictionary) ? body.dictionary : opts.requireDictionary ? null : {};
  if (!raw) throw new InvalidDictionaryWriteError("dictionary object required");
  const dictionary: { name?: string; language?: string } = {};
  if (opts.requireDictionary || raw.name !== undefined) {
    const name = asString(raw.name, "").trim();
    if (!name) throw new InvalidDictionaryWriteError("dictionary.name is required");
    dictionary.name = name;
  }
  if (opts.requireDictionary || raw.language !== undefined) {
    const language = asString(raw.language, "").trim();
    if (!language) throw new InvalidDictionaryWriteError("dictionary.language is required");
    dictionary.language = language;
  }
  let novels: number[] | undefined;
  if (body.novels !== undefined) {
    if (!Array.isArray(body.novels)) throw new InvalidDictionaryWriteError("novels must be an array of ids");
    novels = body.novels.map((id) => {
      const n = typeof id === "number" ? id : Number(id);
      if (!Number.isInteger(n) || n < 1) throw new InvalidDictionaryWriteError("novels must be positive integers");
      return n;
    });
  }
  return { dictionary, novels };
}

function parseCategoryName(body: unknown): string {
  if (!isPlainObject(body)) throw new InvalidDictionaryWriteError("JSON object body required");
  const name = asString(body.name, "").trim();
  if (!name) throw new InvalidDictionaryWriteError("name is required");
  if (name.length > 20) throw new InvalidDictionaryWriteError("name must be at most 20 characters");
  return name;
}

export { DictionaryNotFoundError, NotFoundError };
