import { describe, expect, it } from "vitest";
import { fetchText, parseIsoDate, visibleTextLength } from "./http.js";

/**
 * Live canary against public Kakuyomu pages and GraphQL.
 * Few requests, polite delays, assertions on structure only.
 * Fetched story text stays in memory and is never written or logged.
 *
 * Public work from the bagpack/kakuyomu-feed README (not from the local database).
 * Override with MTLTOOLS_LIVE_KAKUYOMU_WORK / MTLTOOLS_LIVE_KAKUYOMU_EPISODE.
 */
const WORK_ID = process.env.MTLTOOLS_LIVE_KAKUYOMU_WORK ?? "4852201425154978794";

type EpisodeMeta = { id: string; publishedAt: string; title?: string };

function extractWorkEpisodes(html: string): EpisodeMeta[] {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (!m) {
    throw new Error("work page is missing __NEXT_DATA__");
  }
  const data = JSON.parse(m[1]) as {
    props?: { pageProps?: { __APOLLO_STATE__?: Record<string, unknown> } };
    query?: { workId?: string };
  };
  const apollo = data.props?.pageProps?.__APOLLO_STATE__;
  if (!apollo || typeof apollo !== "object") {
    throw new Error("work page is missing __APOLLO_STATE__");
  }
  const workId = data.query?.workId ?? WORK_ID;
  const work = apollo[`Work:${workId}`] as
    | { tableOfContentsV2?: { __ref: string }[]; tableOfContents?: { __ref: string }[] }
    | undefined;
  if (!work) {
    throw new Error("work page Apollo state is missing Work");
  }
  const tocRefs = work.tableOfContentsV2 ?? work.tableOfContents ?? [];
  const episodes: EpisodeMeta[] = [];
  for (const ref of tocRefs) {
    const chapter = apollo[ref.__ref] as { episodeUnions?: { __ref: string }[] } | undefined;
    for (const epRef of chapter?.episodeUnions ?? []) {
      const ep = apollo[epRef.__ref] as { __typename?: string; id?: string; publishedAt?: string } | undefined;
      if (ep?.__typename === "Episode" && ep.id && ep.publishedAt) {
        episodes.push({ id: ep.id, publishedAt: ep.publishedAt });
      }
    }
  }
  return episodes;
}

describe("live Kakuyomu (public work, opt-in)", () => {
  it("exposes Episode.publishedAt on the work-page TOC and editedAt via publicEpisodeUnion", async () => {
    const workPage = await fetchText(`https://kakuyomu.jp/works/${WORK_ID}`);
    expect(workPage.status, "work page should be 200").toBe(200);
    const episodes = extractWorkEpisodes(workPage.body);
    expect(episodes.length).toBeGreaterThan(0);
    const first = episodes[0];
    parseIsoDate(first.publishedAt);

    const episodeId = process.env.MTLTOOLS_LIVE_KAKUYOMU_EPISODE ?? first.id;
    const fromToc = episodes.find((e) => e.id === episodeId) ?? first;

    const query = `
      query LivePublicEpisodeUnion($workId: ID!, $episodeId: ID!) {
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
    `;
    const gql = await fetchText("https://kakuyomu.jp/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://kakuyomu.jp",
        Referer: `https://kakuyomu.jp/works/${WORK_ID}`,
        "x-apollo-operation-name": "LivePublicEpisodeUnion",
      },
      body: JSON.stringify({
        query,
        operationName: "LivePublicEpisodeUnion",
        variables: { workId: WORK_ID, episodeId },
      }),
    });
    expect(gql.status, "graphql should be 200").toBe(200);
    const payload = JSON.parse(gql.body) as {
      errors?: { message: string }[];
      data?: { work?: { publicEpisodeUnion?: Record<string, unknown> } };
    };
    expect(payload.errors ?? []).toEqual([]);
    const ev = payload.data?.work?.publicEpisodeUnion;
    expect(ev).toBeTruthy();
    expect(ev?.__typename).toBe("Episode");
    expect(ev?.id).toBe(episodeId);
    expect(typeof ev?.publishedAt).toBe("string");
    expect(typeof ev?.editedAt).toBe("string");
    parseIsoDate(String(ev!.publishedAt));
    parseIsoDate(String(ev!.editedAt));
    expect(parseIsoDate(String(ev!.publishedAt)).getTime()).toBe(parseIsoDate(fromToc.publishedAt).getTime());
    expect(typeof ev?.characterCount).toBe("number");
    expect(Number(ev!.characterCount)).toBeGreaterThan(0);

    const epPage = await fetchText(`https://kakuyomu.jp/works/${WORK_ID}/episodes/${episodeId}`);
    expect(epPage.status, "episode page should be 200").toBe(200);
    const bodyMatch = epPage.body.match(/class="[^"]*widget-episodeBody[^"]*"[^>]*>([\s\S]*?)<div id="episodeFooter"/);
    const episodeHtml = bodyMatch ? bodyMatch[1] : "";
    const bodyLen = visibleTextLength(episodeHtml || epPage.body);
    expect(bodyLen, "episode body should be non-empty (length only)").toBeGreaterThan(20);

    const sidebar = await fetchText(`https://kakuyomu.jp/works/${WORK_ID}/episodes/${episodeId}/episode_sidebar`);
    expect(sidebar.status, "sidebar should be 200").toBe(200);
    const dls = [...sidebar.body.matchAll(/<dl\b[^>]*>[\s\S]*?<\/dl>/gi)];
    expect(dls.length, "sidebar should contain a definition list").toBeGreaterThan(0);
    const lastDl = dls[dls.length - 1][0];
    const pairs = [...lastDl.matchAll(/<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/gi)].map(
      ([, dt, dd]) => ({
        dt: dt.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
        times: [...dd.matchAll(/datetime="([^"]+)"/g)].map((x) => x[1]),
        ddText: dd.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
      }),
    );
    const labels = pairs.map((p) => p.dt);
    expect(labels).toEqual(expect.arrayContaining(["公開日", "最終更新日", "文字数"]));
    const published = pairs.find((p) => p.dt === "公開日");
    const edited = pairs.find((p) => p.dt === "最終更新日");
    const count = pairs.find((p) => p.dt === "文字数");
    expect(published?.times[0]).toBe(ev!.publishedAt);
    expect(edited?.times[0]).toBe(ev!.editedAt);
    parseIsoDate(published!.times[0]);
    parseIsoDate(edited!.times[0]);
    const countNum = Number(String(count?.ddText).replace(/[^\d]/g, ""));
    expect(countNum).toBe(Number(ev!.characterCount));
  });
});
