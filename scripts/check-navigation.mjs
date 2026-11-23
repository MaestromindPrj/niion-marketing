import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
process.env.PORT='3015'; await import('./serve.mjs');
const base='http://127.0.0.1:3015';
const variants=[['desktop',chromium,{viewport:{width:1440,height:950}}],['touch',chromium,{viewport:{width:390,height:844},isMobile:true,hasTouch:true}],['webkit',webkit,{viewport:{width:390,height:844},isMobile:true,hasTouch:true}]];
for(const [name,engine,options] of variants){
 let browser;
 try{browser=await engine.launch({...(engine===chromium?{channel:'chrome'}:{}),headless:true});}catch(error){console.log(name+' unavailable: '+error.message.split('\n')[0]);continue;}
 try{
  const page=await browser.newPage(options);page.setDefaultTimeout(12000);page.setDefaultNavigationTimeout(15000); const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const ready=async()=>{await page.waitForFunction(()=>document.documentElement.dataset.niionApplicationLoaded==='true');await page.waitForTimeout(800);};
  const activate=async selector=> options.hasTouch? page.locator(selector).tap():page.locator(selector).click();
  const open=async()=>{await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));await page.waitForTimeout(800);if(options.hasTouch){await activate('nav.framer-evR0X .framer-bxnwrn');await page.waitForTimeout(600);assert.match(await page.locator('nav.framer-evR0X').getAttribute('data-framer-name'),/Open/);}};
  await page.goto(base); await ready();await page.waitForTimeout(1500);
  await open();await activate('nav .framer-yctd3k-container a');await page.waitForURL('**/services/');await ready();
  assert.equal(await page.locator('.services-hero').count(),1);console.log(name+': Services navigation passed');
  for(const [container,id] of [['Growth','about'],['Events','events'],['Projects','projects'],['Pricing','price-plan']]){
   await open();const link=page.locator('nav.framer-evR0X a').filter({hasText:container}).first();if(options.hasTouch)await link.tap();else await link.click();await page.waitForURL('**/#'+id);await ready();await page.waitForTimeout(1100);
   const top=await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top);assert(top>=-5&&top<250,`${name} ${id}: ${top}`);
   if(options.hasTouch)assert.doesNotMatch(await page.locator('nav.framer-evR0X').getAttribute('data-framer-name'),/Open/);
   console.log(name+': '+id+' navigation passed');
  }
  await page.goto(base+'/services/');await ready();await page.locator('.services-hero-primary').click();await page.waitForTimeout(1000);assert(page.url().endsWith('#service-specialties'));
  await page.locator('.service-extension-contact a').click();await page.waitForURL('**/#contact');await ready();await page.waitForTimeout(600);
  assert((await page.locator('#contact').evaluate(el=>el.getBoundingClientRect().top))<250);
  console.log(name+': hero and contact links passed');assert.deepEqual(errors,[]);
 }finally{await browser.close();}
}
process.exit(0);
