// Precompress text assets only. Images, videos, fonts, and source files stay intact.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, gzip, constants } from 'node:zlib';
const br = promisify(brotliCompress), gz = promisify(gzip);
let originalBytes=0, compressedBytes=0, files=0;
async function compress(directory) {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()){await compress(file);continue;}
    if(!/\.(?:html|css|js|mjs|json|svg|txt)$/.test(file))continue;
    const source=await readFile(file);
    if(source.length<1024)continue;
    const [brotli,gzipped]=await Promise.all([br(source,{params:{[constants.BROTLI_PARAM_QUALITY]:5}}),gz(source,{level:6})]);
    await Promise.all([writeFile(file+'.br',brotli),writeFile(file+'.gz',gzipped)]);
    originalBytes+=source.length;compressedBytes+=brotli.length;files++;
  }
}
await compress(path.resolve('out'));
console.log(`Compressed ${files} text assets: ${originalBytes} -> ${compressedBytes} bytes (Brotli). Media unchanged.`);
