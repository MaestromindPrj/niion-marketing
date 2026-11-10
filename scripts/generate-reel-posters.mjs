import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { reels } from '../public/site/bold-reel-content.mjs';
process.env.PORT = '3008';
await import('./serve.mjs');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3008/reels/testt.mp4');
  for (const reel of reels) {
    const result = await page.evaluate(async reel => {
      const video = document.createElement('video');
      video.muted = true;
      video.src = '/reels/' + encodeURIComponent(reel.file);
      await new Promise((resolve, reject) => { video.onloadedmetadata = resolve; video.onerror = reject; });
      video.currentTime = Math.min(1, video.duration / 2);
      await new Promise((resolve, reject) => { video.onseeked = resolve; video.onerror = reject; });
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      return { width: video.videoWidth, height: video.videoHeight, data: canvas.toDataURL('image/jpeg', 0.85).split(',')[1] };
    }, reel);
    for (const base of ['public', 'out']) {
      await mkdir(`${base}/reels/posters`, { recursive: true });
      await writeFile(`${base}/reels/posters/${reel.poster}.jpg`, Buffer.from(result.data, 'base64'));
    }
    console.log(reel.file, result.width, result.height);
  }
} finally { await browser.close(); }
process.exit(0);
