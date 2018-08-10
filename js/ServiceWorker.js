var cacheName = Luts.Name;
var appShellFiles = [
    './',
    './index.html',
    '.assets/img/icon/icon32.png',
    '.assets/img/icon/icon64.png',
    '.assets/img/icon/icon96.png',
    '.assets/img/icon/icon128.png',
    '.assets/img/icon/icon168.png',
    '.assets/img/icon/icon192.png',
    '.assets/img/icon/icon256.png',
    '.assets/img/icon/icon512.png',
    '.assets/img/ingame.png',
    '.assets/img/ingame.json',
    '.assets/img/ui.png',
    '.assets/img/ui.json',
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