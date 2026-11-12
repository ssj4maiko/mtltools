import Fastify, { type FastifyInstance } from "fastify";
import type { Db } from "./db/client.js";
import { FileCache } from "./cache/fileCache.js";
import { ChapterListService } from "./services/chapterList.js";
import { chapterRoutes } from "./routes/chapters.js";

export type BuildAppOptions = {
  db: Db;
  cacheDir: string;
};

export async function buildApp(opts: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({ logger: false });
  const cache = new FileCache(opts.cacheDir);
  const chapterList = new ChapterListService(opts.db, cache);

  app.get("/health", async () => ({ status: "ok" }));
  await app.register(chapterRoutes, { service: chapterList });
  return app;
}
