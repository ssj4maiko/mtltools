import type { FileCache } from "../cache/fileCache.js";
import { phpJsonEncode } from "../json/phpJson.js";

/** Mirrors Novel::getDrivers() and MetaService::languages(). */
export const META_DRIVERS = {
  manual: "Manual",
  syosetu: "Syosetu ni Narou / 小説家になろう",
  kakuyomu: "Kakuyomu / カクヨム",
} as const;

export const META_LANGUAGES = {
  english: "English",
} as const;

const providers: Record<string, () => unknown> = {
  drivers: () => META_DRIVERS,
  languages: () => META_LANGUAGES,
};

export class UnknownMetaError extends Error {
  constructor(public readonly key: string) {
    super(`Unknown meta key: ${key}`);
    this.name = "UnknownMetaError";
  }
}

function isCommonKeys(keys: string[]): boolean {
  return keys.length === 2 && keys[0] === "drivers" && keys[1] === "languages";
}

export class MetaService {
  constructor(private readonly cache: FileCache) {}

  async getMetaJson(keys: string[] | undefined): Promise<string> {
    if (!keys || keys.length === 0) {
      return phpJsonEncode([]);
    }
    if (isCommonKeys(keys)) {
      const hit = await this.cache.get(this.cache.metaPath());
      if (hit) return hit.toString("utf8");
    }
    const vessel: Record<string, unknown> = {};
    for (const key of keys) {
      const provider = providers[key];
      if (!provider) throw new UnknownMetaError(key);
      vessel[key] = provider();
    }
    const body = phpJsonEncode(vessel);
    if (isCommonKeys(keys)) {
      await this.cache.set(this.cache.metaPath(), body);
    }
    return body;
  }
}
