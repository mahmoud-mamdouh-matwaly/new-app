const CACH_NAME = "DEVREACH-2";

// call install event

self.addEventListener("install", e => {
  console.log("serviceWorker : installing ");
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
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make copy/clone of response
        const resClone = res.clone();
        // open cache
        caches.open(CACH_NAME).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
