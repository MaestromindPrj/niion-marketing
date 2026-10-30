import { readFile, writeFile } from 'node:fs/promises';
import { growthBlocks } from '../public/site/growth-content.mjs';

const file = new URL('../public/site/body.html', import.meta.url);
const html = await readFile(file, 'utf8');
const start = html.indexOf('<section class="framer-11zg5yl"');
const clients = html.indexOf('<section class="framer-1ighnzr"', start);
const end = clients >= 0 ? clients : html.indexOf('<section class="framer-8g7id2"', start);
if (start < 0 || end < 0) throw new Error('Growth section boundaries not found');
const backgroundStart = html.indexOf('<div class="framer-vlcq4j"', start);
const backgroundEnd = html.indexOf('<div class="framer-iyfkd5', backgroundStart);
if (backgroundStart < start || backgroundEnd < backgroundStart || backgroundEnd > end) {
  throw new Error('Animated background boundaries not found');
}
const background = html.slice(backgroundStart, backgroundEnd);
const section = '<section class="framer-11zg5yl" data-framer-name="Growth Marketing" id="about">' + background + '<div class="framer-iyfkd5 growth-content">' + growthBlocks.map(block => `<div class="growth-block"><div>${block}</div></div>`).join('') + '</div></section>';
await writeFile(file, html.slice(0, start) + section + html.slice(end));
