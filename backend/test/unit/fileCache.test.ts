import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FileCache } from "../../src/cache/fileCache.js";

describe("FileCache", () => {
  it("writes atomically, reads back, and invalidates a chapter list", async () => {
    const dir = await mkdtemp(join(tmpdir(), "mtl-cache-"));
    const cache = new FileCache(dir);
    const path = cache.chapterListPath(42);
    expect(await cache.get(path)).toBeNull();
    await cache.set(path, '[{"idNovel":42}]');
    expect((await cache.get(path))?.toString("utf8")).toBe('[{"idNovel":42}]');
    expect(await readFile(path, "utf8")).toBe('[{"idNovel":42}]');
    await cache.invalidateChapterList(42);
    expect(await cache.get(path)).toBeNull();
  });

  it("stores and invalidates a single chapter, and invalidateNovel clears list and chapters", async () => {
    const dir = await mkdtemp(join(tmpdir(), "mtl-cache-"));
    const cache = new FileCache(dir);
    const list = cache.chapterListPath(7);
    const one = cache.chapterPath(7, 3);
    await cache.set(list, "[]");
    await cache.set(one, '{"no":3}');
    expect((await cache.get(one))?.toString("utf8")).toBe('{"no":3}');
    await cache.invalidateChapter(7, 3);
    expect(await cache.get(one)).toBeNull();
    await cache.set(one, '{"no":3}');
    await cache.invalidateNovel(7);
    expect(await cache.get(list)).toBeNull();
    expect(await cache.get(one)).toBeNull();
  });
});
