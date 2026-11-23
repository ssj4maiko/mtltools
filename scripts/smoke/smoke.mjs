import { chromium } from 'playwright';
const BASE = process.env.BASE;
const problems = [];
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text().slice(0, 300)); });
page.on('pageerror', (e) => problems.push('pageerror: ' + String(e).slice(0, 300)));
page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) problems.push('requestfailed: ' + r.url()); });
page.on('response', (r) => { if (r.url().startsWith(BASE) && r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
const log = (...a) => console.log(...a);
const go = async (path) => { await page.goto(BASE + path, { waitUntil: 'networkidle' }); };

await go('/novel');
await page.waitForSelector('table tbody tr');
const rows = await page.locator('table tbody tr').count();
log('novel list rows:', rows);
const headers = await page.locator('table thead th').allInnerTexts();
log('headers:', headers.map((h) => h.trim()).join(' | '));
// sorting: the header icons call sort(field, direction); check id and chapters columns really reorder
const cell = async (col) => (await page.locator(`table tbody tr td:nth-child(${col})`).allInnerTexts()).map((t) => t.trim());
const num = (a) => a.map((x) => parseInt(x, 10));
const monotonic = (a, dir) => a.every((v, k) => k === 0 || (dir > 0 ? a[k - 1] <= v : a[k - 1] >= v));
for (const [col, name] of [[1, 'id'], [5, 'chapters']]) {
  const icons = page.locator(`table thead th:nth-child(${col}) i[class*="fa-sort"]`);
  const seen = [];
  for (let k = 0; k < 3; k++) {
    await icons.first().click(); await page.waitForTimeout(200);
    const v = num(await cell(col));
    seen.push(monotonic(v, 1) ? 'asc' : monotonic(v, -1) ? 'desc' : 'unsorted');
  }
  log(`sort ${name}:`, seen.join(', '));
  if (!(seen.includes('asc') && seen.includes('desc'))) problems.push(`sorting ${name} did not produce asc and desc: ${seen}`);
}
for (const [col, name] of [[3, 'name'], [6, 'driver']]) {
  const icons = page.locator(`table thead th:nth-child(${col}) i[class*="fa-sort"]`);
  const before = await cell(col);
  const orders = [];
  for (let k = 0; k < 3; k++) { await icons.first().click(); await page.waitForTimeout(200); orders.push((await cell(col)).slice(0, 3).join('/')); }
  log(`sort ${name}:`, orders.join(' || '));
  if (new Set(orders).size < 2 && new Set(before).size > 1) problems.push(`sorting ${name} had no effect`);
}
// open the first novel (chapter list), then a chapter
await page.locator('table tbody tr td[class], table tbody tr td').nth(1).click();
await page.waitForTimeout(1000);
log('novel page:', page.url().replace(BASE, ''), 'rows:', await page.locator('table tbody tr').count());
const chLinks = await page.locator('table tbody a, table tbody td[ng-reflect-router-link]').count();
const row = page.locator('table tbody tr').first();
await row.locator('td').nth(1).click().catch(() => {});
await page.waitForTimeout(1500);
log('after row click:', page.url().replace(BASE, ''), 'text length', (await page.locator('body').innerText()).length);
await go('/novel/3/100'); await page.waitForTimeout(1500);
if (/\/novel\/\d+\/\d+/.test(page.url())) {
  // shortcuts: f1 help overlay, alt+pagedown next chapter
  await page.keyboard.press('F1'); await page.waitForTimeout(300);
  log('f1 help visible:', await page.locator('.modal.is-active, ng-keyboard-shortcuts-help .cdk-overlay-pane, .ng-keyboard-shortcuts-help').count());
  await page.keyboard.press('Escape');
  const before = page.url();
  await page.keyboard.press('Alt+PageDown'); await page.waitForTimeout(1500);
  log('alt+pagedown navigated:', before !== page.url(), page.url().replace(BASE, ''));
}
await go('/dictionary');
await page.waitForTimeout(800);
log('dictionary list rows:', await page.locator('table tbody tr').count());
const dlinks = await page.locator('table tbody a').evaluateAll((as) => as.map((a) => a.getAttribute('href')).filter(Boolean));
log('dictionary links:', dlinks.slice(0, 4).join(' '));
if (dlinks[0]) { await go(dlinks[0]); await page.waitForTimeout(1200); log('dictionary page:', page.url().replace(BASE, ''), 'text length', (await page.locator('body').innerText()).length); }
await go('/dashboard');
await page.waitForTimeout(800);
log('dashboard text length:', (await page.locator('body').innerText()).length);
await browser.close();
const external = (p) => /fontawesome|net::ERR/.test(p);
const real = problems.filter((p) => !external(p));
log(real.length ? 'PROBLEMS:\n' + real.join('\n') : 'NO PROBLEMS');
process.exit(real.length ? 1 : 0);
