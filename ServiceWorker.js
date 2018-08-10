var cacheName = 'Idle-Chopper';
var version = "1.3.24";
var appShellFiles = [
    './',
    './index.html',
    './assets/img/ingame.png',
    './assets/img/ingame.json',
    './assets/img/ui.png',
    './assets/img/ui.json',
    './js/app.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName + version).then(function(cache) {
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName + version).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== (cacheName + version)) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});