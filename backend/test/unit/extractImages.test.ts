import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { rewriteDataImages, sniffImageExt } from "../../src/services/extractImages.js";

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

describe("extract-images helpers", () => {
  it("sniffs png/jpeg/gif/webp magic and rewrites data URIs to /images/<h2>/<sha>.<ext>", () => {
    expect(sniffImageExt(PNG_1X1)).toBe("png");
    expect(sniffImageExt(Buffer.from("not-an-image"))).toBeNull();
    const sha = createHash("sha256").update(PNG_1X1).digest("hex");
    const html = `<p><img src="data:image/png;base64,${PNG_1X1.toString("base64")}"></p>`;
    const out = rewriteDataImages(html, "textOriginal", () => undefined);
    expect(out.uris).toBe(1);
    expect(out.skipped).toBe(0);
    expect(out.text).toBe(`<p><img src="/images/${sha.slice(0, 2)}/${sha}.png"></p>`);
    expect(out.refs[0]).toMatchObject({ col: "textOriginal", sha256: sha, ext: "png", refs: 1 });
    expect(out.text.includes("data:image")).toBe(false);
  });
});
