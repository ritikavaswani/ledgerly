// Ledgerly service worker — offline caching + push notifications.
const CACHE = "ledgerly-v1";

// --- Push notifications ---
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { body: event.data && event.data.text() }; }
  const title = data.title || "Ledgerly";
  const body = data.body || "You have subscription payments due.";
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "icon.png",
      badge: "icon.png",
      tag: "ledgerly-due",
      renotify: true
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cl) => {
      for (const c of cl) { if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow("./Ledgerly.html");
    })
  );
});

const ASSETS = [
  "./",
  "./Ledgerly.html",
  "./manifest.webmanifest",
  "./icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation (so updates show), falling back to cache when offline.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy).catch(() => {}));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("./Ledgerly.html")))
  );
});
