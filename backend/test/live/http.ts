/**
 * Polite live HTTP helpers. Never write response bodies to disk.
 */
const UA =
  "mtltools-live-tests/1.0 (layout/API canary; few polite requests; no body text stored)";

const delayMs = Number(process.env.MTLTOOLS_LIVE_DELAY_MS ?? "500");

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let chain: Promise<void> = Promise.resolve();

/** Global delay so live tests stay polite even if files overlap. */
export async function politeGap(): Promise<void> {
  const next = chain.then(() => sleep(delayMs));
  chain = next.catch(() => undefined);
  await next;
}

export async function fetchText(
  url: string,
  init: RequestInit = {},
): Promise<{ status: number; headers: Headers; body: string }> {
  await politeGap();
  const headers = new Headers(init.headers);
  if (!headers.has("User-Agent")) headers.set("User-Agent", UA);
  if (!headers.has("Accept-Language")) headers.set("Accept-Language", "ja,en;q=0.8");
  const res = await fetch(url, { ...init, headers });
  const body = await res.text();
  return { status: res.status, headers: res.headers, body };
}

export function visibleTextLength(html: string): number {
  const stripped = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length;
}

export function parseIsoDate(value: string): Date {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`unparseable date (${value.length} chars)`);
  }
  return d;
}
