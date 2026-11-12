import { describe, expect, it } from "vitest";

/**
 * Live byte-for-byte compare against Laravel. Skipped unless opted in.
 *
 *   docker compose -f docker-compose.backend.yml -f docker-compose.backend.compare.yml \
 *     run --rm tools npm test -- test/contract/compareLaravel.test.ts
 *
 * Hits Laravel at MTLTOOLS_LARAVEL_URL (php -S on the internal compose network,
 * bypassing nginx) and Node at MTLTOOLS_NODE_URL (the prod backend service).
 * Response bodies are compared in memory and never written to the repo.
 */
const enabled = process.env.MTLTOOLS_LARAVEL_COMPARE === "1";
const nodeBase = process.env.MTLTOOLS_NODE_URL ?? "http://backend:3000";
const laravelBase = process.env.MTLTOOLS_LARAVEL_URL ?? "";
const novelIds = (process.env.MTLTOOLS_COMPARE_NOVELS ?? "1,44,51")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => n > 0);
const chapterIds = (process.env.MTLTOOLS_COMPARE_CHAPTERS ?? "1:1,44:10100,51:1")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const [id, no] = s.split(":").map((n) => Number(n));
    return { idNovel: id, no };
  })
  .filter((p) => p.idNovel > 0 && p.no > 0);

async function laravelGet(path: string): Promise<{ status: number; body: string }> {
  if (!laravelBase) {
    throw new Error(
      "MTLTOOLS_LARAVEL_URL is required. Use docker compose -f docker-compose.backend.yml -f docker-compose.backend.compare.yml run --rm tools ...",
    );
  }
  const res = await fetch(`${laravelBase}${path}`);
  return { status: res.status, body: await res.text() };
}

async function nodeGet(path: string): Promise<{ status: number; body: string }> {
  const res = await fetch(`${nodeBase}${path}`);
  return { status: res.status, body: await res.text() };
}

function assertSameBody(label: string, laravel: string, node: string) {
  if (laravel !== node) {
    const max = Math.max(laravel.length, node.length);
    let i = 0;
    while (i < max && laravel[i] === node[i]) i++;
    throw new Error(`bodies differ for ${label} at byte ${i}: laravel=${laravel.length} node=${node.length}`);
  }
}

describe.skipIf(!enabled)("byte-for-byte compare vs Laravel (live novels, not committed)", () => {
  it.each(novelIds)("list novel %s", async (idNovel) => {
    const [laravel, nodeRes] = await Promise.all([
      laravelGet(`/api/chapter/${idNovel}`),
      nodeGet(`/api/chapter/${idNovel}`),
    ]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody(`novel ${idNovel} list`, laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });

  it.each(chapterIds)("chapter $idNovel/$no", async ({ idNovel, no }) => {
    const [laravel, nodeRes] = await Promise.all([
      laravelGet(`/api/chapter/${idNovel}/${no}`),
      nodeGet(`/api/chapter/${idNovel}/${no}`),
    ]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody(`chapter ${idNovel}/${no}`, laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });
});
