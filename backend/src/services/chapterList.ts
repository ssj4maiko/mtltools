import type { Db } from "../db/client.js";
import type { FileCache } from "../cache/fileCache.js";
import { phpJsonEncode } from "../json/phpJson.js";
import {
  transformChapterListItem,
  type ChapterListRow,
} from "../transformers/chapterTransformer.js";

export class NovelNotFoundError extends Error {
  constructor(public readonly idNovel: number) {
    super(`Novel ${idNovel} not found`);
    this.name = "NovelNotFoundError";
  }
}

export function assertNoTextColumns(sql: string): void {
  const forbidden = ["textOriginal", "textRevision", "textCustom"];
  const lower = sql.toLowerCase();
  for (const col of forbidden) {
    if (lower.includes(col.toLowerCase())) {
      throw new Error(`chapter list query must not touch ${col}`);
    }
  }
}

export class ChapterListService {
  constructor(
    private readonly db: Db,
    private readonly cache: FileCache,
  ) {}

  async getListJson(idNovel: number, search?: string): Promise<string> {
    const useCache = search === undefined;
    if (useCache) {
      const cached = await this.cache.get(this.cache.chapterListPath(idNovel));
      if (cached) return cached.toString("utf8");
    }

    const novel = await this.db
      .selectFrom("novels")
      .select(["id", "code", "driver", "flagR18"])
      .where("id", "=", idNovel)
      .executeTakeFirst();
    if (!novel) {
      throw new NovelNotFoundError(idNovel);
    }

    let query = this.db
      .selectFrom("chapters as c")
      .innerJoin("novels as n", "n.id", "c.idNovel")
      .select([
        "c.idNovel as idNovel",
        "c.no as no",
        "c.noCode as noCode",
        "c.arc as arc",
        "c.title as title",
        "c.dateCreated as dateCreated",
        "c.dateRevision as dateRevision",
        "c.dateOriginalPost as dateOriginalPost",
        "c.dateOriginalRevision as dateOriginalRevision",
        "c.hasText as hasText",
        "n.driver as driver",
        "n.code as code",
        "n.flagR18 as flagR18",
      ])
      .where("c.idNovel", "=", idNovel)
      .orderBy("c.no", "asc");

    if (search !== undefined) {
      const like = `%${search}%`;
      query = query.where((eb) =>
        eb.or([
          eb("c.title", "like", like),
          eb("c.textRevision", "like", like),
          eb.and([eb("c.textOriginal", "like", like), eb("c.textRevision", "is", null)]),
        ]),
      );
    } else {
      assertNoTextColumns(query.compile().sql);
    }

    const rows = (await query.execute()) as ChapterListRow[];
    const body = phpJsonEncode(rows.map(transformChapterListItem));
    if (useCache) {
      await this.cache.set(this.cache.chapterListPath(idNovel), body);
    }
    return body;
  }
}
