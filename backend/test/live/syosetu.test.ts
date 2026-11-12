import { describe, expect, it } from "vitest";
import { fetchText, visibleTextLength } from "./http.js";

/**
 * Live canary against a public Syosetu work: the index post/revision dates
 * (p-eplist__update) and one chapter body (p-novel__text / novel__text).
 * Few requests, polite delays, no story text written or logged.
 *
 * Default ncode is a short public work; override with MTLTOOLS_LIVE_SYOSETU_NCODE.
 */
const NCODE = process.env.MTLTOOLS_LIVE_SYOSETU_NCODE ?? "n2267be";
const DATE_RE = /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2})/;

function parseSyosetuIndex(html: string, ncode: string) {
  const chapters: { no: number; post: string; revision: string | null }[] = [];
  const linkRe = new RegExp(ncode + "/(\\d+)", "g");
  const positions: { no: number; index: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(html))) {
    positions.push({ no: Number(m[1]), index: m.index });
  }
  expect(positions.length, "index should list chapter links").toBeGreaterThan(0);
  expect(html.includes("p-eplist__update"), "index should contain p-eplist__update").toBe(true);

  for (const pos of positions) {
    const from = html.indexOf("p-eplist__update\">", pos.index);
    if (from < 0 || (positions.find((p) => p.index > pos.index) && from > (positions.find((p) => p.index > pos.index)?.index ?? 0))) {
      continue;
    }
    const end = html.indexOf("</div>", from);
    const chunk = html.slice(from, end < 0 ? from + 400 : end);
    const postM = DATE_RE.exec(chunk);
    if (!postM) continue;
    let revision: string | null = null;
    const titleAt = chunk.indexOf("<span title=");
    if (titleAt >= 0) {
      const revM = DATE_RE.exec(chunk.slice(titleAt));
      if (revM) revision = revM[1];
    }
    chapters.push({ no: pos.no, post: postM[1], revision });
  }
  return chapters;
}

function parseSyosetuDate(value: string): Date {
  const m = /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})$/.exec(value);
  if (!m) {
    throw new Error(`unparseable syosetu date (${value.length} chars)`);
  }
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:00`);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`unparseable syosetu date (${value.length} chars)`);
  }
  return d;
}

describe("live Syosetu (public work, opt-in)", () => {
  it("exposes post and optional revision dates on the index and a non-empty chapter body", async () => {
    const index = await fetchText(`https://ncode.syosetu.com/${NCODE}/`);
    expect(index.status, "index page should be 200").toBe(200);
    const chapters = parseSyosetuIndex(index.body, NCODE);
    expect(chapters.length, "should parse at least one dated chapter").toBeGreaterThan(0);
    const first = chapters[0];
    parseSyosetuDate(first.post);
    if (first.revision) {
      const rev = parseSyosetuDate(first.revision);
      expect(rev.getTime()).toBeGreaterThanOrEqual(parseSyosetuDate(first.post).getTime());
    }

    const no = Number(process.env.MTLTOOLS_LIVE_SYOSETU_NO ?? first.no);
    const chapter = await fetchText(`https://ncode.syosetu.com/${NCODE}/${no}/`);
    expect(chapter.status, "chapter page should be 200").toBe(200);
    const hasNew = /p-novel__text/.test(chapter.body);
    const hasOld = /novel__text"/.test(chapter.body);
    expect(hasNew || hasOld, "chapter should contain p-novel__text or novel__text").toBe(true);
    const parts: string[] = [];
    for (const cls of ["p-novel__text--preface", "p-novel__text", "novel__text--preface", "novel__text", "novel__text--afterword", "p-novel__text--afterword"]) {
      const re = new RegExp(`class="[^"]*${cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"]*"[^>]*>([\\s\\S]*?)</div>`, "g");
      let block: RegExpExecArray | null;
      while ((block = re.exec(chapter.body))) {
        parts.push(block[1]);
      }
    }
    const combined = parts.join(" ");
    const len = visibleTextLength(combined || chapter.body);
    expect(len, "chapter body should be non-empty (length only)").toBeGreaterThan(20);
    expect(chapter.body.includes("novel_subtitle") || /<title>/.test(chapter.body), "chapter should have a title hook").toBe(
      true,
    );
  });
});
