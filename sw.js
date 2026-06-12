// BP & INR Service Worker - Build: 2024-05-23_v1.50
const CACHE_NAME = 'bp-inr-v1.50';
const FILES_TO_CACHE = [
  './',
  'index.html',
  'favicon.png',
  'manifest.json',
  'bp.png',
  'bp inr.png'
];

// Inštalácia service workera – ukladáme potrebné súbory
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
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
  if (e.data) {
    if (e.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  }
});

// Network-first stratégia s detekciou updatu
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET' ||
      !e.request.url.startsWith('http') ||
      e.request.url.includes('firestore.googleapis.com') ||
      e.request.url.includes('google.com') ||
      e.request.url.includes('sw.js')) return;

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Uložiť do cache iba platné odpovede z nášho pôvodu
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
