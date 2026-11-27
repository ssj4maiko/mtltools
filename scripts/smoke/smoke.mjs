import { chromium } from 'playwright';
const BASE = process.env.BASE;
const problems = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text().slice(0, 300)); });
page.on('pageerror', (e) => problems.push('pageerror: ' + String(e).slice(0, 300)));
page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) problems.push('requestfailed: ' + r.url()); });
page.on('response', (r) => { if (r.url().startsWith(BASE) && r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
const log = (...a) => console.log(...a);
const go = async (path) => { await page.goto(BASE + path, { waitUntil: 'networkidle' }); };

await go('/novel');
await page.waitForSelector('table tbody tr');
await page.screenshot({ path: '/smoke/shots/novel.png' });
const rows = await page.locator('table tbody tr').count();
log('novel list rows:', rows);
const headers = await page.locator('table thead th').allInnerTexts();
log('headers:', headers.map((h) => h.trim()).join(' | '));
const check = (ok, msg) => { if (!ok) problems.push('check failed: ' + msg); log(ok ? 'ok  ' : 'FAIL', msg); };
const cell = async (col) => (await page.locator(`table tbody tr td:nth-child(${col})`).allInnerTexts()).map((t) => t.trim());
const num = (a) => a.map((x) => parseInt(x, 10));
const monotonic = (a, dir) => a.every((v, k) => k === 0 || (dir > 0 ? a[k - 1] <= v : a[k - 1] >= v));
const q = () => new URL(page.url()).searchParams;
const settle = () => page.waitForTimeout(350);
const sortBy = async (key) => { await page.locator(`table thead [data-sort="${key}"]`).first().click(); await settle(); };

// --- novel list: layout (no wrapping at 1920 px), merged name column, white button text
check(headers.length === 10 && !headers.some((h) => /Japanese/i.test(h)), 'novel table has 10 columns and no separate "Name Japanese" column');
const oneLine = async (sel) => page.locator(sel).evaluateAll((els) => els.map((e) => ({ t: e.textContent.trim(), h: e.getBoundingClientRect().height })));
const ths = await oneLine('table thead th');
check(ths.every((t) => t.h <= 40), 'novel headers stay on one line: heights ' + ths.map((t) => Math.round(t.h)).join(','));
const iconsOneLine = await page.evaluate(() => [...document.querySelectorAll('table tbody tr')].every((tr) =>
  ['td.status', 'td.actions'].every((sel) => { const tops = [...tr.querySelectorAll(sel + ' i')].map((i) => Math.round(i.getBoundingClientRect().top)); return new Set(tops).size <= 1; })));
check(iconsOneLine, 'Status and Actions icons stay on one line in every row');
const mergedRow = await page.evaluate(() => { const td = document.querySelector('table tbody tr td.nameCell'); const [en, jp] = td.querySelectorAll('div');
  return { en: getComputedStyle(en).textOverflow, jp: getComputedStyle(jp).textOverflow, nowrap: getComputedStyle(jp).whiteSpace, enText: en.textContent.trim(), jpText: jp.textContent.trim(), tops: [en.getBoundingClientRect().top < jp.getBoundingClientRect().top] }; });
check(mergedRow.en === 'ellipsis' && mergedRow.jp === 'ellipsis' && mergedRow.nowrap === 'nowrap' && mergedRow.tops[0] && mergedRow.enText && mergedRow.jpText, 'name cell: English on line 1, Japanese on line 2, both ellipsised');
const btnColor = await page.locator('a.button.is-info').first().evaluate((e) => getComputedStyle(e).color);
check(btnColor === 'rgb(255, 255, 255)', 'button text is white (' + btnColor + ')');

// --- sorting in the URL, one param pair per table
await go('/novel'); await page.waitForSelector('table tbody tr');
await page.evaluate(() => localStorage.clear());
await go('/novel'); await page.waitForSelector('table tbody tr');
check(!q().has('novelSort'), 'a fresh visit with nothing remembered keeps a clean URL');
for (const [col, key] of [[1, 'id'], [4, 'chapters']]) {
  const seen = [];
  for (let k = 0; k < 3; k++) { await sortBy(key); const v = num(await cell(col)); seen.push(monotonic(v, 1) ? 'asc' : monotonic(v, -1) ? 'desc' : 'unsorted'); }
  log(`sort ${key}:`, seen.join(', '));
  check(seen.includes('asc') && seen.includes('desc'), `sorting ${key} produces asc and desc`);
}
await sortBy('name'); // asc
check(q().get('novelSort') === 'name' && q().get('novelDir') === 'asc', 'URL carries novelSort=name&novelDir=asc: ' + page.url().replace(BASE, ''));
const nameAsc = await cell(3);
await sortBy('name'); // desc
check(q().get('novelDir') === 'desc', 'second click flips to novelDir=desc');
const nameDesc = await cell(3);
check(nameAsc.join() !== nameDesc.join(), 'name order really changed');
await sortBy('nameJP');
check(q().get('novelSort') === 'nameJP', 'JP toggle sorts by the Japanese name');
await page.goBack(); await settle();
check(q().get('novelSort') === 'name' && q().get('novelDir') === 'desc' && (await cell(3)).join() === nameDesc.join(), 'Back restores the previous sort');
await page.goForward(); await settle();
check(q().get('novelSort') === 'nameJP', 'Forward re-applies it');
await sortBy('lastAdded');
check(q().get('novelSort') === 'lastAdded' && q().get('novelDir') === 'desc', 'date columns start newest first');
const fulls = await page.locator('table tbody tr td.when:nth-child(8)').evaluateAll((els) => els.map((e) => e.title));
const addedReal = fulls.filter((t) => t !== 'Never');
check(addedReal.length > 1 && addedReal.every((t, k) => k === 0 || addedReal[k - 1] >= t) && fulls.slice(addedReal.length).every((t) => t === 'Never'), '"Last added" is sorted newest first, never-updated novels last');
await sortBy('lastRevised');
const revFulls = await page.locator('table tbody tr td.when:nth-child(9)').evaluateAll((els) => els.map((e) => e.title));
const revReal = revFulls.filter((t) => t !== 'Never');
check(revReal.length > 1 && revReal.every((t, k) => k === 0 || revReal[k - 1] >= t), '"Last revised" is sorted newest first');
const keepUrl = page.url();
await page.reload({ waitUntil: 'networkidle' }); await page.waitForSelector('table tbody tr');
check(page.url() === keepUrl, 'reload keeps the sort in the URL');
await go('/novel'); await page.waitForSelector('table tbody tr'); await settle();
check(q().get('novelSort') === 'lastRevised', 'a plain /novel visit applies the remembered sort and shows it in the URL: ' + page.url().replace(BASE, ''));

// --- fast filter
await go('/novel'); await page.waitForSelector('table tbody tr'); await settle();
const total = await page.locator('table tbody tr').count();
const firstName = (await page.locator('table tbody tr td.nameCell .nameEn').first().innerText()).trim().split(/\s+/)[0].toLowerCase();
await page.locator('#novelFilter').fill(firstName);
const afterType = await page.locator('table tbody tr').count();
check(afterType >= 1 && afterType <= total, `filter "${firstName}" shows ${afterType} of ${total} rows instantly`);
await page.waitForTimeout(500);
check(q().get('q') === firstName, 'filter text lands in the URL as ?q=');
await page.locator('#novelFilter').fill('syosetu'); await settle();
check((await page.locator('table tbody tr').count()) >= 1 && (await cell(5)).every((d) => d === 'syosetu'), 'filter matches the driver');
await page.locator('#novelFilter').fill('zzzzqqqq'); await settle();
check((await page.locator('table tbody tr.noMatch').count()) === 1, 'no match shows an empty-state row');
await page.locator('#novelFilter').fill(''); await settle();
check((await page.locator('table tbody tr').count()) === total && !q().has('q'), 'clearing the filter restores every row and drops ?q=');
await go('/novel?q=' + encodeURIComponent(firstName)); await page.waitForSelector('table tbody tr'); await settle();
check((await page.locator('#novelFilter').inputValue()) === firstName && (await page.locator('table tbody tr').count()) === afterType, 'opening a URL with ?q= pre-fills and applies the filter');
await go('/novel');

// open the first novel (chapter list), then a chapter
await page.locator('table tbody tr td[class], table tbody tr td').nth(1).click();
await page.waitForTimeout(1000);
log('novel page:', page.url().replace(BASE, ''), 'rows:', await page.locator('table tbody tr').count());
const chLinks = await page.locator('table tbody a, table tbody td[ng-reflect-router-link]').count();
const row = page.locator('table tbody tr').first();
await row.locator('td').nth(1).click().catch(() => {});
await page.waitForTimeout(1500);
log('after row click:', page.url().replace(BASE, ''), 'text length', (await page.locator('body').innerText()).length);
// --- chapter list: own sort params, remembered across novels, headers on one line
await go('/novel/3'); await page.waitForSelector('table tbody tr'); await settle();
const chTh = await oneLine('table thead th');
check(chTh.every((t) => t.h <= 60) && (await oneLine('table thead th .sortable')).every((t) => t.h <= 24), 'chapter headers with sort toggles stay on one line');
check(!q().has('novelSort'), 'chapter table does not use the novel params');
await sortBy('title');
check(q().get('chapterSort') === 'title' && q().get('chapterDir') === 'asc' && !q().has('novelSort'), 'chapter sort uses chapterSort/chapterDir: ' + page.url().replace(BASE, ''));
const ids = await page.evaluate(() => fetch('/api/novel').then((r) => r.json()).then((l) => l.map((n) => n.id)));
const other = ids.find((i) => i !== 3);
await go('/novel/' + other); await page.waitForSelector('table tbody tr'); await settle();
check(q().get('chapterSort') === 'title', `the chapter sort follows to another novel (#${other}): ` + page.url().replace(BASE, ''));
const crumbTops = await page.locator('header ul li').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
check(new Set(crumbTops).size === 1, 'breadcrumb is on one line');
await page.setViewportSize({ width: 380, height: 900 }); await settle();
const narrow = await page.evaluate(() => { const lis = [...document.querySelectorAll('header ul li')]; const last = lis[lis.length - 1]; const sp = last.querySelector('span');
  return { tops: new Set(lis.map((e) => Math.round(e.getBoundingClientRect().top))).size, ell: getComputedStyle(sp).textOverflow, title: last.title, cut: sp.scrollWidth > sp.clientWidth, ulRight: document.querySelector('header ul').getBoundingClientRect().right }; });
check(narrow.tops === 1 && narrow.ell === 'ellipsis' && narrow.title.startsWith('/ ') && narrow.cut && narrow.ulRight <= 380, `breadcrumb stays on one line at 380px with an ellipsis, full title in tooltip`);
await page.setViewportSize({ width: 1920, height: 1080 });
await go('/novel');

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
await page.screenshot({ path: '/smoke/shots/chapter.png' });
await go('/dictionary');
await page.waitForTimeout(800);
log('dictionary list rows:', await page.locator('table tbody tr').count());
const dlinks = await page.locator('table tbody a').evaluateAll((as) => as.map((a) => a.getAttribute('href')).filter(Boolean));
log('dictionary links:', dlinks.slice(0, 4).join(' '));
if (dlinks[0]) { await go(dlinks[0]); await page.waitForTimeout(1200); log('dictionary page:', page.url().replace(BASE, ''), 'text length', (await page.locator('body').innerText()).length); }
await go('/novel/add'); await page.waitForTimeout(500); await page.screenshot({ path: '/smoke/shots/add.png' });
await go('/dashboard');
await page.waitForTimeout(800);
await page.screenshot({ path: '/smoke/shots/dashboard.png' });
log('dashboard text length:', (await page.locator('body').innerText()).length);
await browser.close();
const external = (p) => /fontawesome|net::ERR/.test(p);
const real = problems.filter((p) => !external(p));
log(real.length ? 'PROBLEMS:\n' + real.join('\n') : 'NO PROBLEMS');
process.exit(real.length ? 1 : 0);
