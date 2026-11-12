import { Kysely, MysqlDialect } from "kysely";
import { createPool, type Pool } from "mysql2";
import type { AppConfig } from "../config.js";
import type { Database } from "./types.js";

export type Db = Kysely<Database>;

export function createPoolFromConfig(config: AppConfig): Pool {
  return createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    decimalNumbers: true,
    dateStrings: true,
    connectionLimit: 4,
    enableKeepAlive: true,
  });
}

export function createDb(pool: Pool): Db {
  return new Kysely<Database>({
    dialect: new MysqlDialect({ pool: pool as never }),
  });
}
