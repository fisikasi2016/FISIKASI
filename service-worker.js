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

  // ICONOS
  "./assets/logo.png",
  "./assets/icon-192.svg",

  // APPS
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


// INSTALACIÓN
self.addEventListener("install", (event) => {
  console.log("Service Worker instalándose");

  // Fuerza la actualización inmediata
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Archivos cacheados");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Error cacheando archivos:", error);
      })
  );
});


// ACTIVACIÓN
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

  // Toma control inmediato
  self.clients.claim();
});


// FETCH
self.addEventListener("fetch", (event) => {

  // Para páginas HTML → intenta internet primero
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para el resto → cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});