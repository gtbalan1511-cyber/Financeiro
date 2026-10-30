const CACHE='clareza-v1.0.0';
const ASSETS=['./','./index.html','./style.css','./app.js','./engine.js','./store.js','./importer.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./vendor/papaparse.min.js','./vendor/xlsx.full.min.js','./vendor/pdf.mjs','./vendor/pdf.worker.mjs'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('clareza-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin)e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(e.request);if(cached)return cached;return fetch(e.request);}));});
