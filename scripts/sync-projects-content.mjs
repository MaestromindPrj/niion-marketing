import { readFile, writeFile } from 'node:fs/promises';
import { projectsSection } from '../public/site/projects-content.mjs';
const file = new URL('../public/site/body.html', import.meta.url);
let html = await readFile(file, 'utf8');
const marker = '<!-- niion-projects:start -->';
const endMarker = '<!-- niion-projects:end -->';
let start = html.indexOf(marker), end;
if (start >= 0) {
  end = html.indexOf(endMarker, start);
  if (end < 0) throw new Error('Missing projects end marker');
  end += endMarker.length;
} else {
  start = html.indexOf('<div class="framer-6uucmi"');
  if (start < 0) throw new Error('Original projects section not found');
  const tags = /<\/?div\b[^>]*>/g; tags.lastIndex = start;
  let depth = 0;
  for (let tag; (tag = tags.exec(html));) {
    depth += tag[0].startsWith('</') ? -1 : 1;
    if (depth === 0) { end = tags.lastIndex; break; }
  }
  if (!end) throw new Error('Projects boundary not found');
}
const next = html.slice(0, start) + marker + projectsSection + endMarker + html.slice(end);
if (next !== html) await writeFile(file, next);

// The preserved Framer renderer must hydrate the same section as the export.
const bundleFile = new URL('../public/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/KF6OkDm_5yBOnHEndpDrcRjsQbJzsVJlsmHeNvGGzS0.xIDEcsax.mjs', import.meta.url);
const original = await readFile(bundleFile, 'utf8');
let code = original;
const replacement = 'renderProjectsSection(m,Jn)';
if (!code.includes(replacement)) {
  const from = code.indexOf('b(`div`,{className:`framer-6uucmi`');
  const to = code.indexOf(',renderPricingSection(', from);
  if (from < 0 || to < 0) throw new Error('Client projects section boundaries not found');
  code = code.slice(0, from) + replacement + code.slice(to);
}
const importStatement = 'import { renderProjectsSection } from "/site/projects-content.mjs";\n';
if (!code.includes(importStatement)) code = importStatement + code;
if (code !== original) await writeFile(bundleFile, code);
