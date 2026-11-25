import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const url = process.env.RESPONSIVE_TEST_URL || 'http://127.0.0.1:3011';
if (!process.env.RESPONSIVE_TEST_URL) { process.env.PORT='3011';await import('./serve.mjs'); }
const browser = await chromium.launch({ channel:'chrome', headless:true });
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];
 page.on('console',m=>{if(/circular references|Maximum call stack|recoverable|hydration|mismatch/i.test(m.text()))errors.push(m.text())});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.waitForTimeout(9000);
 for(const width of [1440,390,1440,810,1440]) {
  await page.setViewportSize({width,height:900});
  await page.locator('#projects').evaluate(el=>el.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(1500);
  const visibleOrder=await page.locator('.niion-reel-slot:not([aria-hidden="true"]) video').evaluateAll(v=>v.map(el=>el.dataset.src));
  assert.equal(visibleOrder.length, 5);
  assert.equal(await page.locator('.niion-bold-reel-card video').count(), 15);
  const cards=await page.locator('.niion-reel-slot:not([aria-hidden="true"]) .niion-bold-reel-card').evaluateAll(v=>v.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y}}));
  assert(cards[0].x<cards[1].x&&cards[1].x<cards[2].x&&cards[2].x<cards[3].x&&cards[3].x<cards[4].x);
  console.log(`Viewport ${width}: reel order and layout passed`);
 }
 assert.deepEqual(errors,[]);
 console.log('No circular-reference warnings, hydration warnings, or uncaught errors after breakpoint changes');
} finally {await browser.close()}
process.exit(0);
