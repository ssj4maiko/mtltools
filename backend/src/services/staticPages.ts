import type { Db } from "../db/client.js";
import type { CacheDictionaryService } from "./cacheDictionary.js";
import { LaravelChapterCache } from "../cache/laravelChapterCache.js";
import { translateText, type TranslateEntry } from "../translate/translateText.js";
import { absoluteImageUrls, waitSourceUrl } from "../render/staticUrls.js";
import {
  buildStaticControls,
  renderChapterPage,
  renderStopPage,
  renderWaitPage,
  type StaticNovel,
} from "../render/staticPages.js";
import { DictionaryNotFoundError } from "./cacheDictionary.js";
import { NovelNotFoundError } from "./chapterList.js";

const TITLE_ARC_SEPARATOR = "||||||||||";

export class StaticPageService {
  constructor(
    private readonly db: Db,
    private readonly cacheDictionary: CacheDictionaryService,
    private readonly chapterCache: LaravelChapterCache,
    private readonly imagesBaseUrl: string,
    private readonly appUrl: string,
  ) {}

  async getHtml(idNovel: number, idDictionary: number, no: number, part = 1): Promise<string> {
    const cached = await this.chapterCache.get(idDictionary, idNovel, no, part);
    if (cached !== null) return cached;

    const html = await this.render(idNovel, idDictionary, no);
    return html;
  }

  private async render(idNovel: number, idDictionary: number, no: number): Promise<string> {
    const novelRow = await this.db
      .selectFrom("novels")
      .select(["id", "code", "nameOriginal", "nameCustom", "driver", "numberChapters", "flagR18"])
      .where("id", "=", idNovel)
      .executeTakeFirst();
    if (!novelRow) throw new NovelNotFoundError(idNovel);

    const novel: StaticNovel = {
      id: Number(novelRow.id),
      nameOriginal: novelRow.nameOriginal,
      nameCustom: novelRow.nameCustom,
      numberChapters: Number(novelRow.numberChapters),
      driver: novelRow.driver,
      code: novelRow.code,
    };

    let dictionaryJson: string;
    try {
      dictionaryJson = await this.cacheDictionary.getJson(idDictionary);
    } catch (err) {
      if (err instanceof DictionaryNotFoundError) throw err;
      throw err;
    }

    const chapter = await this.db
      .selectFrom("chapters")
      .select(["no", "title", "arc", "textOriginal", "textRevision"])
      .where("idNovel", "=", idNovel)
      .where("no", "=", no)
      .executeTakeFirst();

    const controls = buildStaticControls(novel, idDictionary, no);

    if (!chapter) {
      const sourceUrl = waitSourceUrl({
        driver: novel.driver,
        code: novel.code,
        flagR18: novelRow.flagR18,
        numberChapters: novel.numberChapters,
      });
      if (sourceUrl) {
        return renderWaitPage({
          novel,
          no,
          controls,
          sourceUrl,
          appUrl: this.appUrl,
        });
      }
      return renderStopPage({ novel, no, controls });
    }

    const parsed = JSON.parse(dictionaryJson) as { dictionary_entry?: TranslateEntry[] };
    const entries = Array.isArray(parsed.dictionary_entry) ? parsed.dictionary_entry : [];
    const sourceText = chapter.textRevision ? chapter.textRevision : (chapter.textOriginal ?? "");
    const blob = translateText(
      `${chapter.title ?? ""}${TITLE_ARC_SEPARATOR}${chapter.arc ?? ""}${TITLE_ARC_SEPARATOR}${sourceText}`,
      entries,
    );
    const parts = blob.split(TITLE_ARC_SEPARATOR);
    const title = parts[0] ?? "";
    const arc = parts[1] ?? "";
    const text = absoluteImageUrls(parts[2] ?? "", this.imagesBaseUrl);

    const html = renderChapterPage({
      novel,
      chapter: { no, title, arc, text },
      controls,
    });

    await this.chapterCache.set(idDictionary, idNovel, no, 1, html);
    return html;
  }
}
