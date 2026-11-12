import Fastify, { type FastifyInstance } from "fastify";
import type { Db } from "./db/client.js";
import { FileCache } from "./cache/fileCache.js";
import { ChapterListService } from "./services/chapterList.js";
import { CatalogService } from "./services/catalog.js";
import { MetaService } from "./services/meta.js";
import { CacheDictionaryService } from "./services/cacheDictionary.js";
import { chapterRoutes } from "./routes/chapters.js";
import { catalogRoutes } from "./routes/catalog.js";
import { cacheDictionaryRoutes } from "./routes/cacheDictionary.js";
import { LaravelChapterCache } from "./cache/laravelChapterCache.js";
import { StaticPageService } from "./services/staticPages.js";
import { staticPageRoutes } from "./routes/staticPages.js";

export type BuildAppOptions = {
  db: Db;
  cacheDir: string;
  laravelDictionaryCacheDir?: string;
  laravelChapterCacheDir?: string;
  imagesBaseUrl?: string;
  appUrl?: string;
};

export async function buildApp(opts: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({ logger: false });
  const cache = new FileCache(opts.cacheDir);
  const chapterList = new ChapterListService(opts.db, cache);
  const catalog = new CatalogService(opts.db, cache);
  const meta = new MetaService(cache);
  const chapterCache = new LaravelChapterCache(opts.laravelChapterCacheDir ?? "");
  const cacheDictionary = new CacheDictionaryService(
    opts.db,
    cache,
    opts.laravelDictionaryCacheDir ?? "",
    chapterCache,
  );
  const staticPages = new StaticPageService(
    opts.db,
    cacheDictionary,
    chapterCache,
    opts.imagesBaseUrl ?? "",
    opts.appUrl ?? "",
  );

  app.get("/health", async () => ({ status: "ok" }));
  await app.register(chapterRoutes, { service: chapterList });
  await app.register(catalogRoutes, { catalog, meta });
  await app.register(cacheDictionaryRoutes, { service: cacheDictionary });
  await app.register(staticPageRoutes, { service: staticPages });
  return app;
}
