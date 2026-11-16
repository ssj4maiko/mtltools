import type { PoliteHttp } from "./politeHttp.js";

export type SyosetuEpisode = {
  no: number;
  title: string;
  arc: string | null;
  dateOriginalPost: string;
  dateOriginalRevision: string | null;
};

export type SyosetuIndex = {
  code: string;
  r18: boolean;
  lastPage: number;
  episodes: SyosetuEpisode[];
};

const NCODE_RE = /^n[0-9]+[a-z]+$/i;

export function assertNcode(code: string): string {
  const trimmed = code.trim();
  if (!NCODE_RE.test(trimmed)) {
    throw new Error("Invalid Syosetu ncode");
  }
  return trimmed.toLowerCase();
}

export function syosetuHost(r18: boolean): string {
  return r18 ? "https://novel18.syosetu.com" : "https://ncode.syosetu.com";
}

export function indexUrl(ncode: string, page: number, r18: boolean): string {
  const base = `${syosetuHost(r18)}/${assertNcode(ncode)}/`;
  return page > 1 ? `${base}?p=${page}` : base;
}

export function chapterUrl(ncode: string, no: number, r18: boolean): string {
  if (!Number.isInteger(no) || no < 1) {
    throw new Error("Invalid Syosetu chapter number");
  }
  return `${syosetuHost(r18)}/${assertNcode(ncode)}/${no}/`;
}

export function r18Headers(r18: boolean): Record<string, string> {
  const headers: Record<string, string> = { Accept: "text/html" };
  if (r18) headers.Cookie = "over18=yes";
  return headers;
}

/** Syosetu index dates are naive wall-clock values. Keep Laravel's YYYY-MM-DD HH:MM:00 form. */
export function parseSyosetuDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/.exec(value);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}:00`;
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)));
}

function collapseText(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function pagerHref(html: string, kind: "last" | "next"): number | null {
  const quoted = html.match(new RegExp(`href="[^"]*[?&]p=(\\d+)"[^>]*c-pager__item--${kind}`));
  if (quoted) return Number(quoted[1]);
  const classFirst = html.match(new RegExp(`c-pager__item--${kind}[^>]*href="[^"]*[?&]p=(\\d+)`));
  if (classFirst) return Number(classFirst[1]);
  return null;
}

export function hasNextPageLink(html: string): boolean {
  return /<a\b[^>]*c-pager__item--next/.test(html) || /c-pager__item--next[^>]*href=/.test(html);
}

/** Prefer the "last" button. Ignore "previous" hrefs — those are not the last page. */
export function parseLastPage(html: string): number {
  return pagerHref(html, "last") ?? pagerHref(html, "next") ?? 1;
}

export function parseIndexPage(html: string, ncode: string): { episodes: SyosetuEpisode[]; lastPage: number } {
  const code = assertNcode(ncode);
  const escaped = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tokenRe = new RegExp(
    `<div class="p-eplist__chapter-title">([\\s\\S]*?)</div>|<a href="/${escaped}/(\\d+)/?"[^>]*class="[^"]*p-eplist__subtitle[^"]*"[^>]*>([\\s\\S]*?)</a>[\\s\\S]*?<div class="p-eplist__update">([\\s\\S]*?)</div>`,
    "gi",
  );

  const episodes: SyosetuEpisode[] = [];
  let arc: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(html))) {
    if (m[1] !== undefined && m[2] === undefined) {
      const title = collapseText(m[1]);
      arc = title || null;
      continue;
    }
    const no = Number(m[2]);
    const title = collapseText(m[3] ?? "");
    const updateChunk = m[4] ?? "";
    const dateMatches = [...updateChunk.matchAll(/(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2})/g)].map((d) => d[1]);
    const post = parseSyosetuDate(dateMatches[0] ?? null);
    if (!post || !Number.isInteger(no) || no < 1) continue;
    let revision: string | null = null;
    const titleAt = updateChunk.indexOf("<span title=");
    if (titleAt >= 0) {
      revision = parseSyosetuDate(updateChunk.slice(titleAt));
    }
    episodes.push({ no, title, arc, dateOriginalPost: post, dateOriginalRevision: revision });
  }

  return { episodes, lastPage: parseLastPage(html) };
}

