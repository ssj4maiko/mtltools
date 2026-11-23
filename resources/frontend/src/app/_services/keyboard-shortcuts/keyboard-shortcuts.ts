// Small in-house replacement for the unmaintained `ng-keyboard-shortcuts` package
// (it relies on ComponentFactoryResolver, removed in Angular 22). It keeps the same
// names and shortcut definition format that the chapter pages already use.
import { CommonModule } from '@angular/common';
import { Component, HostListener, Injectable, Input, NgModule, OnDestroy, OnInit } from '@angular/core';

export enum AllowIn {
  Textarea = 'TEXTAREA',
  Input = 'INPUT',
  Select = 'SELECT',
  ContentEditable = 'CONTENT_EDITABLE',
}

export interface ShortcutEventOutput {
  event: KeyboardEvent;
  key: string;
}

export interface ShortcutInput {
  key: string | string[];
  command: (output: ShortcutEventOutput) => void;
  preventDefault?: boolean;
  allowIn?: AllowIn[];
  label?: string;
  description?: string;
}

interface ParsedCombo {
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  key: string;
}

const SYMBOL_KEYS = ['plus', '-', '*'];

export function parseCombo(combo: string): ParsedCombo {
  const parsed: ParsedCombo = { ctrl: false, alt: false, shift: false, meta: false, key: '' };
  for (const raw of combo.split('+').map((p) => p.trim().toLowerCase())) {
    if (raw === 'ctrl' || raw === 'control') { parsed.ctrl = true; }
    else if (raw === 'alt' || raw === 'option') { parsed.alt = true; }
    else if (raw === 'shift') { parsed.shift = true; }
    else if (raw === 'cmd' || raw === 'meta' || raw === 'command') { parsed.meta = true; }
    else if (raw !== '') { parsed.key = raw; }
  }
  // "alt + -" or "alt + +" split to an empty last token
  if (parsed.key === '' && combo.trim().endsWith('+')) { parsed.key = 'plus'; }
  return parsed;
}

const CODE_NAMES: { [code: string]: string } = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  PageUp: 'pageup', PageDown: 'pagedown', Home: 'home', End: 'end', Insert: 'insert',
  NumpadAdd: 'plus', NumpadSubtract: '-', NumpadMultiply: '*',
  Minus: '-', Equal: 'plus', Escape: 'esc', Enter: 'enter', Space: 'space',
};

/** Layout independent name of the main key of an event (letters/digits via `code`). */
export function eventKey(e: KeyboardEvent): string {
  const code = e.code || '';
  if (CODE_NAMES[code]) { return CODE_NAMES[code]; }
  if (/^Key[A-Z]$/.test(code)) { return code.slice(3).toLowerCase(); }
  if (/^(Digit|Numpad)[0-9]$/.test(code)) { return code.slice(-1); }
  if (/^F[0-9]{1,2}$/.test(code)) { return code.toLowerCase(); }
  const key = (e.key || '').toLowerCase();
  if (key === '+') { return 'plus'; }
  return key;
}

export function matches(e: KeyboardEvent, combo: ParsedCombo): boolean {
  if (eventKey(e) !== combo.key) { return false; }
  if (e.ctrlKey !== combo.ctrl || e.altKey !== combo.alt || e.metaKey !== combo.meta) { return false; }
  // plus and * need shift on most layouts, so shift is only compared for other keys
  if (!SYMBOL_KEYS.includes(combo.key) && e.shiftKey !== combo.shift) { return false; }
  return true;
}

function allowedHere(target: EventTarget | null, allowIn: AllowIn[] = []): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) { return true; }
  if (el.isContentEditable) { return allowIn.includes(AllowIn.ContentEditable); }
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) { return allowIn.includes(el.tagName as AllowIn); }
  return true;
}

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService {
  readonly registered = new Set<KeyboardShortcutsComponent>();
  get all(): ShortcutInput[] {
    return Array.from(this.registered).reduce((acc, c) => acc.concat(c.shortcuts || []), [] as ShortcutInput[]);
  }
}

@Component({
  selector: 'ng-keyboard-shortcuts',
  template: '',
  standalone: false,
})
export class KeyboardShortcutsComponent implements OnInit, OnDestroy {
  @Input() shortcuts: ShortcutInput[] = [];
  constructor(private registry: KeyboardShortcutsService) {}
  ngOnInit(): void { this.registry.registered.add(this); }
  ngOnDestroy(): void { this.registry.registered.delete(this); }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    for (const shortcut of this.shortcuts || []) {
      const keys = Array.isArray(shortcut.key) ? shortcut.key : [shortcut.key];
      for (const combo of keys) {
        if (!matches(event, parseCombo(combo))) { continue; }
        if (!allowedHere(event.target, shortcut.allowIn)) { continue; }
        if (shortcut.preventDefault) { event.preventDefault(); }
        shortcut.command({ event, key: combo });
        return;
      }
    }
  }
}

@Component({
  selector: 'ng-keyboard-shortcuts-help',
  template: `
    <div class="modal" [class.is-active]="open" (click)="open = false">
      <div class="modal-background"></div>
      <div class="modal-card" (click)="$event.stopPropagation()">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button class="delete" aria-label="close" (click)="open = false"></button>
        </header>
        <section class="modal-card-body">
          @for (group of groups(); track group.label) {
            <h2 class="subtitle">{{ group.label }}</h2>
            <table class="table is-fullwidth">
              @for (s of group.items; track $index) {
                <tr><td>{{ s.description }}</td><td><code>{{ keys(s) }}</code></td></tr>
              }
            </table>
          }
        </section>
      </div>
    </div>`,
  standalone: false,
})
export class KeyboardShortcutsHelpComponent {
  @Input() key = 'f1';
  @Input() title = 'Shortcuts';
  open = false;
  constructor(private registry: KeyboardShortcutsService) {}

  groups(): { label: string; items: ShortcutInput[] }[] {
    const map = new Map<string, ShortcutInput[]>();
    for (const s of this.registry.all) {
      const label = s.label || 'General';
      map.set(label, (map.get(label) || []).concat(s));
    }
    return Array.from(map, ([label, items]) => ({ label, items }));
  }
  keys(s: ShortcutInput): string {
    return (Array.isArray(s.key) ? s.key : [s.key]).join(', ');
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.open && event.key === 'Escape') { this.open = false; return; }
    if (matches(event, parseCombo(this.key))) {
      event.preventDefault();
      this.open = !this.open;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [KeyboardShortcutsComponent, KeyboardShortcutsHelpComponent],
  exports: [KeyboardShortcutsComponent, KeyboardShortcutsHelpComponent],
})
export class KeyboardShortcutsModule {}
