var cacheName = 'Idle-Chopper';
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
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});