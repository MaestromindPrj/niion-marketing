import { readFile, writeFile } from 'node:fs/promises';
import { clientItems } from '../public/site/clients-content.mjs';

// Update and move the existing marquee; preserve its heading, effects and layout.
const file = new URL('../public/site/body.html', import.meta.url);
let html = await readFile(file, 'utf8');
const start = html.indexOf('<section class="framer-1ighnzr"');
if (start < 0) throw new Error('Original client marquee not found');
const tags = /<\/?section\b[^>]*>/g;
tags.lastIndex = start;
let depth = 0;
let end = -1;
for (let match; (match = tags.exec(html));) {
  depth += match[0].startsWith('</') ? -1 : 1;
  if (depth === 0) { end = tags.lastIndex; break; }
}
if (end < 0) throw new Error('Clients section end not found');
let section = html.slice(start, end);
if (!/<ul\b/.test(section)) throw new Error('Client marquee list not found');
section = section.replace(/(<ul\b[^>]*>)[\s\S]*?<\/ul>/, '$1' + clientItems + '</ul>');
html = html.slice(0, start) + html.slice(end);
const services = '<section class="framer-8g7id2"';
if (!html.includes(services)) throw new Error('Services section not found');
await writeFile(file, html.replace(services, section + services));
