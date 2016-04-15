var CACHE_NAME = 'what-if-cache';
var urlsToCache = [
    '/',
    '/images/what-if.png',
    '/stylesheets/material.min.css',
    '/stylesheets/material.min.css.map',
    '/stylesheets/style.css',
    '/javascripts/handlebars.runtime.js',
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => return cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => console.log("Activated ", event));

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(response => response ? response : fetch(event.request))
    );
});

self.addEventListener('push', event => console.log("Received push notification: ", event));