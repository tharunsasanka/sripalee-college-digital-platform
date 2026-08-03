const VERSION = "sripalee-pwa-v1";
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const CACHE_PREFIX = "sripalee-pwa-";

const PRECACHE_URLS = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
  "/apple-touch-icon.png",
];

const NON_CACHEABLE_PATHS = [
  "/api/",
  "/portal",
  "/contact",
  "/admissions",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(
            new Request(url, {
              cache: "reload",
            }),
          ),
        ),
      );
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      await Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith(CACHE_PREFIX) &&
              cacheName !== STATIC_CACHE &&
              cacheName !== RUNTIME_CACHE,
          )
          .map((cacheName) => caches.delete(cacheName)),
      );

      await self.clients.claim();
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (requestUrl.pathname === "/sw.js") {
    return;
  }

  const isNonCacheable = NON_CACHEABLE_PATHS.some((path) =>
    requestUrl.pathname.startsWith(path),
  );

  if (isNonCacheable) {
    if (request.mode === "navigate") {
      event.respondWith(
        fetch(request).catch(async () => {
          return (
            (await caches.match("/offline")) ||
            new Response("Offline", {
              status: 503,
              statusText: "Offline",
            })
          );
        }),
      );
    }

    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  const isStaticAsset =
    requestUrl.pathname.startsWith("/_next/static/") ||
    ["style", "script", "font", "image"].includes(request.destination);

  if (isStaticAsset) {
    event.respondWith(cacheFirstAsset(request));
    return;
  }

  event.respondWith(networkFirstResource(request));
});

async function networkFirstNavigation(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const offlinePage = await caches.match("/offline");

    if (offlinePage) {
      return offlinePage;
    }

    return new Response("The Sripalee College platform is offline.", {
      status: 503,
      statusText: "Offline",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}

async function cacheFirstAsset(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return new Response(null, {
      status: 504,
      statusText: "Asset unavailable while offline",
    });
  }
}

async function networkFirstResource(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(null, {
      status: 504,
      statusText: "Resource unavailable while offline",
    });
  }
}