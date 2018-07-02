const CACHE = 'sw-tools-init';

const precacheList = [
    './index.html',
    './index.css',
    './fog.png'
];

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheList);
    });
}

self.addEventListener('install', function (evt) {
    evt.waitUntil(precache()
        .then(function () {
            return self.skipWaiting();
        })
    );
});

function clean() {
    return caches.keys().then(function (cacheNames) {
        return Promise.all(
            cacheNames.map(function (cacheName) {
                if (cacheName !== CACHE) {
                    return caches.delete(cacheName);
                }
            })
        );
    });
}

self.addEventListener('activate', function (evt) {
    evt.waitUntil(clean()
        .then(function () {
            return self.clients.claim();
        })
    );
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function fromNetwork(request, timeout) {
    return new Promise(function (resolve, reject) {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request)
            .then(function (response) {
                clearTimeout(timeoutId);
                resolve(response);
            })
            .catch(reject());
    });
}

self.addEventListener('fetch', function (evt) {
    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
        return fromCache(evt.request);
    }));
});