import { mkdtemp } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { createDb, createPoolFromConfig } from "../../src/db/client.js";
import { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";
import type { FastifyInstance } from "fastify";
import type { Db } from "../../src/db/client.js";

const here = dirname(fileURLToPath(import.meta.url));
export const schemaSql = readFileSync(join(here, "schema.sql"), "utf8");

export type IntegrationHarness = {
  db: Db;
  app: FastifyInstance;
  cacheDir: string;
  baseUrl: string;
  close: () => Promise<void>;
};

/**
 * Connect to the compose-managed MariaDB (testdb). Testcontainers is not used:
 * run tests with `docker compose -f docker-compose.backend.yml run --rm tools npm test`.
 */
export function testDbEnv(env: NodeJS.ProcessEnv = process.env) {
  if (env.MTLTOOLS_TEST_DB !== "1") {
    throw new Error(
      "Integration tests need the compose testdb. From the repo root: docker compose -f docker-compose.backend.yml run --rm tools npm test",
    );
  }
  return {
    host: env.DB_HOST ?? "testdb",
    port: Number(env.DB_PORT ?? "3306"),
    user: env.DB_USERNAME ?? "test",
    password: env.DB_PASSWORD ?? "test",
    database: env.DB_DATABASE ?? "mtltools_test",
  };
}

export async function applySchema(sql: string, env: NodeJS.ProcessEnv = process.env): Promise<void> {
  const dbEnv = testDbEnv(env);
  const conn = await mysql.createConnection({
    ...dbEnv,
    multipleStatements: true,
  });
  try {
    // testdb is reused across compose runs; start from a blank schema each time.
    await conn.query("SET FOREIGN_KEY_CHECKS=0");
    const [tables] = await conn.query("SHOW TABLES");
    for (const row of tables as Array<Record<string, string>>) {
      const name = Object.values(row)[0];
      await conn.query(`DROP TABLE IF EXISTS \`${name}\``);
    }
    await conn.query("SET FOREIGN_KEY_CHECKS=1");
    await conn.query(sql);
  } finally {
    await conn.end();
  }
}

export async function startApp(extraEnv: Record<string, string> = {}): Promise<IntegrationHarness> {
  const config = loadConfig({
    ...process.env,
    ...extraEnv,
    DB_HOST: extraEnv.DB_HOST ?? process.env.DB_HOST ?? "testdb",
    DB_PORT: extraEnv.DB_PORT ?? process.env.DB_PORT ?? "3306",
    DB_DATABASE: extraEnv.DB_DATABASE ?? process.env.DB_DATABASE ?? "mtltools_test",
    DB_USERNAME: extraEnv.DB_USERNAME ?? process.env.DB_USERNAME ?? "test",
    DB_PASSWORD: extraEnv.DB_PASSWORD ?? process.env.DB_PASSWORD ?? "test",
  });
  const pool = createPoolFromConfig(config);
  const db = createDb(pool);
  const cacheDir = await mkdtemp(join(tmpdir(), "mtl-int-cache-"));
  const app = await buildApp({ db, cacheDir });
  await app.listen({ host: "127.0.0.1", port: 0 });
  const addr = app.server.address();
  if (!addr || typeof addr === "string") {
    throw new Error("no listen address");
  }
  return {
    db,
    app,
    cacheDir,
    baseUrl: `http://127.0.0.1:${addr.port}`,
    close: async () => {
      await app.close();
      await db.destroy();
    },
  };
}
