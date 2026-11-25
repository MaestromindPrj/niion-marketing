import { readFile, writeFile } from 'node:fs/promises';
import { boldReelSectionHtml } from '../public/site/bold-reel-content.mjs';

// Replace and place the reel section right above the client section; one source for server and client.
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
const withoutReel = html.slice(0, start) + html.slice(end);
const clientsSelector = '<section class="framer-1ighnzr"';
const clientsStart = withoutReel.indexOf(clientsSelector);
if (clientsStart < 0) throw new Error('Clients section not found in HTML');
const nextHtml = withoutReel.slice(0, clientsStart) + boldReelSectionHtml + withoutReel.slice(clientsStart);
if (html !== nextHtml) await writeFile(htmlFile, nextHtml);

const bundleFile = new URL('../public/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/KF6OkDm_5yBOnHEndpDrcRjsQbJzsVJlsmHeNvGGzS0.xIDEcsax.mjs', import.meta.url);
const original = await readFile(bundleFile, 'utf8');
let code = original.replace(/\r\n/g, '\n');
const render = 'renderBoldReelSection(m)';
const clientsMarker = 'b(`section`,{className:`framer-1ighnzr`';
const target = `${render},${clientsMarker}`;

if (!code.includes(target)) {
  if (code.includes(render)) {
    code = code.replace(`,${render}`, '').replace(`${render},`, '');
  } else {
    const from = code.indexOf('b(`section`,{className:`framer-452uln`');
    const to = code.indexOf(',b(`section`,{className:`framer-1ait6jk`', from);
    if (from < 0 || to < 0) throw new Error('Client reel section boundaries not found');
    code = code.slice(0, from > 0 && code[from - 1] === ',' ? from - 1 : from) + code.slice(to);
  }
  const clientsPos = code.indexOf(clientsMarker);
  if (clientsPos < 0) throw new Error('Clients section marker not found in bundle');
  code = code.slice(0, clientsPos) + `${render},` + code.slice(clientsPos);
}

code = code.replace('import { renderBoldReelCard } from "/site/bold-reel-content.mjs";\n', '');
const importStatement = 'import { renderBoldReelSection } from "/site/bold-reel-content.mjs";\n';
// Remove existing copies before inserting one import, including files checked out with CRLF.
code = importStatement + code.split(importStatement).join('');
if (code !== original) await writeFile(bundleFile, code);
console.log('Reel section synchronized above clients for server and client.');
