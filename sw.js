const CACHE_NAME = 'zdravie-cache-v2.4';
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
});

// Počúvame na správu o preskočení čakania (vynútený update)
self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Network-first stratégia s detekciou updatu
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET' || 
      e.request.url.includes('firestore.googleapis.com') ||
      e.request.url.includes('google.com')) return;

  e.respondWith(
    fetch(e.request, { cache: 'no-store' }) // Vynútime čerstvé dáta zo servera
      .then(function(response) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});