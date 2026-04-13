const CACHE_NAME = "helen-agro-v1";
const ASSETS = [
  "/",
  "/style.css",
  "/images/helen.PNG",
  "/images/Rice.jpg",
  "/images/Garri.jpg",
  "/images/Brown Beans.jpg",
  "/images/Yam Flour.jpg",
  "/images/Plantain Flour.jpeg",
  "/images/Dried Yam Chips.jpg",
  "/images/Egusi Seeds.png",
  "/images/Ogbono Seeds.jpg",
  "/images/palm-oil.jpg",
  "/images/Dried pepper.webp",
  "/images/crayfish.jpg",
  "/images/dried catfish.jpg",
  "/images/dried stockfish.jpeg",
  "/images/dry Ugu.jpg",
  "/images/dried bitter leaf.jpg",
  "/images/Dried Uziza Leaf.jpg",
  "/images/Dried Banga Pulp2.jpg",
  "/images/ijabu garri.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match("/"))
    )
  );
});
