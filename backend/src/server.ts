import { loadConfig } from "./config.js";
import { createDb, createPoolFromConfig } from "./db/client.js";
import { buildApp } from "./app.js";

const config = loadConfig();
const pool = createPoolFromConfig(config);
const db = createDb(pool);
const app = await buildApp({ db, cacheDir: config.cacheDir });

const shutdown = async () => {
  await app.close();
  await db.destroy();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

await app.listen({ port: config.port, host: "0.0.0.0" });
