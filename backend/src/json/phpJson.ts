/**
 * PHP json_encode() with default flags (0): compact, escaped slashes, \uXXXX for non-ASCII.
 * Laravel's chapter list and single-chapter responses are encoded this way.
 */
export function phpJsonEncode(value: unknown): string {
  const json = JSON.stringify(value);
  let out = "";
  for (let i = 0; i < json.length; i++) {
    const code = json.charCodeAt(i);
    const ch = json[i];
    if (ch === "/") {
      out += "\\/";
    } else if (code >= 0x7f) {
      out += "\\u" + code.toString(16).padStart(4, "0");
    } else {
      out += ch;
    }
  }
  return out;
}

/** Format a MySQL datetime/timestamp (UTC, no fraction) the way Eloquent/Carbon toJSON does. */
export function laravelTimestampToJson(value: string | null | undefined): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const m = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.exec(value);
  if (!m) {
    throw new Error(`unexpected datetime value shape: ${value.length} chars`);
  }
  return `${m[1]}T${m[2]}.000000Z`;
}

/** Pass through a MySQL DATETIME (dateOriginalPost / dateOriginalRevision) or null. */
export function mysqlDatetimeOrNull(value: string | null | undefined): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const m = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})(?:\.\d+)?$/.exec(value);
  if (!m) {
    throw new Error(`unexpected mysql datetime shape: ${value.length} chars`);
  }
  return m[1];
}
