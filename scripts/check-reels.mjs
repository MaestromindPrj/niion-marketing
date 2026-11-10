import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
process.env.PORT = '3009';
await import('./serve.mjs');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [width, height] of [[360,800],[390,844],[430,932],[844,390],[1024,768],[1440,900]]) {
    const page = await browser.newPage({viewport:{width,height},isMobile:width<900,hasTouch:width<900});
    const errors=[];
    page.on('console',m=>{if(m.type()==='error'|| /recoverable|hydration|mismatch/i.test(m.text()))errors.push(m.text().slice(0,250));});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:3009');
    await page.waitForTimeout(9000);
    const videos=page.locator('.niion-bold-reel-card video');
    assert.equal(await videos.count(),3);
    assert.equal(await page.locator('.niion-bold-reel-container :is(button,h4,p,span)').count(),0);
    for (const video of await videos.all()) {
      await video.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
      await page.waitForFunction(el=>el.readyState>=2 && !el.paused,await video.elementHandle());
      assert.equal(await video.evaluate(v=>v.muted&&v.playsInline&&!v.controls),true);
      const bounds=await video.boundingBox();
      assert(bounds.x>=-1 && bounds.x+bounds.width<=width+1,'Reel overflows viewport');
    }
    await videos.first().evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    await page.waitForTimeout(600);
    await videos.first().click({force:true});
    assert(await videos.first().evaluate(v=>v.paused),'Click should pause');
    await videos.first().press('Enter');
    await page.waitForFunction(el=>!el.paused,await videos.first().elementHandle());
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,'Page overflows horizontally');
    if(width===390||width===1440){await mkdir('tmp/reel-check',{recursive:true});await page.locator('.niion-bold-reel-container').screenshot({animations:'disabled',path:`tmp/reel-check/reels-${width}.png`});}
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(500);
    assert(await videos.evaluateAll(list=>list.every(v=>v.paused)),'Off-screen reels should pause');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({width,height,reels:3,errors,overflow}));
    await page.close();
  }
  const page=await browser.newPage({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:3009');await page.waitForTimeout(9000);
  await page.locator('.niion-bold-reel-container').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(600);
  assert(await page.locator('.niion-bold-reel-card video').evaluateAll(v=>v.every(el=>el.paused)));
  assert.equal(await page.locator('.niion-bold-reel-card').first().evaluate(el=>getComputedStyle(el).animationName),'none');
  console.log('Reduced motion: videos paused, card animation disabled');
} finally {await browser.close();}
process.exit(0);
