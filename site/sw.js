/* Cada versão usa um conjunto estático completo. Atualização só assume controle após ação explícita. */
const CACHE='orbita-v1.5.0-personal-1';
const ASSETS=['./','./index.html','./data.js','./features.js','./app.js','./simulations.js','./recommendations.js','./catalog.js','./connections.js','./catalog/v1.json','./style.css','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
const urls=ASSETS.map(p=>new URL(p,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
  try{const cache=await caches.open(CACHE);await cache.addAll(urls)}catch(error){await caches.delete(CACHE);throw error}
})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(k=>k.startsWith('orbita-')&&k!==CACHE&&k!=='orbita-catalog-validated').map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  // Respostas privadas e endpoints futuros nunca entram no cache estático.
  if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/.netlify/'))return;
  if(url.pathname.endsWith('/catalog/v1.json')&&url.searchParams.has('refresh')){event.respondWith(fetch(request).catch(async()=>await caches.match(new URL('./catalog/v1.json',self.registration.scope).href)||Response.error()));return;}
  const assetURL=url.origin+url.pathname;
  if(!urls.includes(assetURL)&&request.mode!=='navigate')return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(request.mode==='navigate'?new URL('./index.html',self.registration.scope).href:assetURL);
    return cached||fetch(request);
  })());
});
