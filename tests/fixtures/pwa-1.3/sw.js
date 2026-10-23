/* Network-first para código: atualizações do Netlify não ficam presas em cache antigo. */
const CACHE='orbita-v1.3.0-20261023';
const ASSETS=['./','./index.html','./data.js','./features.js','./app.js','./style.css','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('orbita-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
   try{const r=await fetch(event.request);if(r.ok&&ASSETS.some(a=>a==='./'?url.pathname.endsWith('/'):url.pathname.endsWith('/'+a.slice(2)))){const c=await caches.open(CACHE);await c.put(event.request,r.clone())}return r}
   catch(e){return await caches.match(event.request)|| (event.request.mode==='navigate'?await caches.match('./index.html'):Response.error())}
 })());
});
