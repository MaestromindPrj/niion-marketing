import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
process.env.PORT='3012';await import('./serve.mjs');
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const width of [1440,390]){
const page=await browser.newPage({viewport:{width,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(/recoverable|circular references|hydration/i.test(m.text()))errors.push(m.text().slice(0,150))});
await page.addInitScript(()=>{
 window.__startup={longTasks:[],loaded:null,revealed:null,shaders:null};
 new PerformanceObserver(list=>window.__startup.longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});
 const observer=new MutationObserver(()=>{
 if(document.documentElement.dataset.niionApplicationLoaded==='true'&&!window.__startup.loaded)window.__startup.loaded=performance.now();
 if(document.querySelector('.site-loader--finished')&&!window.__startup.revealed)window.__startup.revealed=performance.now();
 if(document.querySelector('canvas[data-shader-ready="true"]')&&!window.__startup.shaders)window.__startup.shaders=performance.now();
 });observer.observe(document,{subtree:true,attributes:true,childList:true});
});
await page.goto('http://127.0.0.1:3012',{waitUntil:'domcontentloaded'});
await page.waitForSelector('.site-loader--finished',{state:'attached',timeout:30000});await page.waitForTimeout(1000);
const result=await page.evaluate(()=>({
 ...window.__startup,nav:performance.getEntriesByType('navigation').map(e=>({ttfb:e.responseStart,dom:e.domContentLoadedEventEnd})),
 resources:performance.getEntriesByType('resource').map(e=>({name:new URL(e.name).pathname,start:e.startTime,end:e.responseEnd,bytes:e.transferSize,type:e.initiatorType})),
 images:[...document.images].map(i=>({src:i.currentSrc,loading:i.loading,y:i.getBoundingClientRect().top})),
 canvases:[...document.querySelectorAll('canvas')].map(c=>({ready:c.dataset.shaderReady,y:c.getBoundingClientRect().top,width:c.width,height:c.height})),
}));
await mkdir('tmp/performance',{recursive:true});await writeFile(`tmp/performance/${process.argv[2]||'profile'}-${width}.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({width,loaded:result.loaded,shaders:result.shaders,revealed:result.revealed,requests:result.resources.length,bytes:result.resources.reduce((a,r)=>a+r.bytes,0),longTasks:result.longTasks.length,longTaskMs:result.longTasks.reduce((a,r)=>a+r.duration,0),largest:result.resources.sort((a,b)=>b.bytes-a.bytes).slice(0,7),canvases:result.canvases,errors}));await page.close();
}}finally{await browser.close()}process.exit(0);
