// BP & INR Service Worker - Build: v2.27
const CACHE_NAME = 'bp-inr-v2.27';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './img/icon_v2.png'
];

// Inštalácia service workera – ukladáme potrebné súbory
self.addEventListener('install', function (e) {
  self.skipWaiting(); // Okamžite aktivuje nový SW a zabije starý
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // Namiesto "addAll" chytáme chyby pre každý súbor samostatne, takže SW už nikdy nespadne
      return Promise.all(FILES_TO_CACHE.map(function(url) {
        return cache.add(url).catch(function(err) { console.warn('SW Cache ignoruje chybu pre:', url); });
      }));
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
      .catch(function() {
        return caches.match(e.request).then(function(response) {
          return response || caches.match('./index.html');
        });
      })
  );
});