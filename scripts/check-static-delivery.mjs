import http from 'node:http';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {brotliDecompressSync,gunzipSync} from 'node:zlib';
process.env.PORT='3014';await import('./serve.mjs');
const request=(path,headers={},method='GET')=>new Promise((resolve,reject)=>{const req=http.request({host:'127.0.0.1',port:3014,path,headers,method},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}))});req.on('error',reject);req.end()});
const original=await readFile('out/index.html');
for(const encoding of ['br','gzip']){
 const response=await request('/',{'accept-encoding':encoding});assert.equal(response.status,200);assert.equal(response.headers['content-encoding'],encoding);assert.deepEqual(encoding==='br'?brotliDecompressSync(response.body):gunzipSync(response.body),original);
 const cached=await request('/',{'accept-encoding':encoding,'if-none-match':response.headers.etag});assert.equal(cached.status,304);assert.equal(cached.body.length,0);
 const head=await request('/',{'accept-encoding':encoding},'HEAD');assert.equal(head.body.length,0);assert.equal(Number(head.headers['content-length']),response.body.length);
}
const plain=await request('/',{'accept-encoding':'br;q=0, gzip;q=0'});assert.equal(plain.headers['content-encoding'],undefined);assert.deepEqual(plain.body,original);
const media=await readFile('out/reels/testt.mp4');const range=await request('/reels/testt.mp4',{range:'bytes=64-255','accept-encoding':'br,gzip'});assert.equal(range.status,206);assert.equal(range.headers['content-encoding'],undefined);assert.deepEqual(range.body,media.subarray(64,256));
console.log('Lossless Brotli/gzip, cache revalidation, HEAD, encoding opt-out, and original video range checks passed');process.exit(0);
