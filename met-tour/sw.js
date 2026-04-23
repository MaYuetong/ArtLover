/* ════════════════════════════════════════════════════════════════
   MET TOUR — SERVICE WORKER
   Cache-first for static assets, network-first for Met CDN images
════════════════════════════════════════════════════════════════ */

const CACHE_NAME  = 'met-tour-v1.2';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './data.js',
  './manifest.json'
];

/* ── INSTALL: cache core assets ──────────────────────────────── */
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

/* ── ACTIVATE: remove old caches ─────────────────────────────── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH strategy ──────────────────────────────────────────── */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Core app files: cache-first
  if (CORE_ASSETS.some(a => url.pathname.endsWith(a.replace('./', '/')))) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // Met CDN + Wikimedia images: stale-while-revalidate
  if (url.hostname === 'images.metmuseum.org' || url.hostname === 'upload.wikimedia.org') {
    e.respondWith(staleWhileRevalidate(e.request));
    return;
  }

  // Everything else: network-first with cache fallback
  e.respondWith(networkFirst(e.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — cached version unavailable', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache  = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || await fetchPromise || new Response('', { status: 503 });
}

/* ── BACKGROUND SYNC placeholder ────────────────────────────── */
self.addEventListener('sync', e => {
  if (e.tag === 'sync-notes') {
    // Future: sync notes to cloud
    console.log('[SW] Background sync: notes');
  }
});
