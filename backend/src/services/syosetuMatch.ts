import type { SyosetuEpisode } from "../drivers/syosetu.js";

type KnownLike = { no: number; dateOriginalPost: string | null };

export function mysqlDatetimeKey(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace("T", " ").replace(/\.\d+Z?$/, "").trim();
}

const DST_TOLERANCE_MS = 60 * 60 * 1000;

function asUtcMs(value: string | null | undefined): number | null {
  const key = mysqlDatetimeKey(value);
  if (!key) return null;
  const t = Date.parse(key.replace(" ", "T") + "Z");
  return Number.isFinite(t) ? t : null;
}

/**
 * Syosetu chapters have no stable id, so stored chapters are matched to the index by their
 * posted datetime. Pass 1 is that exact match (preferring the same `no`).
 *
 * Pass 2 (leftovers only): the same `no` with a posted time within one hour. Rows written by the old
 * Laravel importer under America/Sao_Paulo have wall-clock times that do not exist on a DST-start
 * night shifted by an hour (e.g. 2015/10/18 00:19 stored as 01:19), so the exact key never matches.
 * The revision check afterwards rewrites the stored date to the source value.
 */
export function matchSyosetuChapters<K extends KnownLike>(
  known: K[],
  episodes: SyosetuEpisode[],
  onMissing: (chapter: K) => never,
): { previouslyKnown: Array<{ known: K; found: SyosetuEpisode }>; newcomers: SyosetuEpisode[] } {
  const remaining = new Map<string, SyosetuEpisode[]>();
  for (const ep of episodes) {
    const key = mysqlDatetimeKey(ep.dateOriginalPost);
    const bucket = remaining.get(key) ?? [];
    bucket.push(ep);
    remaining.set(key, bucket);
  }

  const matched = new Map<K, SyosetuEpisode>();
  const leftovers: K[] = [];
  for (const chapter of known) {
    const key = mysqlDatetimeKey(chapter.dateOriginalPost);
    const bucket = remaining.get(key);
    if (!bucket || bucket.length === 0) {
      leftovers.push(chapter);
      continue;
    }
    const byNo = bucket.findIndex((ep) => ep.no === chapter.no);
    matched.set(chapter, (byNo >= 0 ? bucket.splice(byNo, 1)[0] : bucket.shift())!);
    if (bucket.length === 0) remaining.delete(key);
  }

  for (const chapter of leftovers) {
    const chapterMs = asUtcMs(chapter.dateOriginalPost);
    let hit: { key: string; idx: number } | null = null;
    if (chapterMs !== null) {
      for (const [key, bucket] of remaining) {
        const idx = bucket.findIndex((ep) => {
          const ms = asUtcMs(ep.dateOriginalPost);
          return ep.no === chapter.no && ms !== null && Math.abs(ms - chapterMs) <= DST_TOLERANCE_MS;
        });
        if (idx >= 0) {
          hit = { key, idx };
          break;
        }
      }
    }
    if (!hit) onMissing(chapter);
    const bucket = remaining.get(hit!.key)!;
    matched.set(chapter, bucket.splice(hit!.idx, 1)[0]);
    if (bucket.length === 0) remaining.delete(hit!.key);
  }

  const previouslyKnown = known.map((chapter) => ({ known: chapter, found: matched.get(chapter)! }));
  const newcomers = [...remaining.values()].flat().sort((a, b) => a.no - b.no);
  return { previouslyKnown, newcomers };
}
