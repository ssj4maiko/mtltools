function optional(name: string, fallback: string, env: NodeJS.ProcessEnv = process.env): string {
  const value = env[name];
  return value === undefined || value === "" ? fallback : value;
}

export type AppConfig = {
  port: number;
  cacheDir: string;
  laravelDictionaryCacheDir: string;
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    port: Number(optional("PORT", "3000", env)),
    cacheDir: optional("CACHE_DIR", "./cache", env),
    laravelDictionaryCacheDir: optional("LARAVEL_DICTIONARY_CACHE_DIR", "", env),
    db: {
      host: optional("DB_HOST", "127.0.0.1", env),
      port: Number(optional("DB_PORT", "3306", env)),
      database: optional("DB_DATABASE", "mtltools_prod", env),
      user: optional("DB_USERNAME", "root", env),
      password: env.DB_PASSWORD ?? "",
    },
  };
}
