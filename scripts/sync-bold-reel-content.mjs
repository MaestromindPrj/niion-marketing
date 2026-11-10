import { readFile, writeFile } from 'node:fs/promises';
import { boldReelCardHtml } from '../public/site/bold-reel-content.mjs';

// 1. Sync body.html for SSR
const htmlFile = new URL('../public/site/body.html', import.meta.url);
let html = await readFile(htmlFile, 'utf8');

// Keep the mobile override consistent with the reel section's desktop heading.
const supportIndex = html.indexOf('<section class="framer-452uln"');
const supportEnd = html.indexOf('</section>', supportIndex);
if (supportIndex < 0 || supportEnd < 0) throw new Error('Support section not found');
let support = html.slice(supportIndex, supportEnd);
const headings = [...support.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)];
if (headings.length === 2) {
  support = support.replace(headings[1][0], headings[1][0].replace(headings[1][1], headings[0][1]));
}
support = support.replaceAll("Effortlessly connect with your favorite tools. Whether it's your CRM, email marketing platform.", 'We love hearing new ideas — let’s turn yours into a success story.');
html = html.slice(0, supportIndex) + support + html.slice(supportEnd);

const marker = '<!-- niion-bold-reel:start -->';
const endMarker = '<!-- niion-bold-reel:end -->';
const block = marker + `<div class="niion-bold-reel-container">${boldReelCardHtml}</div>` + endMarker + '</div>';

const start = html.indexOf(marker);
if (start !== -1) {
  const lineStart = html.indexOf('<div class="framer-jny2be" data-framer-name="Line">', start);
  if (lineStart < 0) throw new Error('Line divider not found after bold reel in body.html');
  html = html.slice(0, start) + block + html.slice(lineStart);
} else {
  const supportStart = html.indexOf('<section class="framer-452uln"');
  if (supportStart < 0) throw new Error('Support section not found in body.html');
  const bottomStart = html.indexOf('<div class="framer-u9lexy" data-framer-name="Bottom">', supportStart);
  const lineStart = html.indexOf('<div class="framer-jny2be" data-framer-name="Line">', bottomStart);
  if (bottomStart < 0 || lineStart < 0) throw new Error('Bottom target boundary not found in Support section');
  html = html.slice(0, bottomStart) + block + html.slice(lineStart);
}

await writeFile(htmlFile, html);
console.log('✓ Successfully synced bold reel content to public/site/body.html');

// 2. Sync client hydration bundle
const bundleFile = new URL('../public/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/KF6OkDm_5yBOnHEndpDrcRjsQbJzsVJlsmHeNvGGzS0.xIDEcsax.mjs', import.meta.url);
let code = await readFile(bundleFile, 'utf8');
const originalCode = code;
code = code.replaceAll('children:`Seamless Integrations`', 'children:`Let’s Craft Something Bold.`')
  .replaceAll("Effortlessly connect with your favorite tools. Whether it's your CRM, email marketing platform.", 'We love hearing new ideas — let’s turn yours into a success story.');

const importStatement = 'import { renderBoldReelCard } from "/site/bold-reel-content.mjs";\n';
if (!code.includes(importStatement)) {
  code = importStatement + code;
}
if (code !== originalCode) await writeFile(bundleFile, code);

const targetStart = code.indexOf('m(`div`,{className:`framer-u9lexy`');
if (targetStart !== -1) {
  let p = 1, i = targetStart + 2;
  for (; i < code.length; i++) {
    if (code[i] === '(') p++;
    else if (code[i] === ')') {
      p--;
      if (p === 0) break;
    }
  }
  const targetEnd = i + 1; // inclusive of `)`
  code = code.slice(0, targetStart) + 'renderBoldReelCard(m)' + code.slice(targetEnd);
  await writeFile(bundleFile, code);
  console.log('✓ Successfully patched client hydration bundle with renderBoldReelCard');
}
