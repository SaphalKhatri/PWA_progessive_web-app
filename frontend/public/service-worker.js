const CACHE_NAME = "pwa-v1";
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

// 1. Install Event: Cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// 3. Fetch Event: Network-first for dynamic API, cache-first for static shell
self.addEventListener("fetch", (event) => {
  // Do not intercept or cache backend API calls
  if (event.request.url.includes("/hello")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});