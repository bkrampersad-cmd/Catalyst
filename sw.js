/* Catalyst service worker.
   RELEASE RULE: bump CACHE together with VERSION in js/app.js on every release, and list every
   file in ASSETS. Changing this file is what tells installed copies an update exists. */
const CACHE = 'catalyst-v0.3.1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png',
  './icon-maskable-512.png', './elements.js', './js/chem.js', './js/app.js', './js/ptable.js', './js/calcs.js',
  './js/calcs2.js', './js/study.js', './js/regents.js', './js/lessons/u1.js', './js/lessons/u2.js', './js/lessons/u3.js',
  './js/lessons/u4.js', './js/lessons/u5.js', './js/lessons/u6.js', './js/lessons/u7.js', './js/lessons/mid.js'];
self.addEventListener('install', e => {
  // cache: 'reload' bypasses the browser HTTP cache (GitHub Pages caches ~10 min) so we never store stale files
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(cached => cached || fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  })));
});
