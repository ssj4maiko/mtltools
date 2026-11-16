import { loadConfig } from "./config.js";
import { FileCache } from "./cache/fileCache.js";
import { LaravelChapterCache } from "./cache/laravelChapterCache.js";
import { createDb, createPoolFromConfig } from "./db/client.js";
import { extractChapterImages } from "./services/extractImages.js";

function arg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
}

function args(name: string): string[] {
  const prefix = `--${name}=`;
  return process.argv.filter((a) => a.startsWith(prefix)).map((a) => a.slice(prefix.length));
}

const cmd = process.argv[2];
const config = loadConfig();
const cache = new FileCache(config.cacheDir);
const chapterHtml = new LaravelChapterCache(config.laravelChapterCacheDir);

if (cmd === "cache-purge") {
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
  process.exit(0);
}

if (cmd === "extract-images") {
  if (!config.imagesDir || !config.imageExtractionDir) {
    console.error("extract-images needs IMAGES_DIR and IMAGE_EXTRACTION_DIR");
    process.exit(2);
  }
  const usage = "Usage: node dist/cli.js extract-images [--dry-run] [--novel=ID]... [--no=N]... [--limit=N]";
  const novels = args("novel").map((v) => {
    if (!/^[0-9]+$/.test(v)) {
      console.error(usage);
      process.exit(2);
    }
    return Number(v);
  });
  const nos = args("no").map((v) => {
    if (!/^[0-9]+$/.test(v)) {
      console.error(usage);
      process.exit(2);
    }
    return Number(v);
  });
  if (nos.length > 0 && novels.length === 0) {
    console.error("extract-images --no= requires --novel=");
    process.exit(2);
  }
  const limitRaw = arg("limit");
  if (limitRaw !== undefined && !/^[0-9]+$/.test(limitRaw)) {
    console.error(usage);
    process.exit(2);
  }
  const pool = createPoolFromConfig(config);
  const db = createDb(pool);
  try {
    const totals = await extractChapterImages({
      db,
      imagesDir: config.imagesDir,
      manifestDir: config.imageExtractionDir,
      cache,
      chapterHtml,
      dryRun: process.argv.includes("--dry-run"),
      novels: novels.length ? novels : undefined,
      nos: nos.length ? nos : undefined,
      limit: limitRaw !== undefined ? Number(limitRaw) : undefined,
    });
    const mb = (b: number) => `${(b / 1048576).toFixed(1)} MB`;
    const dry = process.argv.includes("--dry-run");
    console.log(
      JSON.stringify(
        {
          "chapters scanned": totals.rows,
          [dry ? "chapters that would change" : "chapters updated"]: dry ? totals.would : totals.updated,
          "conflicts (text changed meanwhile, skipped)": totals.conflicts,
          "data URIs found": totals.uris,
          "data URIs left as-is (undecodable/unknown type)": totals.skipped_uris,
          "rows still containing data:image": totals.leftover_rows,
          [dry ? "files that would be written" : "files written"]: `${totals.files_new} (${mb(totals.file_bytes_new)})`,
          "files already present": totals.files_existing,
          "text before -> after": `${mb(totals.before)} -> ${mb(totals.after)}`,
          manifest: totals.manifest,
        },
        null,
        2,
      ),
    );
  } finally {
    await db.destroy();
  }
  process.exit(0);
}

console.error(
  "Usage: node dist/cli.js cache-purge --novel=ID | --dictionary=ID | --all\n" +
    "       node dist/cli.js extract-images [--dry-run] [--novel=ID]... [--no=N]... [--limit=N]",
);
process.exit(2);
