// Portable static-export preview, with explicit module MIME types and video ranges.
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";

const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".mjs":"text/javascript", ".css":"text/css", ".json":"application/json", ".txt":"text/plain", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".avif":"image/avif", ".gif":"image/gif", ".woff2":"font/woff2", ".woff":"font/woff", ".mp4":"video/mp4", ".webm":"video/webm", ".ico":"image/x-icon" };
const server = http.createServer(async (req,res) => {
  try {
    if (!["GET","HEAD"].includes(req.method)) { res.writeHead(405).end(); return; }
    const pathname = decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    let info = await stat(file);
    if (info.isDirectory()) { file=path.join(file,"index.html"); info=await stat(file); }
    const headers = {"Content-Type":mime[path.extname(file)]||"application/octet-stream", "Accept-Ranges":"bytes", "Cache-Control":"no-cache", "X-Content-Type-Options":"nosniff"};
    let start=0, end=info.size-1, status=200;
    const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if(range){
      start=Number(range[1]); end=range[2]?Math.min(Number(range[2]),end):end;
      if(start>end || start>=info.size){res.writeHead(416,{"Content-Range":`bytes */${info.size}`}).end();return;}
      status=206; headers["Content-Range"]=`bytes ${start}-${end}/${info.size}`;
    }
    headers["Content-Length"]=end-start+1;
    res.writeHead(status,headers);
    if(req.method==="HEAD")res.end(); else createReadStream(file,{start,end}).pipe(res);
  } catch {
    res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});
    if(req.method==="HEAD")res.end(); else createReadStream(path.join(root,"404.html")).pipe(res);
  }
});
server.listen(port,"127.0.0.1",()=>console.log(`Niion Marketing: http://127.0.0.1:${port}`));
