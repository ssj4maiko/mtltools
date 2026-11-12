import { fixRuby } from "./fixRuby.js";

export type TranslateEntry = {
  idCategory: number | string;
  entryOriginal: string | null | undefined;
  entryTranslation: string | null | undefined;
  sufix?: number | string | null;
  prefix?: number | string | null;
};

/** PHP-like truthiness for sufix/prefix (`if ($entry->sufix)`): 0 and "0" are falsy. */
export function phpTruthy(value: unknown): boolean {
  if (value === null || value === undefined || value === false || value === "") return false;
  if (value === 0 || value === 0n) return false;
  if (value === "0") return false;
  return true;
}

/** Port of Chapter::translateText. Entries must already be in cache order. */
export function translateText(text: string, entries: TranslateEntry[]): string {
  let out = fixRuby(text);
  for (const entry of entries) {
    const original = entry.entryOriginal ?? "";
    const translation = entry.entryTranslation ?? "";
    if (phpTruthy(entry.sufix)) {
      out = out.split("]" + String(entry.sufix) + "]" + original).join(translation + "]" + String(entry.idCategory) + "]");
    } else if (phpTruthy(entry.prefix)) {
      out = out.split(original + "[" + String(entry.prefix) + "[").join("[" + String(entry.idCategory) + "[" + translation);
    } else {
      const replacement =
        translation.length === 0 ? "" : "[" + String(entry.idCategory) + "[" + translation + "]" + String(entry.idCategory) + "]";
      out = out.split(original).join(replacement);
    }
  }
  const regexStart = "\\[[0-9]+\\[";
  const regexEnd = "\\][0-9]+\\]";
  out = out.replace(new RegExp("(" + regexEnd + regexStart + ")+", "gm"), " ");
  out = out.replace(new RegExp("(" + regexEnd + ")+", "gm"), "");
  out = out.replace(new RegExp("(" + regexStart + ")+", "gm"), "");
  return out;
}
