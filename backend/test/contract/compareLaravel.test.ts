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

async function laravelPost(path: string, payload: unknown): Promise<{ status: number; body: string }> {
  if (!laravelBase) {
    throw new Error(
      "MTLTOOLS_LARAVEL_URL is required. Use docker compose -f docker-compose.backend.yml -f docker-compose.backend.compare.yml run --rm tools ...",
    );
  }
  const res = await fetch(`${laravelBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { status: res.status, body: await res.text() };
}

async function nodePost(path: string, payload: unknown): Promise<{ status: number; body: string }> {
  const res = await fetch(`${nodeBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { status: res.status, body: await res.text() };
}

const catalogGets = (process.env.MTLTOOLS_COMPARE_GETS ?? "/api/novel,/api/novel/1,/api/novel/44,/api/novel/51,/api/novel/dictionary/1,/api/dictionary,/api/dictionary/1,/api/dictionary/52,/api/dictionary/novel/1,/api/category/1,/api/category/1/1,/api/cache/dictionary/52")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

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

  it.each(catalogGets)("GET %s", async (path) => {
    const [laravel, nodeRes] = await Promise.all([laravelGet(path), nodeGet(path)]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody(path, laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });

  it("POST /api/meta drivers+languages", async () => {
    const payload = { meta: ["drivers", "languages"] };
    const [laravel, nodeRes] = await Promise.all([
      laravelPost("/api/meta", payload),
      nodePost("/api/meta", payload),
    ]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody("POST /api/meta", laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });
});

describe("GET /static/{novel}/{dict}/{chapter} vs Laravel", () => {
  if (!enabled) {
    it.skip("opt in with MTLTOOLS_LARAVEL_COMPARE=1", () => {});
    return;
  }

  it("matches Laravel byte-for-byte for a chapter that already has a cache file (bodies stay in memory)", async () => {
    const paths: string[] = [];
    for (const id of novelIds) {
      const dicts = await nodeGet(`/api/dictionary/novel/${id}`);
      if (dicts.status !== 200) continue;
      let parsed: Array<{ id?: number }> = [];
      try {
        parsed = JSON.parse(dicts.body) as Array<{ id?: number }>;
      } catch {
        continue;
      }
      const dictId = parsed[0]?.id;
      if (!dictId) continue;
      const list = await nodeGet(`/api/chapter/${id}`);
      if (list.status !== 200) continue;
      let chapters: Array<{ no?: number }> = [];
      try {
        chapters = JSON.parse(list.body) as Array<{ no?: number }>;
      } catch {
        continue;
      }
      const no = chapters[0]?.no;
      if (!no) continue;
      paths.push(`/static/${id}/${dictId}/${no}/`);
      break;
    }
    if (paths.length === 0) {
      throw new Error("could not resolve a /static path from catalog reads");
    }
    for (const path of paths) {
      const [laravel, node] = await Promise.all([laravelGet(path), nodeGet(path)]);
      if (laravel.status !== node.status) {
        throw new Error(`status differs for ${path}: laravel=${laravel.status} node=${node.status}`);
      }
      assertSameBody(path, laravel.body, node.body);
    }
  });
});
