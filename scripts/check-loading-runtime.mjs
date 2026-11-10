import {chromium} from 'playwright';
import assert from 'node:assert/strict';
process.env.PORT='3015';await import('./serve.mjs');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(/recoverable|circular references|hydration/i.test(m.text()))errors.push(m.text())});
 await page.addInitScript(()=>{window.__shaderDraws=new Map();const draw=WebGL2RenderingContext.prototype.drawArrays;WebGL2RenderingContext.prototype.drawArrays=function(...args){window.__shaderDraws.set(this.canvas,(window.__shaderDraws.get(this.canvas)||0)+1);return draw.apply(this,args)}});
 await page.goto('http://127.0.0.1:3015',{waitUntil:'domcontentloaded'});await page.waitForSelector('.site-loader--finished',{state:'attached'});
 const snapshot=()=>page.evaluate(()=>[...document.querySelectorAll('canvas')].map(c=>({count:window.__shaderDraws.get(c)||0,y:c.getBoundingClientRect().top,w:c.getBoundingClientRect().width,fallback:c.dataset.shaderFallback})));
 const before=await snapshot();await page.waitForTimeout(350);const after=await snapshot();
 for(let i=0;i<before.length;i++){if(before[i].y>1100||!before[i].w)assert.equal(after[i].count,before[i].count,'Off-screen shader should be idle');else if(!before[i].fallback)assert(after[i].count>before[i].count,'Visible shader should keep animating')}
 const deferred=page.locator('img[src*="mi0XhpEbKe1FE3NBs5Vc4A2o"]:visible').first();
 assert.equal(await deferred.getAttribute('loading'),'lazy');await deferred.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForFunction(el=>el.complete&&el.naturalWidth>0,await deferred.elementHandle());
 const lastCanvas=page.locator('canvas').last();await lastCanvas.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForTimeout(500);const resumed=await snapshot();await page.waitForTimeout(350);const later=await snapshot();if(!later.at(-1).fallback)assert(later.at(-1).count>resumed.at(-1).count,'Shader should resume near the viewport');
 for(const video of await page.locator('.niion-bold-reel-card video').all()){await video.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForFunction(el=>el.readyState>=2&&!el.paused,await video.elementHandle());}
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForSelector('.site-loader--finished',{state:'attached'});
 assert.deepEqual(errors,[]);console.log('Visible animations, off-screen GPU pause/resume, deferred full-quality image, all reels, and repeat visit passed');
}finally{await browser.close()}process.exit(0);
