function pad(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

function toDate(iso: string | null | undefined): Date | null {
  if (!iso) { return null; }
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

/** Compact age for a table cell: "5m ago", "3h ago", "12d ago", then a plain date. */
export function formatWhen(iso: string | null | undefined, now: Date = new Date()): string {
  const d = toDate(iso);
  if (!d) { return '—'; }
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (seconds < 60) { return 'just now'; }
  if (seconds < 3600) { return `${Math.floor(seconds / 60)}m ago`; }
  if (seconds < 86400) { return `${Math.floor(seconds / 3600)}h ago`; }
  if (seconds < 30 * 86400) { return `${Math.floor(seconds / 86400)}d ago`; }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Full local date and time, for the tooltip. */
export function formatWhenFull(iso: string | null | undefined): string {
  const d = toDate(iso);
  if (!d) { return 'Never'; }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
