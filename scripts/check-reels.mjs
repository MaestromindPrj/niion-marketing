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
    const allVideos = page.locator('.niion-bold-reel-card video');
    const visibleVideos = page.locator('.niion-reel-slot:not([aria-hidden="true"]) video');
    assert.equal(await allVideos.count(), 14);
    assert.equal(await visibleVideos.count(), 5);
    assert.equal((await page.locator('#niion-reel-title').innerText()).replace(/\s+/g,' ').trim().toLowerCase(), 'let\u2019s craft something bold.');
    assert.equal(await page.locator('#reels .niion-reel-signoff').count(), 0);
    assert.equal(await page.locator('.niion-bold-reel-card :is(button,h4,p,span)').count(),0);
    await page.locator('#reels').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    for (const video of await visibleVideos.all()) {
      await page.waitForFunction(el=>el.readyState>=2 && !el.paused,await video.elementHandle());
      assert.equal(await video.evaluate(v=>v.muted&&v.playsInline&&!v.controls),true);
      const bounds=await video.boundingBox();
      assert(bounds.x>=-1 && bounds.x+bounds.width<=width+1,'Reel overflows viewport');
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,'Page overflows horizontally');
    if(width===390||width===1440){await mkdir('tmp/reel-check',{recursive:true});await page.locator('.niion-bold-reel-container').screenshot({animations:'disabled',path:`tmp/reel-check/reels-${width}.png`});}
    const firstVisible = visibleVideos.first();
    const expectedSrc = await firstVisible.evaluate(v => v.dataset.src);
    await firstVisible.click({force:true});
    const modal = page.locator('.niion-reel-modal');
    const modalVideo = page.locator('.niion-reel-modal-video');
    await modal.waitFor({ state: 'visible' });
    await page.waitForFunction(el => el.readyState >= 2 && !el.paused, await modalVideo.elementHandle());
    assert.equal(await modalVideo.evaluate((v, src) => !v.muted && v.volume === 1 && v.controls && v.controlsList.contains('nodownload') && v.disablePictureInPicture && v.getAttribute('src') === src, expectedSrc), true, 'Fullscreen reel should play unmuted with controls and no download option');
    assert.equal(await modalVideo.evaluate(v => !v.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }))), true, 'Right-click context menu should be blocked on fullscreen reel');
    assert(await allVideos.evaluateAll(list => list.every(v => v.paused)), 'Background reels should pause while fullscreen modal is open');
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(([el, prev]) => el.getAttribute('src') !== prev && el.readyState >= 2, [await modalVideo.elementHandle(), expectedSrc]);
    await page.keyboard.press('Escape');
    await modal.waitFor({ state: 'hidden' });
    await page.waitForTimeout(300);
    assert(await visibleVideos.evaluateAll(list => list.every(v => !v.paused)), 'Visible reels should resume after closing fullscreen modal');
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(500);
    assert(await allVideos.evaluateAll(list=>list.every(v=>v.paused)),'Off-screen reels should pause');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({width,height,totalReels:14,visibleReels:5,errors,overflow}));
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
