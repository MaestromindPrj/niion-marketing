import { readFile, writeFile } from 'node:fs/promises';

// These six specialties now live on /services, never in the home-page export.
const file = new URL('../public/site/body.html', import.meta.url);
const html = await readFile(file, 'utf8');
const next = html.replace(/<!-- niion-services-additions:start -->[\s\S]*?<!-- niion-services-additions:end -->/g, '');
if (next !== html) await writeFile(file, next);
