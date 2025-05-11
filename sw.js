// sw.js - Service Worker

const CACHE_NAME = 'my-standalone-pwa-cache-v9'; // Increment version if you change cached assets (e.g., v2, v3)
const urlsToCache = [
    '/', // Represents index.html at the root
    'index.html',
    'style.css',
    'script.js',
    'getinfo.js',
    'webmanifest.manifest',
    'dummy.json',
    // Add all your icons (ensure these paths are correct and files exist)
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png',
    // Add any other essential assets:
    'images/header.png',
    'images/header2.jpg',
    'images/qr.png'
];

// Install event: fires when the browser installs the service worker
self.addEventListener('install', event => {
    console.log(`[Service Worker ${CACHE_NAME}] Installing...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log(`[Service Worker ${CACHE_NAME}] Caching app shell and all specified assets.`);
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log(`[Service Worker ${CACHE_NAME}] Installation complete, all assets cached.`);
                // Force the waiting service worker to become the active service worker.
                return self.skipWaiting();
            })
            .catch(error => {
                console.error(`[Service Worker ${CACHE_NAME}] Caching failed during install: `, error);
            })
    );
});

// Activate event: fires after installation and when the service worker takes control
self.addEventListener('activate', event => {
    console.log(`[Service Worker ${CACHE_NAME}] Activating...`);
    // Remove old caches that are not the current CACHE_NAME
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log(`[Service Worker ${CACHE_NAME}] Clearing old cache: ${cache}`);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log(`[Service Worker ${CACHE_NAME}] Activation complete. Old caches cleared.`);
            // Tell the active service worker to take control of the page immediately.
            return self.clients.claim();
        })
    );
});

// Fetch event: fires for every network request made by the page or service worker
self.addEventListener('fetch', event => {
    // We only want to handle GET requests for caching purposes
    if (event.request.method !== 'GET') {
        // For non-GET requests, just pass them through to the network
        // console.log(`[Service Worker ${CACHE_NAME}] Bypassing non-GET request: ${event.request.method} ${event.request.url}`);
        return event.respondWith(fetch(event.request));
    }

    // Cache-First Strategy for navigation and assets defined in urlsToCache
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Cache hit - return response from cache
                if (cachedResponse) {
                    // console.log(`[Service Worker ${CACHE_NAME}] Found in cache: ${event.request.url}`);
                    return cachedResponse;
                }

                // Not found in cache, try to fetch from network
                // console.log(`[Service Worker ${CACHE_NAME}] Not in cache, fetching from network: ${event.request.url}`);
                return fetch(event.request).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            // console.log(`[Service Worker ${CACHE_NAME}] Fetch successful but not caching (status: ${networkResponse.status}, type: ${networkResponse.type}): ${event.request.url}`);
                            return networkResponse; // Return problematic response without caching
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // console.log(`[Service Worker ${CACHE_NAME}] Caching new resource: ${event.request.url}`);
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                ).catch(error => {
                    // Network request failed, and it's not in cache.
                    console.warn(`[Service Worker ${CACHE_NAME}] Fetch failed for ${event.request.url}. User might be offline. Error:`, error);
                    // Optionally, return a generic offline fallback page if the request was for navigation
                    // if (event.request.mode === 'navigate') {
                    //     return caches.match('offline.html'); // Make sure 'offline.html' is in urlsToCache
                    // }
                    // For other assets, if not cached and network fails, the browser's default error will occur.
                });
            })
    );
});
