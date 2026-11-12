export type NovelDriver = string | null;

export function chapterUrlSource(opts: {
  driver: NovelDriver;
  code: string;
  flagR18: number | boolean;
  no: number;
  noCode: string | null;
}): string | null {
  const driver = opts.driver ?? "";
  if (driver === "syosetu") {
    const host = opts.flagR18 ? "novel18" : "ncode";
    const chapter = opts.no > 0 ? String(opts.no) : "";
    return `https://${host}.syosetu.com/${opts.code}/${chapter}`;
  }
  if (driver === "kakuyomu") {
    let link = `https://kakuyomu.jp/works/${opts.code}`;
    if (opts.noCode) {
      link += `/episodes/${opts.noCode}`;
    }
    return link;
  }
  return null;
}

/** Novel-level source URL. Manual/unknown drivers are an empty string, matching Novel::getUrlSource(). */
export function novelUrlSource(opts: {
  driver: NovelDriver;
  code: string;
  flagR18: number | boolean;
}): string {
  const driver = opts.driver ?? "";
  const r18 = typeof opts.flagR18 === "boolean" ? opts.flagR18 : Number(opts.flagR18) !== 0;
  if (driver === "syosetu") {
    const host = r18 ? "novel18" : "ncode";
    return `https://${host}.syosetu.com/${opts.code}/`;
  }
  if (driver === "kakuyomu") {
    return `https://kakuyomu.jp/works/${opts.code}`;
  }
  return "";
}
