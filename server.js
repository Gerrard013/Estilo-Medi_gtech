'use strict';
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const zlib=require('node:zlib');
const root=path.resolve(__dirname);
const port=Number(process.env.PORT)||8080;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.webp':'image/webp','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.json':'application/json; charset=utf-8'};
const security={
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
 'Content-Security-Policy':"default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
};
http.createServer((req,res)=>{
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{'Allow':'GET, HEAD',...security});res.end();return;}
 let requestPath;
 try{requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400,security);res.end();return;}
 if(requestPath==='/'||requestPath==='')requestPath='/index.html';
 // Only serve known public resources; never expose docs, .env or build files.
 if(!/^\/(index\.html|app\.js|styles\.css|robots\.txt|sitemap\.xml|assets\/(?:acervo\/)?[A-Za-z0-9_-]+\.webp)$/.test(requestPath)){
  res.writeHead(404,security);res.end('Não encontrado');return;
 }
 const file=path.resolve(root,'.'+requestPath);
 if(!file.startsWith(root+path.sep)){res.writeHead(403,security);res.end();return;}
 fs.readFile(file,(err,content)=>{
  if(err){res.writeHead(404,security);res.end('Não encontrado');return;}
  const ext=path.extname(file);
  const headers={...security,'Content-Type':types[ext]||'application/octet-stream','Cache-Control':ext==='.webp'?'public, max-age=604800, immutable':'no-cache','Vary':'Accept-Encoding'};
  if(req.headers['accept-encoding']?.includes('gzip')&&['.html','.css','.js','.xml'].includes(ext)){
   zlib.gzip(content,(gzipErr,compressed)=>{if(gzipErr){res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:content);return;}headers['Content-Encoding']='gzip';res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:compressed)})
  }else{res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:content)}
 });
}).listen(port,'0.0.0.0',()=>console.log('Emilly G Tech ouvindo na porta '+port));
