import { readFile, writeFile } from 'node:fs/promises';
import { boldReelSectionHtml } from '../public/site/bold-reel-content.mjs';

// Replace only the reel section; its copy and playback markup have one source.
const htmlFile = new URL('../public/site/body.html', import.meta.url);
const html = await readFile(htmlFile, 'utf8');
const start = html.indexOf('<section class="framer-452uln');
if (start < 0) throw new Error('Reel section not found in HTML');
const tags = /<\/?section\b[^>]*>/g;
tags.lastIndex = start;
let depth = 0, end;
for (let tag; (tag = tags.exec(html));) {
  depth += tag[0].startsWith('</') ? -1 : 1;
  if (depth === 0) { end = tags.lastIndex; break; }
}
if (!end) throw new Error('Reel section closing tag not found');
const nextHtml = html.slice(0, start) + boldReelSectionHtml + html.slice(end);
if (html !== nextHtml) await writeFile(htmlFile, nextHtml);

const bundleFile = new URL('../public/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/KF6OkDm_5yBOnHEndpDrcRjsQbJzsVJlsmHeNvGGzS0.xIDEcsax.mjs', import.meta.url);
const original = await readFile(bundleFile, 'utf8');
let code = original;
const render = 'renderBoldReelSection(m)';
if (!code.includes(render)) {
  const from = code.indexOf('b(`section`,{className:`framer-452uln`');
  const to = code.indexOf(',b(`section`,{className:`framer-1ait6jk`', from);
  if (from < 0 || to < 0) throw new Error('Client reel section boundaries not found');
  code = code.slice(0, from) + render + code.slice(to);
}
code = code.replace('import { renderBoldReelCard } from "/site/bold-reel-content.mjs";\n', '');
const importStatement = 'import { renderBoldReelSection } from "/site/bold-reel-content.mjs";\n';
if (!code.includes(importStatement)) code = importStatement + code;
if (code !== original) await writeFile(bundleFile, code);
console.log('Reel section synchronized for server and client.');
