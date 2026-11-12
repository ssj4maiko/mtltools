import { loadConfig } from "./config.js";
import { FileCache } from "./cache/fileCache.js";

function arg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
}

const cmd = process.argv[2];
const config = loadConfig();
const cache = new FileCache(config.cacheDir);

if (cmd !== "cache-purge") {
  console.error("Usage: node dist/cli.js cache-purge --novel=ID | --all");
  process.exit(2);
}

if (process.argv.includes("--all")) {
  await cache.invalidateAllChapterLists();
  console.log("purged all chapter-list cache files");
} else {
  const novel = arg("novel");
  if (!novel || !/^[0-9]+$/.test(novel)) {
    console.error("Usage: node dist/cli.js cache-purge --novel=ID | --all");
    process.exit(2);
  }
  await cache.invalidateChapterList(Number(novel));
  console.log(`purged chapter-list cache for novel ${novel}`);
}
