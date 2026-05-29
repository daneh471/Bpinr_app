const CACHE_NAME = 'zdravie-cache-v60';
const FILES_TO_CACHE = [
  './index.html',
  './favicon.png',
  './manifest.json'
];

// Inštalácia service workera – ukladáme potrebné súbory
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktivácia – čistíme starú cache a upozorníme klientov na update
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) { 
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Okamžité prevzatie kontroly
  );
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'UPDATE_AVAILABLE' });
    });
  });
  return self.clients.claim();
});

// Network-first stratégia s detekciou updatu
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(function (response) {
        // Uložíme novú odpoveď do cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(function () {
        // Ak sieť zlyhá, použijeme cache
        return caches.match(e.request);
      })
  );
});