type BodyKind = "preface" | "main" | "afterword";

function novelTextKind(classAttr: string): BodyKind | null {
  if (/(?:^|[\s"])(?:p-)?novel__text--preface(?:[\s"]|$)/.test(classAttr)) return "preface";
  if (/(?:^|[\s"])(?:p-)?novel__text--afterword(?:[\s"]|$)/.test(classAttr)) return "afterword";
  if (/(?:^|[\s"])(?:p-)?novel__text(?:[\s"]|$)/.test(classAttr)) return "main";
  return null;
}

export function parseChapterBody(html: string): string {
  const parts: Partial<Record<BodyKind, string>> = {};
  const re = /<div\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const attrs = m[1] ?? "";
    const classM = /class="([^"]*)"/.exec(attrs);
    if (!classM) continue;
    const kind = novelTextKind(classM[1]);
    if (!kind || parts[kind] !== undefined) continue;
    const openEnd = html.indexOf(">", m.index);
    if (openEnd < 0) continue;
    const close = html.indexOf("</div>", openEnd + 1);
    const inner = html.slice(openEnd + 1, close < 0 ? undefined : close).trim();
    if (inner) parts[kind] = inner;
  }
  return (["preface", "main", "afterword"] as BodyKind[]).map((k) => parts[k]).filter(Boolean).join("<ht/>");
}

export function parseChapterTitle(html: string): string | null {
  const titled = html.match(/<([a-z0-9]+)[^>]*class="[^"]*p-novel__title[^"]*"[^>]*>([\s\S]*?)<\/\1>/i);
  if (titled) {
    const title = collapseText(titled[2]);
    if (title) return title;
  }
  const legacy = html.match(/id="novel_subtitle"[^>]*>([\s\S]*?)<\/(?:div|p|h1|h2|span)>/i);
  if (legacy) {
    const title = collapseText(legacy[1]);
    if (title) return title;
  }
  const docTitle = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (docTitle) {
    const title = collapseText(docTitle[1]);
    if (title) return title;
  }
  return null;
}

export class SyosetuClient {
  constructor(private readonly http: PoliteHttp) {}

  async fetchIndex(ncode: string, r18: boolean): Promise<SyosetuIndex> {
    const code = assertNcode(ncode);
    const episodes: SyosetuEpisode[] = [];
    const seen = new Set<number>();
    let lastPage = 1;
    for (let page = 1; page <= lastPage; page++) {
      const res = await this.http.request(indexUrl(code, page, r18), { headers: r18Headers(r18) });
      if (res.status !== 200) {
        throw new Error(`Syosetu index HTTP ${res.status}`);
      }
      const parsed = parseIndexPage(res.body, code);
      if (page === 1) lastPage = Math.max(1, parsed.lastPage);
      if (hasNextPageLink(res.body)) lastPage = Math.max(lastPage, page + 1);
      for (const ep of parsed.episodes) {
        if (seen.has(ep.no)) continue;
        seen.add(ep.no);
        episodes.push(ep);
      }
    }
    episodes.sort((a, b) => a.no - b.no);
    return { code, r18, lastPage, episodes };
  }

  async fetchChapter(ncode: string, no: number, r18: boolean): Promise<{ title: string | null; body: string }> {
    const res = await this.http.request(chapterUrl(ncode, no, r18), { headers: r18Headers(r18) });
    if (res.status !== 200) {
      throw new Error(`Syosetu chapter HTTP ${res.status}`);
    }
    return { title: parseChapterTitle(res.body), body: parseChapterBody(res.body) };
  }

  async fetchChapterBody(ncode: string, no: number, r18: boolean): Promise<string> {
    const chapter = await this.fetchChapter(ncode, no, r18);
    return chapter.body;
  }
}
