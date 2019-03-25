const CACH_NAME = "DEVREACH";

const CACH_ASSETS = ["index.html", "/static/js/bundle.js"];

// call install event

self.addEventListener("install", e => {
  console.log("serviceWorker : installing ");
  e.waitUntil(
    caches
      .open(CACH_NAME)
      .then(cache => {
        console.log("serviceWorker: caching files");
        cache.addAll(CACH_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// call activate event
self.addEventListener("activate", e => {
  console.log("serivceWorker: activated");
  e.waitUntil(
    caches.keys().then(cachNames => {
      return Promise.all(
        cachNames.map(cache => {
          if (cache !== CACH_NAME) {
            console.log("serivceWorker clear old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
// call fatch event
self.addEventListener("fetch", e => {
  console.log("service worker fetching", e.request.url);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
// self.addEventListener("install", e => {
//   console.log("installing  service worker !!");
//   e.waitUntil(
//     caches
//       .open(CACH_NAME)
//       .then(cache => {
//         console.log("serviceWorker cached files");
//         cache.addAll(CACH_ASSETS);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// self.addEventListener("activate", e => {
//   console.log("activate  service worker !!");
//   e.waitUntil(self.clients.claim());
// });

// self.addEventListener("fetch", event => {
//   console.log("fetched  service worker !!");
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       console.log(response);
//       if (response) {
//         return response;
//       }
//       var fetchRequest = event.request.clone();
//       return fetch(fetchRequest)
//         .then(function(response) {
//           if (
//             !response ||
//             response.status !== 200 ||
//             response.type !== "basic"
//           ) {
//             return response;
//           }
//           var responseToCache = response.clone();
//           console.log(responseToCache);

//           caches.open(CACH_NAME).then(function(cache) {
//             cache.put(event.request, responseToCache);
//           });
//           return response;
//         })
//         .catch(() => {
//           if (response) {
//             return response;
//           }
//         });
//     })
//   );
// });
