import type { PoliteHttp } from "./politeHttp.js";

export function isoToMysqlUtc(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`unparseable ISO date (${iso.length} chars)`);
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

export function nowMysqlUtc(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
}

/** Incoming revision is usable and newer than the stored one (or stored is empty). */
export function revisionIsNewer(incoming: string | null | undefined, stored: string | null | undefined): boolean {
  if (!incoming) return false;
  if (!stored) return true;
  return incoming > stored;
}

export function revisionFromPublishedEdited(publishedAt: string, editedAt: string | null | undefined): string | null {
  if (!editedAt) return null;
  const pub = new Date(publishedAt).getTime();
  const edit = new Date(editedAt).getTime();
  if (Number.isNaN(pub) || Number.isNaN(edit) || edit <= pub) return null;
  return isoToMysqlUtc(editedAt);
}

export type WorkSignals = {
  editedAt: string | null;
  lastEpisodePublishedAt: string | null;
  publicEpisodeCount: number | null;
  totalCharacterCount: number | null;
};

export type IndexEpisode = {
  no: number;
  noCode: string;
  arc: string | null;
  title: string;
  dateOriginalPost: string;
  dateOriginalRevision: null;
  publishedAt: string;
};

export type WorkIndex = {
  code: string;
  etag: string | null;
  work: WorkSignals;
  episodes: IndexEpisode[];
};

export type EpisodeMeta = {
  dateOriginalPost: string;
  dateOriginalRevision: string | null;
  publishedAt: string;
  editedAt: string | null;
  characterCount: number | null;
};

type ApolloRef = { __ref: string };
type ApolloNode = Record<string, unknown>;

function asRecord(value: unknown): ApolloNode | undefined {
  return value && typeof value === "object" ? (value as ApolloNode) : undefined;
}

export function parseWorkPage(html: string, code: string, etag: string | null = null): WorkIndex {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (!m) {
    throw new Error("Kakuyomu work page is missing __NEXT_DATA__");
  }
  const data = JSON.parse(m[1]) as {
    props?: { pageProps?: { __APOLLO_STATE__?: Record<string, unknown> } };
    query?: { workId?: string };
  };
  const apollo = data.props?.pageProps?.__APOLLO_STATE__;
  if (!apollo || typeof apollo !== "object") {
    throw new Error("Kakuyomu work page is missing __APOLLO_STATE__");
  }
  const workId = data.query?.workId ?? code;
  const work = asRecord(apollo[`Work:${workId}`]);
  if (!work) {
    throw new Error("Kakuyomu work page Apollo state is missing Work");
  }
  const tocRefs = (work.tableOfContentsV2 ?? work.tableOfContents ?? []) as ApolloRef[];
  const episodes: IndexEpisode[] = [];
  let no = 1;
  for (const ref of tocRefs) {
    const section = asRecord(apollo[ref.__ref]);
    const chapterRef = asRecord(section?.chapter)?.__ref as string | undefined;
    const arcNode = chapterRef ? asRecord(apollo[chapterRef]) : undefined;
    const arc = typeof arcNode?.title === "string" ? arcNode.title : null;
    for (const epRef of (section?.episodeUnions as ApolloRef[] | undefined) ?? []) {
      const ep = asRecord(apollo[epRef.__ref]);
      if (!ep || ep.__typename !== "Episode" || typeof ep.id !== "string" || typeof ep.publishedAt !== "string") {
        continue;
      }
      const title = typeof ep.title === "string" ? ep.title : "";
      episodes.push({
        no,
        noCode: ep.id,
        arc,
        title,
        dateOriginalPost: isoToMysqlUtc(ep.publishedAt),
        dateOriginalRevision: null,
        publishedAt: ep.publishedAt,
      });
      no += 1;
    }
  }
  const count = work.publicEpisodeCount;
  const chars = work.totalCharacterCount;
  return {
    code: workId,
    etag,
    work: {
      editedAt: typeof work.editedAt === "string" ? work.editedAt : null,
      lastEpisodePublishedAt: typeof work.lastEpisodePublishedAt === "string" ? work.lastEpisodePublishedAt : null,
      publicEpisodeCount: typeof count === "number" ? count : count != null ? Number(count) : null,
      totalCharacterCount: typeof chars === "number" ? chars : chars != null ? Number(chars) : null,
    },
    episodes,
  };
}

