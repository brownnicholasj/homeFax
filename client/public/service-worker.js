const CACHE_NAME = "static-cache";
const FILES_TO_CACHE = [
  "/",
  "/static/css/main.18ea8b52.chunk.css",
  "/static/css/main.18ea8b52.chunk.css.map",
  "/static/js/2.998f6f6d.chunk.js",
  "/static/js/2.998f6f6d.chunk.js.LICENSE.txt",
  "/static/js/2.998f6f6d.chunk.js.map",
  "/static/js/main.af9d9644.chunk.js",
  "/static/js/main.af9d9644.chunk.js.map",
  "/static/js/runtime-main.95d54150.js",
  "/static/js/runtime-main.95d54150.js.map",
  "/asset-manifest.json",
  "/favicon.ico",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "/robots.txt"
];

// install
self.addEventListener("install", function (evt) {
  // pre cache transaction data
  // pre cache all static assets
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  // tell the browser to activate this service worker immediately once it
  // has finished installing
  self.skipWaiting();
});

// activate
self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
// self.addEventListener("fetch", function(evt) {
//   if (evt.request.url.includes("/api/")) {
//     evt.respondWith(
//       caches.open(DATA_CACHE_NAME).then(cache => {
//         return fetch(evt.request)
//           .then(response => {
//             // If the response was good, clone it and store it in the cache.
//             if (response.status === 200) {
//               cache.put(evt.request.url, response.clone());
//             }

//             return response;
//           })
//           .catch(err => {
//             // Network request failed, try to get it from the cache.
//             return cache.match(evt.request);
//           });
//       }).catch(err => console.log(err))
//     );

//     return;
//   }

//   evt.respondWith(
//     caches.open(CACHE_NAME).then(cache => {
//       return cache.match(evt.request).then(response => {
//         return response || fetch(evt.request);
//       });
//     })
//   );
// });
