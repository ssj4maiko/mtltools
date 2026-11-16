export const KAKUYOMU_USER_AGENT =
  "mtltools-backend/0.1 (personal novel updater; sequential polite requests)";

export const DEFAULT_POLITE_DELAY_MS = 400;

export type FetchLike = typeof fetch;

export type TextResponse = {
  status: number;
  headers: Headers;
  body: string;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class PoliteHttp {
  private chain: Promise<void> = Promise.resolve();

  constructor(
    private readonly delayMs: number = DEFAULT_POLITE_DELAY_MS,
    private readonly fetchImpl: FetchLike = fetch,
    private readonly userAgent: string = KAKUYOMU_USER_AGENT,
  ) {}

  private async gap(): Promise<void> {
    if (this.delayMs <= 0) return;
    const next = this.chain.then(() => sleep(this.delayMs));
    this.chain = next.catch(() => undefined);
    await next;
  }

  async request(url: string, init: RequestInit = {}, attempt = 0): Promise<TextResponse> {
    await this.gap();
    const headers = new Headers(init.headers);
    if (!headers.has("User-Agent")) headers.set("User-Agent", this.userAgent);
    if (!headers.has("Accept-Language")) headers.set("Accept-Language", "ja,en;q=0.8");
    const res = await this.fetchImpl(url, { ...init, headers });
    const body = await res.text();
    if ((res.status === 429 || res.status === 503) && attempt < 4) {
      const backoff = this.delayMs > 0 ? this.delayMs * (attempt + 2) : 200 * (attempt + 2);
      await sleep(backoff);
      return this.request(url, init, attempt + 1);
    }
    return { status: res.status, headers: res.headers, body };
  }
}
