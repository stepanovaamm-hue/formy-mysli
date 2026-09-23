import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.js':'application/javascript','.css':'text/css'};
http.createServer(async(req,res)=>{
 const u=new URL(req.url,'http://localhost');
 if(u.pathname==='/__qa_mobile'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end('<!doctype html><html><head><meta charset="utf-8"><title>Мобильная проверка</title></head><body style="margin:0;background:#ddd"><iframe title="Мобильная версия игры" src="/" style="display:block;width:390px;height:844px;border:0"></iframe></body></html>');return;}
 const requested=u.pathname==='/'?'/index.html':u.pathname;
 let file;try{file=path.resolve(root,'.'+decodeURIComponent(requested))}catch{res.writeHead(400).end();return}
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 try{const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)}catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found')}
}).listen(4173,'0.0.0.0',()=>console.log('Local: http://localhost:4173/'));
