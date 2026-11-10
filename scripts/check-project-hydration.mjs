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
  console.log(JSON.stringify({width,errors,unique,movement:after.map((x,i)=>x-before[i])}));
  if(!process.argv.includes('--baseline')) {assert.deepEqual(errors,[]);assert.equal(unique,11);assert(after[0]<before[0]);assert(after[1]>before[1]);assert(after[2]<before[2]);}
  await page.close();
 }
} finally {await browser.close()}
process.exit(0);

