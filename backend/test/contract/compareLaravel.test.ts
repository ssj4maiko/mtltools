import { describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Live byte-for-byte compare against Laravel. Skipped in CI.
 *
 *   MTLTOOLS_LARAVEL_COMPARE=1 npm test -- test/contract/compareLaravel.test.ts
 *
 * Hits Laravel via scripts/laravel-chapter-list.php inside the prod php container
 * (bypasses nginx), and Node at MTLTOOLS_NODE_URL (default http://127.0.0.1:8801).
 * Response bodies are compared in memory and never written to the repo.
 */
const enabled = process.env.MTLTOOLS_LARAVEL_COMPARE === "1";
const nodeBase = process.env.MTLTOOLS_NODE_URL ?? "http://127.0.0.1:8801";
const phpContainer = process.env.MTLTOOLS_PHP_CONTAINER ?? "mtltools-prod-php-1";
const novelIds = (process.env.MTLTOOLS_COMPARE_NOVELS ?? "1,44,51")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => n > 0);

async function laravelBody(idNovel: number): Promise<{ status: number; body: string }> {
  const { stdout, stderr } = await execFileAsync(
    "docker",
    ["exec", phpContainer, "php", "scripts/laravel-chapter-list.php", String(idNovel)],
    { encoding: "buffer", maxBuffer: 32 * 1024 * 1024 },
  );
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

async function nodeBody(idNovel: number): Promise<{ status: number; body: string }> {
  const res = await fetch(`${nodeBase}/api/chapter/${idNovel}`);
  return { status: res.status, body: await res.text() };
}

describe.skipIf(!enabled)("byte-for-byte compare vs Laravel (live novels, not committed)", () => {
  it.each(novelIds)("novel %s", async (idNovel) => {
    const [laravel, node] = await Promise.all([laravelBody(idNovel), nodeBody(idNovel)]);
    expect(laravel.status).toBe(200);
    expect(node.status).toBe(200);
    if (laravel.body !== node.body) {
      const max = Math.max(laravel.body.length, node.body.length);
      let i = 0;
      while (i < max && laravel.body[i] === node.body[i]) i++;
      throw new Error(
        `bodies differ for novel ${idNovel} at byte ${i}: laravel=${laravel.body.length} node=${node.body.length}`,
      );
    }
    expect(node.body).toBe(laravel.body);
  });
});
