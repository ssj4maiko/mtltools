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
