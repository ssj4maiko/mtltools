import { describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Live byte-for-byte compare against Laravel. Skipped in CI.
 *
 *   MTLTOOLS_LARAVEL_COMPARE=1 npm test -- test/contract/compareLaravel.test.ts
 *
 * Hits Laravel via scripts/laravel-chapter-list.php and scripts/laravel-chapter.php
 * inside the prod php container (bypasses nginx), and Node at MTLTOOLS_NODE_URL
 * (default http://127.0.0.1:8801). Response bodies are compared in memory and
 * never written to the repo.
 */
const enabled = process.env.MTLTOOLS_LARAVEL_COMPARE === "1";
const nodeBase = process.env.MTLTOOLS_NODE_URL ?? "http://127.0.0.1:8801";
const phpContainer = process.env.MTLTOOLS_PHP_CONTAINER ?? "mtltools-prod-php-1";
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

async function laravelScript(args: string[], script: string): Promise<{ status: number; body: string }> {
  const { stdout, stderr } = await execFileAsync("docker", ["exec", phpContainer, "php", script, ...args], {
    encoding: "buffer",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (stderr.length) {
    const errText = stderr.toString("utf8");
    if (/error|exception|fatal/i.test(errText)) {
      throw new Error(errText.slice(0, 500));
    }
  }
  const text = stdout.toString("utf8");
  const nl = text.indexOf("\n");
  return { status: Number(text.slice(0, nl)), body: text.slice(nl + 1) };
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
      laravelScript([String(idNovel)], "scripts/laravel-chapter-list.php"),
      fetch(`${nodeBase}/api/chapter/${idNovel}`).then(async (res) => ({ status: res.status, body: await res.text() })),
    ]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody(`novel ${idNovel} list`, laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });

  it.each(chapterIds)("chapter $idNovel/$no", async ({ idNovel, no }) => {
    const [laravel, nodeRes] = await Promise.all([
      laravelScript([String(idNovel), String(no)], "scripts/laravel-chapter.php"),
      fetch(`${nodeBase}/api/chapter/${idNovel}/${no}`).then(async (res) => ({
        status: res.status,
        body: await res.text(),
      })),
    ]);
    expect(laravel.status).toBe(200);
    expect(nodeRes.status).toBe(200);
    assertSameBody(`chapter ${idNovel}/${no}`, laravel.body, nodeRes.body);
    expect(nodeRes.body).toBe(laravel.body);
  });
});
