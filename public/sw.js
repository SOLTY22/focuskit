const CACHE_NAME = 'focuskit-cache-v2'
const PAGE_CACHE = 'focuskit-pages'
const ASSET_CACHE = 'focuskit-assets'

const PAGES = [
  '/',
  '/tools/pomodoro',
  '/tools/tasks',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(PAGES))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![PAGE_CACHE, ASSET_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Pages: cache-first
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((res) => {
            return caches.open(PAGE_CACHE).then((cache) => {
              cache.put(request, res.clone())
              return res
            })
          })
        )
      })
    )
    return
  }

  // Assets: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((res) => {
        return caches.open(ASSET_CACHE).then((cache) => {
          cache.put(request, res.clone())
          return res
        })
      })
      return cached || fetchPromise
    })
  )
})
