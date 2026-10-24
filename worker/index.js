import api from '../netlify/functions/api.js';
import progress from '../server/progress.cjs';
export default {
 async fetch(request, env) {
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/api/')) {
   const response=await env.ASSETS.fetch(request);
   const headers=new Headers(response.headers);
   headers.set('X-Content-Type-Options','nosniff');
   headers.set('Referrer-Policy','no-referrer');
   headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com; frame-src https://www.youtube-nocookie.com; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
   return new Response(response.body,{status:response.status,headers});
  }
  const headers=Object.fromEntries(request.headers);
  headers['x-nf-client-connection-ip']=request.headers.get('CF-Connecting-IP')||'unknown';
  let body='';const limit=url.pathname==='/api/progress'?4194304:65536;
  if(request.body){const reader=request.body.getReader(),chunks=[];let size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();return Response.json({error:'Entrada muito grande'},{status:413})}chunks.push(value)}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}body=new TextDecoder().decode(bytes)}
  const store=env.DB&&env.ORBITA_SESSION_SECRET?progress.d1Store(env.DB,env.ORBITA_SESSION_SECRET):null;
  const result=await api.createHandler(env,fetch,store)({path:url.pathname,httpMethod:request.method,headers,body,queryStringParameters:Object.fromEntries(url.searchParams)});
  const out=new Headers(result.headers);for(const value of result.multiValueHeaders?.['Set-Cookie']||[])out.append('Set-Cookie',value);
  return new Response(result.body,{status:result.statusCode,headers:out});
 }
};
