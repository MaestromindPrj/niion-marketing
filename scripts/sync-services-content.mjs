import { readFile, writeFile } from 'node:fs/promises';
import { servicesExtension } from '../public/site/services-content.mjs';

// A marked insertion inside #services preserves every existing service design.
const file = new URL('../public/site/body.html', import.meta.url);
const html = await readFile(file, 'utf8');
const start = '<!-- niion-services-additions:start -->';
const end = '<!-- niion-services-additions:end -->';
const block = start + '<div class="niion-services-additions">' + servicesExtension + '</div>' + end;
const startIndex = html.indexOf(start);
let next;
if (startIndex !== -1) {
  const endIndex = html.indexOf(end, startIndex);
  if (endIndex < 0) throw new Error('Services insertion end marker is missing');
  next = html.slice(0, startIndex) + block + html.slice(endIndex + end.length);
} else {
  const boundary = '<div class="framer-qfkvsb" data-framer-name="Top Border">';
  const services = html.indexOf('id="services"');
  const index = html.indexOf(boundary, services);
  if (services < 0 || index < 0) throw new Error('Original services insertion point not found');
  next = html.slice(0, index) + block + html.slice(index);
}
if (next !== html) await writeFile(file, next);
