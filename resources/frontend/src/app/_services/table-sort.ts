import { ParamMap, Params } from '@angular/router';

export type SortDir = 'asc' | 'desc';
export interface SortState { by: string; dir: SortDir; }

export interface SortColumn<T> {
  key: string;
  /** Value to compare. Empty values (null, undefined, '') always sort last, in both directions. */
  value: (row: T) => string | number | null | undefined;
  /** Direction used the first time this column is picked (default asc; dates start newest first). */
  firstDir?: SortDir;
}

function isEmpty(v: unknown): boolean {
  return v === null || v === undefined || v === '';
}

/**
 * Sorting of one table, kept in the URL (`<prefix>Sort` / `<prefix>Dir` query params, one pair per table)
 * and remembered in localStorage. A URL without sort params falls back to the remembered choice, so the
 * choice follows the user to other novels and new sessions. Comparators always return numbers
 * (Chrome's TimSort needs that; booleans only worked in Firefox).
 */
export class TableSort<T> {
  readonly sortParam: string;
  readonly dirParam: string;
  private readonly storageKey: string;

  constructor(
    private readonly columns: SortColumn<T>[],
    readonly defaultState: SortState,
    prefix: string,
  ) {
    this.sortParam = `${prefix}Sort`;
    this.dirParam = `${prefix}Dir`;
    this.storageKey = `mtltools.${prefix}Sort`;
  }

  /** The sort in the URL, or null when it has none (or an invalid one). */
  fromParams(params: ParamMap): SortState | null {
    return this.validate(params.get(this.sortParam), params.get(this.dirParam));
  }

  toParams(state: SortState): Params {
    return { [this.sortParam]: state.by, [this.dirParam]: state.dir };
  }

  recall(): SortState | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) { return null; }
      const parsed = JSON.parse(raw);
      return this.validate(parsed?.by, parsed?.dir);
    } catch {
      return null;
    }
  }

  remember(state: SortState): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch {
      // storage unavailable (private mode): the URL still carries the choice
    }
  }

  /** What a click on a column header leads to: flip the active column, or start a new one. */
  next(current: SortState, by: string): SortState {
    if (current.by === by) { return { by, dir: current.dir === 'asc' ? 'desc' : 'asc' }; }
    const col = this.columns.find((c) => c.key === by);
    return { by, dir: col?.firstDir ?? 'asc' };
  }

  sort(rows: T[], state: SortState): void {
    const col = this.columns.find((c) => c.key === state.by) ?? this.columns.find((c) => c.key === this.defaultState.by);
    if (!col) { return; }
    const sign = state.dir === 'asc' ? 1 : -1;
    rows.sort((a, b) => {
      const x = col.value(a);
      const y = col.value(b);
      const xe = isEmpty(x);
      const ye = isEmpty(y);
      if (xe || ye) { return xe === ye ? 0 : (xe ? 1 : -1); }
      if (typeof x === 'number' && typeof y === 'number') { return sign * (x - y); }
      return sign * String(x).localeCompare(String(y), undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  private validate(by: unknown, dir: unknown): SortState | null {
    if (typeof by !== 'string' || !this.columns.some((c) => c.key === by)) { return null; }
    return { by, dir: dir === 'desc' ? 'desc' : 'asc' };
  }
}
