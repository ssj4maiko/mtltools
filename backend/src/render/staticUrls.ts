export function absoluteImageUrls(html: string, imagesBaseUrl: string): string {
  const base = imagesBaseUrl.replace(/\/+$/, "");
  if (!base) return html;
  return html.replace(/((?:src|href)=(["']))\/images\//g, `$1${base}/images/`);
}

export function staticPagePath(idNovel: number, idDictionary: number, no: number, part = 1): string {
  return `/static/${idNovel}/${idDictionary}/${no}/${part}`;
}

/**
 * Port of CacheChapters::UrlCreator. `$part` is passed as 0 by Laravel, so
 * the URL's last segment is always 1 today (`$part + 1`).
 */
export function adjacentStaticUrl(opts: {
  idNovel: number;
  idDictionary: number;
  noChapter: number;
  numberChapters: number;
  driver: string | null;
  direction: "-" | "+" | "=";
}): string | null {
  let no = opts.noChapter;
  if (opts.direction === "-") {
    no -= 1;
    if (no === 0) return null;
  } else if (opts.direction === "+") {
    no += 1;
    // Laravel: only a missing/empty driver is treated as "manual upload".
    if (!opts.driver && no > opts.numberChapters) return null;
  }
  return staticPagePath(opts.idNovel, opts.idDictionary, no, 1);
}

export function assetUrl(appUrl: string, rel: string): string {
  const base = appUrl.replace(/\/+$/, "");
  const path = rel.replace(/^\/+/, "");
  if (!base) return "/" + path;
  return `${base}/${path}`;
}

/**
 * URL passed to the wait page. Laravel calls startDriver(numberChapters + 1)
 * (not the requested chapter number) and then prepareUrl().
 */
export function waitSourceUrl(opts: {
  driver: string | null;
  code: string | null;
  flagR18?: number | boolean | null;
  numberChapters: number;
}): string | null {
  if (!opts.driver || !opts.code) return null;
  const chapter = opts.numberChapters + 1;
  if (opts.driver === "syosetu") {
    const r18 = opts.flagR18 === true || Number(opts.flagR18) !== 0;
    const host = r18 ? "novel18" : "ncode";
    return `https://${host}.syosetu.com/${opts.code}/${chapter}`;
  }
  if (opts.driver === "kakuyomu") {
    return `https://kakuyomu.jp/works/${opts.code}/episodes/${chapter}`;
  }
  return null;
}
