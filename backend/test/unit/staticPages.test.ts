import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { escapeHtml } from "../../src/html/escape.js";
import {
  buildStaticControls,
  renderChapterPage,
  renderStopPage,
  renderWaitPage,
  type StaticNovel,
} from "../../src/render/staticPages.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures/static");

const novel: StaticNovel = {
  id: 1,
  nameOriginal: "源",
  nameCustom: "Source & Co",
  numberChapters: 3,
  driver: "syosetu",
  code: "n1234ab",
};

function fixture(name: string): string {
  return readFileSync(join(fixtures, name), "utf8");
}

describe("escapeHtml", () => {
  it("matches Laravel e() / htmlspecialchars(ENT_QUOTES)", () => {
    expect(escapeHtml(`A&B"C'D<E>F/G`)).toBe("A&amp;B&quot;C&#039;D&lt;E&gt;F/G");
  });
});

describe("renderChapterPage", () => {
  it("matches the both-links Laravel fixture byte-for-byte", () => {
    const html = renderChapterPage({
      novel,
      chapter: {
        no: 2,
        title: "二 / second",
        arc: "中",
        text: `<p><img src="https://img.example:8443/images/x.png">世界</p>`,
      },
      controls: buildStaticControls(novel, 10, 2),
    });
    expect(html).toBe(fixture("chapter-both.html"));
  });

  it("matches the first-chapter (next only, empty arc) Laravel fixture", () => {
    const html = renderChapterPage({
      novel,
      chapter: { no: 1, title: "一", arc: "", text: "<p>start</p>" },
      controls: buildStaticControls(novel, 10, 1),
    });
    expect(html).toBe(fixture("chapter-first.html"));
  });
});

describe("renderWaitPage / renderStopPage", () => {
  it("matches the wait-page Laravel fixture, including the cors.io typo", () => {
    const html = renderWaitPage({
      novel,
      no: 4,
      controls: buildStaticControls(novel, 10, 4),
      sourceUrl: "https://ncode.syosetu.com/n1234ab/4",
      appUrl: "https://img.example:8443",
    });
    expect(html).toBe(fixture("wait.html"));
    expect(html).toContain('oReq.open("GET", "\'http://cors.io/?https://ncode.syosetu.com/n1234ab/4");');
  });

  it("matches the stop-page Laravel fixture", () => {
    const manual: StaticNovel = { ...novel, driver: "manual" };
    const html = renderStopPage({
      novel: manual,
      no: 4,
      controls: buildStaticControls(manual, 10, 4),
    });
    expect(html).toBe(fixture("stop.html"));
  });
});
