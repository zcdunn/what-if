var CACHE_NAME = 'what-if-cache';
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
    '/javascripts/card.js',
    '/javascripts/handlebars.runtime.min.js',
    '/javascripts/jquery-1.8.0.min.js',
    '/javascripts/material.min.js',
    '/javascripts/script.js'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// todo: remove old cache in activate handler
self.addEventListener('activate', event => console.log("Activated ", event));

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(response => response ? response : fetch(event.request))
    );
});

self.addEventListener('push', event => console.log("Received push notification: ", event));
