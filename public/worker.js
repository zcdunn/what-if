importScripts('/sw-toolbox/sw-toolbox.js');

const version = '1.0.0';
const CACHE_NAME = 'what-if-cache-' + version;
var urlsToCache = [
    '/',
    '/images/what-if-logo.png',
    '/images/what-if.png',
    '/stylesheets/material-fonts.css',
    '/stylesheets/material-icons.css',
    '/stylesheets/material.min.css',
    '/stylesheets/material.teal-pink.min.css',
    '/stylesheets/mdl.css',
    '/stylesheets/style.css',
    '/javascripts/jquery-1.8.0.min.js',
    '/javascripts/angular.min.js',
    '/javascripts/angular-sanitize.min.js',
    '/javascripts/angular-route.min.js',
    '/javascripts/angular-animate.min.js',
    '/javascripts/material.min.js',
    '/javascripts/script.js',
    '/dialog-polyfill/dialog-polyfill.css',
    '/dialog-polyfill/dialog-polyfill.js',
    '/partials/cards.html',
    '/partials/entry.html'
];

toolbox.options.debug = true;
toolbox.precache(urlsToCache);
toolbox.router.get('*', toolbox.cacheFirst);

/*
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    console.log("Activated ", event)
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames
                .filter(cacheName => cacheName !== CACHE_NAME)
                .map(cacheName => caches.delete(cacheName))
        );
    }))
});

self.addEventListener('fetch', event => {
    console.log("Handling fetch,", event);
    if(event.request.url.includes('feed')) console.log("Fetching feed");
    event.respondWith(caches.match(event.request)
        .then(response => response ? response : fetch(event.request))
    );
});
*/

self.addEventListener('push', event => console.log("Received push notification: ", event));
