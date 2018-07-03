importScripts("/sw-tools/examples/workbox/dist/precache-manifest.7cf614407318b61f9842d1dbb811672a.js", "/sw-tools/examples/workbox/dist/workbox-v3.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/sw-tools/examples/workbox/dist/workbox-v3.3.1"});
workbox.core.setCacheNameDetails({
    prefix: 'sw-tools',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/g,
    workbox.strategies.cacheFirst({
        cacheName: 'my-image-cache',
    })
);
