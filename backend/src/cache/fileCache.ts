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
  }
}
