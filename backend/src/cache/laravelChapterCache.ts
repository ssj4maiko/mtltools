import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/**
 * Laravel's rendered /static HTML lives at
 * storage/app/public/chapters/{idDictionary}/{idNovel}/{no}-{part}.html
 * (CACHEFOLDER in CacheChapters). Serving and writing the same files keeps
 * CacheChapters::del() and the scrapper purge path working.
 */
export class LaravelChapterCache {
  constructor(private readonly root: string) {}

  filePath(idDictionary: number, idNovel: number, no: number, part = 1): string {
    return join(this.root, String(idDictionary), String(idNovel), `${no}-${part}.html`);
  }

  async get(idDictionary: number, idNovel: number, no: number, part = 1): Promise<string | null> {
    if (!this.root) return null;
    try {
      return await readFile(this.filePath(idDictionary, idNovel, no, part), "utf8");
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return null;
      throw err;
    }
  }

  async set(idDictionary: number, idNovel: number, no: number, part: number, body: string): Promise<void> {
    if (!this.root) return;
    const filePath = this.filePath(idDictionary, idNovel, no, part);
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

  /** CacheChapters::del($no) still deletes the whole dictionary directory. */
  async invalidateDictionary(idDictionary: number): Promise<void> {
    if (!this.root) return;
    await rm(join(this.root, String(idDictionary)), { recursive: true, force: true });
  }

  /** Remove every dictionary's folder for this novel. */
  async invalidateNovel(idNovel: number): Promise<void> {
    if (!this.root) return;
    let entries: string[] = [];
    try {
      entries = await readdir(this.root);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return;
      throw err;
    }
    await Promise.all(entries.map((idDictionary) => rm(join(this.root, idDictionary, String(idNovel)), { recursive: true, force: true })));
  }

  async invalidateAll(): Promise<void> {
    if (!this.root) return;
    let entries: string[] = [];
    try {
      entries = await readdir(this.root);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return;
      throw err;
    }
    await Promise.all(entries.map((name) => rm(join(this.root, name), { recursive: true, force: true })));
  }
}
