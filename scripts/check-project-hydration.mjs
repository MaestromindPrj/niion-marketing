import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const url = process.env.PROJECT_TEST_URL || 'http://127.0.0.1:3006';
if (!process.env.PROJECT_TEST_URL) { process.env.PORT='3006';await import('./serve.mjs'); }
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:1000}});const errors=[];
  page.on('console',m=>{if(m.type()==='error' || (m.type()==='warning' && /recoverable|hydration|mismatch|React error/i.test(m.text())))errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await page.waitForTimeout(9500);
  await page.locator('#projects').scrollIntoViewIfNeeded();await page.waitForTimeout(1500);
  const positions=()=>page.locator('.niion-projects-row').evaluateAll(rows=>rows.map(r=>r.querySelector('a').getBoundingClientRect().x));
  const before=await positions();await page.waitForTimeout(1000);const after=await positions();
  const unique=await page.locator('#projects a').evaluateAll(links=>new Set(links.map(l=>l.href)).size);
  // iOS must receive vector arrows, not Unicode characters that can render as emoji.
  for (const selector of ['.growth-contact .growth-cta', '.niion-pricing-cta', '.niion-project-caption']) {
    const icons = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
      svg: node.querySelector('svg.niion-arrow-icon path')?.getAttribute('d'),
      glyph: /[\u2197\uFE0F]/u.test(node.textContent),
    })));
    assert(icons.length > 0);
    for (const icon of icons) { assert.equal(icon.svg, 'M5 19 19 5M5 5h14v14'); assert.equal(icon.glyph, false); }
  }
  console.log(JSON.stringify({width,errors,unique,movement:after.map((x,i)=>x-before[i])}));
  if(!process.argv.includes('--baseline')) {assert.deepEqual(errors,[]);assert.equal(unique,11);assert(after[0]<before[0]);assert(after[1]>before[1]);assert(after[2]<before[2]);}
  await page.close();
 }
} finally {await browser.close()}
process.exit(0);

