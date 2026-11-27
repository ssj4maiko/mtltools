// Screenshots of the novel list and a chapter list at 1920 wide. SHOT=prefix (e.g. before / after)
import { chromium } from 'playwright';
const BASE = process.env.BASE, P = process.env.SHOT || 'shot';
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(BASE + '/novel', { waitUntil: 'networkidle' });
await page.waitForSelector('table tbody tr');
await page.screenshot({ path: `/smoke/shots/${P}-novel-list.png` });
await page.goto(BASE + '/novel/3', { waitUntil: 'networkidle' });
await page.waitForSelector('table tbody tr');
await page.screenshot({ path: `/smoke/shots/${P}-chapter-list.png` });
await b.close();
