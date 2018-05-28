
let staticCacheName = 'wittr-static-v2';
const urlsToCache = [
  "/",
  "index.html",  
  "restaurant.html",
  "css/styles.css",
  "data/restaurants.json",
  "js/restaurant_info.js",
  "./sw-register.js",
  "js/dbhelper.js",
  "js/main.js",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg"
];
self.addEventListener('install', function(event){
  event.waitUntil(
  caches.open(staticCacheName).then(function(cache){
  console.log("Opened cache");
  return cache.addAll(urlsToCache);
})
    );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
        );
    })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      if (response.status == 404) {
        return new Response("Whoops, not found");
      }
      return response;
    }).catch(function(){
      return new Response("Uh oh, that totally failed!");
    })
  );
});



// ref : https://developers.google.com/web/fundamentals/primers/service-workers/