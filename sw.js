// Perform install steps
let CACHE_NAME = "piano-cache-v1";
let urlsToCache = [
  "./",
  "/style.css",
  "/piano.js",
  "./manifest.webmanifest",
  "/notes/a-5.mp3",
  "/notes/a5.mp3",
  "/notes/b5.mp3",
  "/notes/c-4.mp3",
  "/notes/c4.mp3",
  "/notes/d-4.mp3",
  "/notes/d4.mp3",
  "/notes/e4.mp3",
  "/notes/f-4.mp3",
  "/notes/f4.mp3",
  "/notes/g-4.mp3",
  "/notes/g4.mp3",
];

self.addEventListener("install", async (e) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
