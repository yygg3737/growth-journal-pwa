const PREFIX='growth-static:'+self.registration.scope+':';
const CACHE=PREFIX+'v3';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const allowed=FILES.map(p=>new URL(p,self.registration.scope).href);if(u.origin!==location.origin||!allowed.includes(u.href))return;e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request);return hit||fetch(e.request)}))});
