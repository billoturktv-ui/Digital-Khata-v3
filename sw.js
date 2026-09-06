const CACHE = "digikhata-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./vendor/app.bundle.js",
  "./vendor/styles.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((res) => {
          // Cache same-origin app assets and cross-origin assets (e.g. Google Fonts)
          // opportunistically so the app keeps working offline after first load.
          if (res && (res.ok || res.type === "opaque")) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
