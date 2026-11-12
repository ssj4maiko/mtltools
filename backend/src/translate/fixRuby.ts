/**
 * Port of Chapter::fixRuby. Merges split <rt>/<span> groups inside a <ruby>
 * only when `</rt><span>` appears at a position greater than 0 (PHP `$pos > 0`).
 */
export function fixRuby(input: string): string {
  return input.replace(/<ruby>(.*?)<\/ruby>/gs, (full, inner: string) => {
    const pos = inner.indexOf("</rt><span>");
    if (pos > 0) {
      const rtMatches: string[] = [];
      const spanMatches: string[] = [];
      const re = /<rt>(.*?)<\/rt>|<span>(.*?)<\/span>/gs;
      let m: RegExpExecArray | null;
      while ((m = re.exec(inner))) {
        if (m[1] !== undefined) rtMatches.push(m[1]);
        else if (m[2] !== undefined) spanMatches.push(m[2]);
      }
      const mergedRt = rtMatches.length ? `<rt>${rtMatches.join("")}</rt>` : "";
      const mergedSpan = spanMatches.length ? `<span>${spanMatches.join("")}</span>` : "";
      return `<ruby>${mergedSpan}${mergedRt}</ruby>`;
    }
    return full;
  });
}
