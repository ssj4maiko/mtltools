import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  isoToMysqlUtc,
  parseEpisodeBody,
  parsePublicEpisodeUnion,
  parseSidebarDl,
  parseWorkPage,
  parseTableOfContentsEpisodes,
  revisionFromPublishedEdited,
  revisionIsNewer,
  signalsUnchanged,
} from "../../src/drivers/kakuyomu.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures/kakuyomu");

describe("kakuyomu date helpers", () => {
  it("formats ISO instants as UTC MySQL datetimes", () => {
    expect(isoToMysqlUtc("2026-11-10T13:36:49Z")).toBe("2026-11-10 13:36:49");
    expect(isoToMysqlUtc("2026-11-10T22:36:49+09:00")).toBe("2026-11-10 13:36:49");
  });

  it("stores a revision only when editedAt is after publishedAt", () => {
    expect(revisionFromPublishedEdited("2019-10-13T06:02:21Z", "2019-10-13T06:02:21Z")).toBeNull();
    expect(revisionFromPublishedEdited("2019-10-13T06:02:21Z", "2026-11-10T13:36:49Z")).toBe("2026-11-10 13:36:49");
  });

  it("detects a newer incoming revision, including after a first revision was stored", () => {
    expect(revisionIsNewer("2026-11-10 13:36:49", null)).toBe(true);
    expect(revisionIsNewer("2026-11-10 13:36:49", "2019-10-13 06:53:41")).toBe(true);
    expect(revisionIsNewer("2019-10-13 06:53:41", "2019-10-13 06:53:41")).toBe(false);
    expect(revisionIsNewer(null, "2019-10-13 06:53:41")).toBe(false);
  });

  it("skips a typo sweep only when stored work signals are complete and unchanged", () => {
    const current = {
      editedAt: "2026-11-10T13:36:49Z",
      lastEpisodePublishedAt: "2026-11-01T14:31:51Z",
      publicEpisodeCount: 3,
      totalCharacterCount: 1234,
    };
    expect(signalsUnchanged(null, current)).toBe(false);
    expect(signalsUnchanged({ ...current, editedAt: null }, current)).toBe(false);
    expect(signalsUnchanged(current, current)).toBe(true);
    expect(signalsUnchanged({ ...current, editedAt: "2026-11-11T00:00:00Z" }, current)).toBe(false);
    expect(signalsUnchanged({ ...current, publicEpisodeCount: 4 }, current)).toBe(false);
  });
});

describe("kakuyomu parsers", () => {
  it("reads the work-page index, arc titles, and work-level signals", () => {
    const html = readFileSync(join(fixtures, "work-page.html"), "utf8");
    const index = parseWorkPage(html, "100", '"abc"');
    expect(index.code).toBe("100");
    expect(index.etag).toBe('"abc"');
    expect(index.work).toEqual({
      editedAt: "2026-11-10T13:36:49Z",
      lastEpisodePublishedAt: "2026-11-01T14:31:51Z",
      publicEpisodeCount: 3,
      totalCharacterCount: 1234,
    });
    expect(index.episodes).toEqual([
      {
        no: 1,
        noCode: "aaa",
        arc: "Arc One",
        title: "First",
        dateOriginalPost: "2020-01-02 03:04:05",
        dateOriginalRevision: null,
        publishedAt: "2020-01-02T03:04:05Z",
      },
      {
        no: 2,
        noCode: "bbb",
        arc: "Arc One",
        title: "Second",
        dateOriginalPost: "2021-02-03 04:05:06",
        dateOriginalRevision: null,
        publishedAt: "2021-02-03T04:05:06Z",
      },
      {
        no: 3,
        noCode: "ccc",
        arc: null,
        title: "Third",
        dateOriginalPost: "2026-11-01 14:31:51",
        dateOriginalRevision: null,
        publishedAt: "2026-11-01T14:31:51Z",
      },
    ]);
  });

  it("reads 公開日 / 最終更新日 / 文字数 from the trailing sidebar dl, not stray <time> tags", () => {
    const html = readFileSync(join(fixtures, "sidebar.html"), "utf8");
    const meta = parseSidebarDl(html);
    expect(meta.publishedAt).toBe("2019-10-13T06:02:21Z");
    expect(meta.editedAt).toBe("2026-11-10T13:36:49Z");
    expect(meta.dateOriginalPost).toBe("2019-10-13 06:02:21");
    expect(meta.dateOriginalRevision).toBe("2026-11-10 13:36:49");
    expect(meta.characterCount).toBe(10540);
  });

  it("maps publicEpisodeUnion dates and characterCount", () => {
    const payload = JSON.parse(readFileSync(join(fixtures, "public-episode-union.json"), "utf8"));
    const meta = parsePublicEpisodeUnion(payload, "aaa");
    expect(meta.dateOriginalPost).toBe("2019-10-13 06:02:21");
    expect(meta.dateOriginalRevision).toBe("2026-11-10 13:36:49");
    expect(meta.characterCount).toBe(10540);
  });

  it("maps tableOfContents episode editedAt and characterCount for every episode", () => {
    const payload = JSON.parse(readFileSync(join(fixtures, "table-of-contents-episodes.json"), "utf8"));
    const metas = parseTableOfContentsEpisodes(payload);
    expect([...metas.keys()]).toEqual(["aaa", "bbb", "ccc"]);
    expect(metas.get("aaa")).toEqual({
      publishedAt: "2019-10-13T06:02:21Z",
      editedAt: "2026-11-10T13:36:49Z",
      dateOriginalPost: "2019-10-13 06:02:21",
      dateOriginalRevision: "2026-11-10 13:36:49",
      characterCount: 10540,
    });
    expect(metas.get("bbb")?.dateOriginalRevision).toBeNull();
    expect(metas.get("ccc")?.characterCount).toBe(30);
  });

  it("rejects a tableOfContents payload with GraphQL errors or a count mismatch", () => {
    expect(() => parseTableOfContentsEpisodes({ errors: [{ message: "Internal Server Error" }], data: { work: null } })).toThrow(
      /Internal Server Error/,
    );
    const payload = JSON.parse(readFileSync(join(fixtures, "table-of-contents-episodes.json"), "utf8"));
    payload.data.work.publicEpisodeCount = 99;
    expect(() => parseTableOfContentsEpisodes(payload)).toThrow(/count mismatch/);
  });

  it("extracts widget-episodeBody HTML and not the footer", () => {
    const html = readFileSync(join(fixtures, "episode-body.html"), "utf8");
    expect(parseEpisodeBody(html)).toBe("<p>alpha</p>");
  });
});
