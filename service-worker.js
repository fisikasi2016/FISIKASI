const CACHE_NAME = "fisikasi-42";


const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",

  // HTML
  "./kanaleko-bideoak.html",
  "./irakasleentzako-baliabideak.html",
  "./bestelako-baliabideak.html",
  "./irakaslearen-koaderno-digitala.html",
  "./gomendatutakoak.html",

  // ICONOS Y LOGOS
  "./assets/logo.png",
  "./assets/icon-192.svg",

  // APP IMAGES
  "./assets/formuapp.png",
  "./assets/gertakariapp.png",
  "./assets/koaderno-digitala.png",

  // ADITZAPP
  "./assets/aditzapp-indikatiboa.png",
  "./assets/aditzapp-baldintza.png",
  "./assets/aditzapp-azterketa.png",

  // CANALES
  "./assets/3bulelbrown.png",
  "./assets/derivando.png",
  "./assets/hrom.png",
  "./assets/quantum.png",
  "./assets/veritasium.png",

  // LIBROS
  "./assets/didactica-fisica.png",
  "./assets/domeench1.png",
  "./assets/fisica-para-todos.png",
  "./assets/matematica-todos-css.png",
  "./assets/matematica-todos.png",
  "./assets/nueve-la-lengua.png",
  "./assets/quimica-para-todos.png",
  "./assets/thinking.png"
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