export function parseSidebarDl(html: string): EpisodeMeta {
  const dls = [...html.matchAll(/<dl\b[^>]*>[\s\S]*?<\/dl>/gi)];
  if (dls.length === 0) {
    throw new Error("Kakuyomu sidebar is missing a definition list");
  }
  const lastDl = dls[dls.length - 1][0];
  const pairs = [...lastDl.matchAll(/<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/gi)].map(([, dt, dd]) => ({
    dt: dt.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    times: [...dd.matchAll(/datetime="([^"]+)"/g)].map((x) => x[1]),
    ddText: dd.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  }));
  const published = pairs.find((p) => p.dt === "公開日");
  const edited = pairs.find((p) => p.dt === "最終更新日");
  const count = pairs.find((p) => p.dt === "文字数");
  const publishedAt = published?.times[0];
  if (!publishedAt) {
    throw new Error("Kakuyomu sidebar is missing 公開日");
  }
  const editedAt = edited?.times[0] ?? null;
  const characterCount = count ? Number(String(count.ddText).replace(/[^\d]/g, "")) : null;
  return {
    publishedAt,
    editedAt,
    dateOriginalPost: isoToMysqlUtc(publishedAt),
    dateOriginalRevision: revisionFromPublishedEdited(publishedAt, editedAt),
    characterCount: Number.isFinite(characterCount) ? characterCount : null,
  };
}

export function parseEpisodeBody(html: string): string {
  const marker = "widget-episodeBody";
  const classPos = html.indexOf(marker);
  if (classPos >= 0) {
    const start = html.indexOf(">", classPos);
    if (start >= 0) {
      const end = html.indexOf("</div>", start + 1);
      if (end >= 0) {
        return html.slice(start + 1, end);
      }
    }
  }
  const footer = html.match(/class="[^"]*widget-episodeBody[^"]*"[^>]*>([\s\S]*?)<div id="episodeFooter"/);
  if (footer) return footer[1];
  throw new Error("Kakuyomu episode page is missing widget-episodeBody");
}

export function parsePublicEpisodeUnion(payload: unknown, episodeId: string): EpisodeMeta {
  const body = payload as {
    errors?: { message: string }[];
    data?: { work?: { publicEpisodeUnion?: Record<string, unknown> | null } };
  };
  if (body.errors?.length) {
    throw new Error(`Kakuyomu GraphQL error: ${body.errors[0].message}`);
  }
  const ev = body.data?.work?.publicEpisodeUnion;
  if (!ev || ev.__typename !== "Episode" || ev.id !== episodeId || typeof ev.publishedAt !== "string") {
    throw new Error("Kakuyomu GraphQL publicEpisodeUnion payload was unexpected");
  }
  const publishedAt = ev.publishedAt;
  const editedAt = typeof ev.editedAt === "string" ? ev.editedAt : null;
  const characterCount = typeof ev.characterCount === "number" ? ev.characterCount : null;
  return {
    publishedAt,
    editedAt,
    dateOriginalPost: isoToMysqlUtc(publishedAt),
    dateOriginalRevision: revisionFromPublishedEdited(publishedAt, editedAt),
    characterCount,
  };
}

export const PUBLIC_EPISODE_UNION_QUERY = `
query MtltoolsPublicEpisodeUnion($workId: ID!, $episodeId: ID!) {
  work(id: $workId) {
    publicEpisodeUnion(id: $episodeId) {
      __typename
      ... on Episode {
        id
        publishedAt
        editedAt
        characterCount
      }
    }
  }
}
`.trim();

/** Work-page __APOLLO_STATE__ Episode nodes only have id, title, and publishedAt.
 *  tableOfContents (v1) on the public GraphQL endpoint returns editedAt and
 *  characterCount for every episode in one request. tableOfContentsV2 500s. */
export const TABLE_OF_CONTENTS_EPISODES_QUERY = `
query MtltoolsTableOfContentsEpisodes($workId: ID!) {
  work(id: $workId) {
    id
    publicEpisodeCount
    tableOfContents {
      __typename
      ... on TableOfContentsChapter {
        id
        episodeUnions {
          __typename
          ... on Episode {
            id
            publishedAt
            editedAt
            characterCount
          }
        }
      }
    }
  }
}
`.trim();

export function parseTableOfContentsEpisodes(payload: unknown): Map<string, EpisodeMeta> {
  const body = payload as {
    errors?: { message: string }[];
    data?: {
      work?: {
        publicEpisodeCount?: number | null;
        tableOfContents?: Array<{
          __typename?: string;
          episodeUnions?: Array<Record<string, unknown> | null> | null;
        } | null> | null;
      } | null;
    };
  };
  if (body.errors?.length) {
    throw new Error(`Kakuyomu GraphQL error: ${body.errors[0].message}`);
  }
  const toc = body.data?.work?.tableOfContents;
  if (!Array.isArray(toc)) {
    throw new Error("Kakuyomu GraphQL tableOfContents payload was unexpected");
  }
  const metas = new Map<string, EpisodeMeta>();
  for (const chapter of toc) {
    for (const ev of chapter?.episodeUnions ?? []) {
      if (!ev || ev.__typename !== "Episode" || typeof ev.id !== "string" || typeof ev.publishedAt !== "string") {
        continue;
      }
      const publishedAt = ev.publishedAt;
      const editedAt = typeof ev.editedAt === "string" ? ev.editedAt : null;
      const characterCount = typeof ev.characterCount === "number" ? ev.characterCount : null;
      metas.set(ev.id, {
        publishedAt,
        editedAt,
        dateOriginalPost: isoToMysqlUtc(publishedAt),
        dateOriginalRevision: revisionFromPublishedEdited(publishedAt, editedAt),
        characterCount,
      });
    }
  }
  const expected = body.data?.work?.publicEpisodeCount;
  if (metas.size === 0) {
    throw new Error("Kakuyomu GraphQL tableOfContents returned no episodes");
  }
  if (typeof expected === "number" && expected > 0 && metas.size !== expected) {
    throw new Error(`Kakuyomu GraphQL tableOfContents count mismatch (${metas.size} vs ${expected})`);
  }
  return metas;
}

