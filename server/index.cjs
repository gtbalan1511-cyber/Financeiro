/* Adaptador HTTP independente de provedor. Publicar atrás de HTTPS no domínio existente. */
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {createHandler}=require('../netlify/functions/api');
const root=path.resolve(__dirname,'../site');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.md':'text/plain; charset=utf-8'};
function createServer(env=process.env,request=fetch){
 const handle=createHandler(env,request);
 return http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
  try{
   const u=new URL(req.url,'http://localhost');
   if(u.pathname==='/api'||u.pathname.startsWith('/api/')){
    res.setHeader('Cache-Control','private, no-store');let body='',size=0;
    for await(const chunk of req){size+=chunk.length;if(size>65536){res.writeHead(413);res.end('{"error":"Entrada muito grande"}');return}body+=chunk.toString('utf8')}
    const result=await handle({path:u.pathname,httpMethod:req.method,headers:{...req.headers,'x-nf-client-connection-ip':req.socket.remoteAddress},queryStringParameters:Object.fromEntries(u.searchParams),body});
    res.writeHead(result.statusCode,{...result.headers,...Object.fromEntries(Object.entries(result.multiValueHeaders||{}).filter(([,v])=>v.length))});res.end(result.body);return;
   }
   if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return}
   const rel=decodeURIComponent(u.pathname)==='/'?'index.html':decodeURIComponent(u.pathname).slice(1);
   if(rel.split('/').some(p=>p.startsWith('.')||p==='')||rel.includes('\\'))throw Error('NOT_FOUND');
   const file=await fs.realpath(path.resolve(root,rel));if(!file.startsWith(root+path.sep))throw Error('NOT_FOUND');
   const data=await fs.readFile(file);res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
   res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com; frame-src https://www.youtube-nocookie.com; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
   res.setHeader('Cache-Control','no-cache');res.writeHead(200);res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404,{'Cache-Control':'no-store'});res.end('Indisponível')}
 });
}
if(require.main===module){const port=Number(process.env.PORT||4173);createServer().listen(port,process.env.HOST||'127.0.0.1',()=>console.log('Órbita HTTP pronto na porta '+port+'; OAuth requer origem HTTPS configurada.'))}
module.exports={createServer};
