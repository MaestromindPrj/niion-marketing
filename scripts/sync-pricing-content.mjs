import { readFile, writeFile } from 'node:fs/promises';
import { pricingContent } from '../public/site/pricing-content.mjs';

const file = new URL('../public/site/body.html', import.meta.url);
const html = await readFile(file, 'utf8');
const start = html.indexOf('<section class="framer-qvzv51"');
const end = html.indexOf('</section>', start) + '</section>'.length;
if (start < 0 || end < '</section>'.length) throw new Error('Pricing section boundaries not found');

const section = '<section class="framer-qvzv51" data-framer-name="price plans" id="price-plan" aria-labelledby="custom-plan-title">' + pricingContent + '</section>';
const next = html.slice(0, start) + section + html.slice(end);
if (next !== html) await writeFile(file, next);
