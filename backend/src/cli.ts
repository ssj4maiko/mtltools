import { loadConfig } from "./config.js";
import { FileCache } from "./cache/fileCache.js";
import { LaravelChapterCache } from "./cache/laravelChapterCache.js";

function arg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
}

const cmd = process.argv[2];
const config = loadConfig();
const cache = new FileCache(config.cacheDir);
const chapterHtml = new LaravelChapterCache(config.laravelChapterCacheDir);

if (cmd !== "cache-purge") {
  console.error("Usage: node dist/cli.js cache-purge --novel=ID | --dictionary=ID | --all");
  process.exit(2);
}

if (process.argv.includes("--all")) {
  await cache.invalidateAll();
  await chapterHtml.invalidateAll();
  console.log("purged all chapter-list, chapter, catalog, and static chapter HTML cache files");
} else if (arg("dictionary")) {
  const id = arg("dictionary")!;
  if (!/^[0-9]+$/.test(id)) {
    console.error("Usage: node dist/cli.js cache-purge --novel=ID | --dictionary=ID | --all");
    process.exit(2);
  }
  await cache.invalidateDictionary(Number(id));
  await chapterHtml.invalidateDictionary(Number(id));
  console.log(`purged catalog, cache-dictionary, and static chapter HTML for dictionary ${id}`);
} else {
  const novel = arg("novel");
  if (!novel || !/^[0-9]+$/.test(novel)) {
    console.error("Usage: node dist/cli.js cache-purge --novel=ID | --dictionary=ID | --all");
    process.exit(2);
  }
  await cache.invalidateNovel(Number(novel));
  await chapterHtml.invalidateNovel(Number(novel));
  console.log(`purged chapter-list, chapter, novel catalog, and static chapter HTML for novel ${novel}`);
}
