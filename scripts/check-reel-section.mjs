import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {for(const [width,height] of [[1440,900],[390,844]]){
const page=await browser.newPage({viewport:{width,height}});await page.goto('http://127.0.0.1:3000');await page.waitForTimeout(9000);
const section=page.locator('.framer-452uln');await section.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
const sizes=await section.evaluate(el=>{const rect=el.getBoundingClientRect();const gallery=el.querySelector('.niion-bold-reel-container').getBoundingClientRect();return {sectionHeight:rect.height,galleryWidth:gallery.width,galleryHeight:gallery.height,overflow:document.documentElement.scrollWidth>innerWidth+1}});
assert(!sizes.overflow);assert(sizes.sectionHeight<=height,'Section should fit the viewport');
await mkdir('tmp/reel-layout',{recursive:true});await section.screenshot({path:`tmp/reel-layout/${width}.png`,animations:'disabled'});console.log(JSON.stringify({width,...sizes}));await page.close();
}}finally{await browser.close()}
