import Fastify, { type FastifyInstance } from "fastify";
import type { Db } from "./db/client.js";
import { FileCache } from "./cache/fileCache.js";
import { ChapterListService } from "./services/chapterList.js";
import { CatalogService } from "./services/catalog.js";
import { MetaService } from "./services/meta.js";
import { CacheDictionaryService } from "./services/cacheDictionary.js";
import { chapterRoutes } from "./routes/chapters.js";
import { ChapterWriteService } from "./services/chapterWrite.js";
import { catalogRoutes } from "./routes/catalog.js";
import { cacheDictionaryRoutes } from "./routes/cacheDictionary.js";
import { LaravelChapterCache } from "./cache/laravelChapterCache.js";
import { StaticPageService } from "./services/staticPages.js";
import { staticPageRoutes } from "./routes/staticPages.js";
import { PoliteHttp } from "./drivers/politeHttp.js";
import { KakuyomuClient } from "./drivers/kakuyomu.js";
import { SyosetuClient } from "./drivers/syosetu.js";
import { KakuyomuJobStore } from "./services/kakuyomuJob.js";
import { KakuyomuUpdateService } from "./services/kakuyomuUpdate.js";
import { kakuyomuUpdateRoutes } from "./routes/kakuyomuUpdate.js";
import { DictionaryWriteService } from "./services/dictionaryWrite.js";
import { dictionaryWriteRoutes } from "./routes/dictionaryWrite.js";
import { NovelWriteService } from "./services/novelWrite.js";
import { novelWriteRoutes } from "./routes/novelWrite.js";

export type BuildAppOptions = {
  db: Db;
  cacheDir: string;
  laravelDictionaryCacheDir?: string;
  laravelChapterCacheDir?: string;
  imagesBaseUrl?: string;
  appUrl?: string;
  kakuyomuClient?: KakuyomuClient;
  syosetuClient?: SyosetuClient;
  kakuyomuJobs?: KakuyomuJobStore;
  kakuyomuNow?: () => Date;
  chapterNow?: () => Date;
};

export async function buildApp(opts: BuildAppOptions): Promise<FastifyInstance> {
  // Angular list calls use a trailing slash (/api/novel/, /api/dictionary/, /api/category/:id/).
  // Without this, Fastify treats those as the parametric routes with an empty id and 400s validation.
  const app = Fastify({
    logger: false,
    routerOptions: {
      ignoreTrailingSlash: true,
    },
  });
  const cache = new FileCache(opts.cacheDir);
  const chapterList = new ChapterListService(opts.db, cache);
  const catalog = new CatalogService(opts.db, cache);
  const meta = new MetaService(cache);
  const chapterCache = new LaravelChapterCache(opts.laravelChapterCacheDir ?? "");
  const chapterWrites = new ChapterWriteService({
    db: opts.db,
    cache,
    chapterList,
    chapterHtml: chapterCache,
    now: opts.chapterNow ?? opts.kakuyomuNow,
  });
  const cacheDictionary = new CacheDictionaryService(
    opts.db,
    cache,
    opts.laravelDictionaryCacheDir ?? "",
    chapterCache,
  );
  const dictionaryWrites = new DictionaryWriteService({
    db: opts.db,
    catalog,
    cacheDictionary,
    now: opts.chapterNow ?? opts.kakuyomuNow,
  });
  const novelWrites = new NovelWriteService({
    db: opts.db,
    cache,
    catalog,
    chapterHtml: chapterCache,
  });
  const staticPages = new StaticPageService(
    opts.db,
    cacheDictionary,
    chapterCache,
    opts.imagesBaseUrl ?? "",
    opts.appUrl ?? "",
  );
  const jobs = opts.kakuyomuJobs ?? new KakuyomuJobStore();
  const updater = new KakuyomuUpdateService({
    db: opts.db,
    cache,
    catalog,
    chapterList,
    chapterHtml: chapterCache,
    client: opts.kakuyomuClient ?? new KakuyomuClient(new PoliteHttp()),
    syosetuClient: opts.syosetuClient ?? new SyosetuClient(new PoliteHttp()),
    jobs,
    now: opts.kakuyomuNow,
  });

  app.get("/health", async () => ({ status: "ok" }));
  await app.register(kakuyomuUpdateRoutes, { updater, jobs });
  await app.register(chapterRoutes, { service: chapterList, writes: chapterWrites });
  await app.register(catalogRoutes, { catalog, meta });
  await app.register(dictionaryWriteRoutes, { writes: dictionaryWrites });
  await app.register(novelWriteRoutes, { writes: novelWrites });
  await app.register(cacheDictionaryRoutes, { service: cacheDictionary });
  await app.register(staticPageRoutes, { service: staticPages });
  return app;
}