export type WorkIndexResult = { notModified: true } | { notModified: false; index: WorkIndex };

export class KakuyomuClient {
  constructor(private readonly http: PoliteHttp) {}

  async fetchWorkIndex(code: string, etag?: string | null): Promise<WorkIndexResult> {
    const headers: Record<string, string> = { Accept: "text/html" };
    if (etag) headers["If-None-Match"] = etag;
    const res = await this.http.request(`https://kakuyomu.jp/works/${code}`, { headers });
    if (res.status === 304) return { notModified: true };
    if (res.status !== 200) {
      throw new Error(`Kakuyomu work page HTTP ${res.status}`);
    }
    const nextEtag = res.headers.get("etag");
    return { notModified: false, index: parseWorkPage(res.body, code, nextEtag) };
  }

  async fetchEpisodeMeta(workId: string, episodeId: string): Promise<EpisodeMeta> {
    try {
      return await this.fetchEpisodeMetaGraphql(workId, episodeId);
    } catch {
      return this.fetchEpisodeMetaSidebar(workId, episodeId);
    }
  }

  async fetchEpisodeMetaGraphql(workId: string, episodeId: string): Promise<EpisodeMeta> {
    const res = await this.http.request("https://kakuyomu.jp/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://kakuyomu.jp",
        Referer: `https://kakuyomu.jp/works/${workId}`,
        "x-apollo-operation-name": "MtltoolsPublicEpisodeUnion",
      },
      body: JSON.stringify({
        query: PUBLIC_EPISODE_UNION_QUERY,
        operationName: "MtltoolsPublicEpisodeUnion",
        variables: { workId, episodeId },
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Kakuyomu GraphQL HTTP ${res.status}`);
    }
    return parsePublicEpisodeUnion(JSON.parse(res.body) as unknown, episodeId);
  }

  async fetchWorkEpisodeMetas(workId: string): Promise<Map<string, EpisodeMeta>> {
    const res = await this.http.request("https://kakuyomu.jp/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://kakuyomu.jp",
        Referer: `https://kakuyomu.jp/works/${workId}`,
        "x-apollo-operation-name": "MtltoolsTableOfContentsEpisodes",
      },
      body: JSON.stringify({
        query: TABLE_OF_CONTENTS_EPISODES_QUERY,
        operationName: "MtltoolsTableOfContentsEpisodes",
        variables: { workId },
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Kakuyomu GraphQL HTTP ${res.status}`);
    }
    return parseTableOfContentsEpisodes(JSON.parse(res.body) as unknown);
  }

  async fetchEpisodeMetaSidebar(workId: string, episodeId: string): Promise<EpisodeMeta> {
    const res = await this.http.request(
      `https://kakuyomu.jp/works/${workId}/episodes/${episodeId}/episode_sidebar`,
      { headers: { Accept: "text/html" } },
    );
    if (res.status !== 200) {
      throw new Error(`Kakuyomu sidebar HTTP ${res.status}`);
    }
    return parseSidebarDl(res.body);
  }

  async fetchEpisodeBody(workId: string, episodeId: string): Promise<string> {
    const res = await this.http.request(`https://kakuyomu.jp/works/${workId}/episodes/${episodeId}`, {
      headers: { Accept: "text/html" },
    });
    if (res.status !== 200) {
      throw new Error(`Kakuyomu episode page HTTP ${res.status}`);
    }
    const body = parseEpisodeBody(res.body);
    // Drop the HTTP buffer; callers persist then forget.
    return body;
  }
}

export function signalsUnchanged(stored: WorkSignals | null | undefined, current: WorkSignals): boolean {
  if (!stored || !stored.editedAt) return false;
  return (
    stored.editedAt === current.editedAt &&
    stored.lastEpisodePublishedAt === current.lastEpisodePublishedAt &&
    stored.publicEpisodeCount === current.publicEpisodeCount
  );
}
