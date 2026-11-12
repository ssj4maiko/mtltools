import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export class FileCache {
  constructor(private readonly root: string) {}

  chapterListPath(idNovel: number): string {
    return join(this.root, "chapter-list", `${idNovel}.json`);
  }

  chapterPath(idNovel: number, no: number): string {
    return join(this.root, "chapter", String(idNovel), `${no}.json`);
  }

  chaptersDir(idNovel: number): string {
    return join(this.root, "chapter", String(idNovel));
  }

  async get(filePath: string): Promise<Buffer | null> {
    try {
      return await readFile(filePath);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return null;
      throw err;
    }
  }

  async set(filePath: string, body: string | Buffer): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });
    const tmp = filePath + ".tmp-" + process.pid;
    try {
      await writeFile(tmp, body);
      await rename(tmp, filePath);
    } catch (err) {
      await rm(tmp, { force: true });
      throw err;
    }
  }

  async invalidateChapterList(idNovel: number): Promise<void> {
    await rm(this.chapterListPath(idNovel), { force: true });
  }

  async invalidateChapter(idNovel: number, no: number): Promise<void> {
    await rm(this.chapterPath(idNovel, no), { force: true });
  }

  async invalidateChaptersForNovel(idNovel: number): Promise<void> {
    await rm(this.chaptersDir(idNovel), { recursive: true, force: true });
  }

  async invalidateNovel(idNovel: number): Promise<void> {
    await this.invalidateChapterList(idNovel);
    await this.invalidateChaptersForNovel(idNovel);
    await this.invalidateNovelCatalog(idNovel);
  }

  async invalidateAllChapterLists(): Promise<void> {
    await rm(join(this.root, "chapter-list"), { recursive: true, force: true });
  }

  async invalidateAllChapters(): Promise<void> {
    await rm(join(this.root, "chapter"), { recursive: true, force: true });
  }

  async invalidateAll(): Promise<void> {
    await this.invalidateAllChapterLists();
    await this.invalidateAllChapters();
    await this.invalidateCatalog();
  }

  novelListPath(): string {
    return join(this.root, "novel-list", "all.json");
  }

  novelPath(idNovel: number): string {
    return join(this.root, "novel", `${idNovel}.json`);
  }

  novelsByDictionaryPath(idDictionary: number): string {
    return join(this.root, "novels-by-dictionary", `${idDictionary}.json`);
  }

  dictionaryListPath(): string {
    return join(this.root, "dictionary-list", "all.json");
  }

  dictionaryPath(idDictionary: number): string {
    return join(this.root, "dictionary", `${idDictionary}.json`);
  }

  dictionariesByNovelPath(idNovel: number): string {
    return join(this.root, "dictionaries-by-novel", `${idNovel}.json`);
  }

  categoryListPath(idDictionary: number): string {
    return join(this.root, "category-list", `${idDictionary}.json`);
  }

  categoryPath(idDictionary: number, idCategory: number): string {
    return join(this.root, "category", String(idDictionary), `${idCategory}.json`);
  }

  entryListPath(idDictionary: number, idCategory: number): string {
    return join(this.root, "entry-list", String(idDictionary), `${idCategory}.json`);
  }

  entryPath(idEntry: number): string {
    return join(this.root, "entry", `${idEntry}.json`);
  }

  cacheDictionaryPath(idDictionary: number): string {
    return join(this.root, "cache-dictionary", `${idDictionary}.json`);
  }

  metaPath(): string {
    return join(this.root, "meta", "meta.json");
  }

  async invalidateCatalog(): Promise<void> {
    await Promise.all(
      [
        "novel-list",
        "novel",
        "novels-by-dictionary",
        "dictionary-list",
        "dictionary",
        "dictionaries-by-novel",
        "category-list",
        "category",
        "entry-list",
        "entry",
        "cache-dictionary",
        "meta",
      ].map((dir) => rm(join(this.root, dir), { recursive: true, force: true })),
    );
  }

  async invalidateDictionary(idDictionary: number): Promise<void> {
    await Promise.all([
      rm(this.dictionaryListPath(), { force: true }),
      rm(this.dictionaryPath(idDictionary), { force: true }),
      rm(this.novelsByDictionaryPath(idDictionary), { force: true }),
      rm(this.categoryListPath(idDictionary), { force: true }),
      rm(join(this.root, "category", String(idDictionary)), { recursive: true, force: true }),
      rm(join(this.root, "entry-list", String(idDictionary)), { recursive: true, force: true }),
      rm(this.cacheDictionaryPath(idDictionary), { force: true }),
      // Nested dictionary payloads on every novel list/detail can be stale.
      rm(join(this.root, "novel-list"), { recursive: true, force: true }),
      rm(join(this.root, "novel"), { recursive: true, force: true }),
      rm(join(this.root, "dictionaries-by-novel"), { recursive: true, force: true }),
    ]);
  }

  async invalidateNovelCatalog(idNovel: number): Promise<void> {
    await Promise.all([
      rm(this.novelListPath(), { force: true }),
      rm(this.novelPath(idNovel), { force: true }),
      rm(this.dictionariesByNovelPath(idNovel), { force: true }),
      rm(join(this.root, "dictionary-list"), { recursive: true, force: true }),
      rm(join(this.root, "dictionary"), { recursive: true, force: true }),
      rm(join(this.root, "novels-by-dictionary"), { recursive: true, force: true }),
    ]);
  }
}
