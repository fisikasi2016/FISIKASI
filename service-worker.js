const CACHE_NAME = "fisikasi-v39";

const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./kanaleko-bideoak.html",
  "./irakasleentzako-baliabideak.html",
  "./bestelako-baliabideak.html",
  "./assets/logo.png",
  "./assets/formuapp.png",
  "./assets/aditzapp-indikatiboa.png",
  "./assets/aditzapp-baldintza.png",
  "./assets/aditzapp-azterketa.png",
  "./app.js"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker instalándose");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});