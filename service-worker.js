const CACHE_NAME = 'pwa-example-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/icon-maskable-192x192.png',
    '/icons/icon-maskable-512x512.png'
];

// 安装Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('缓存已打开');
                return cache.addAll(ASSETS);
            })
    );
    // 强制新的Service Worker立即激活
    self.skipWaiting();
});

// 激活Service Worker
self.addEventListener('activate', (event) => {
    // 清除所有旧的缓存
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
    // 对于导航请求（如刷新页面），优先从网络获取
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // 网络请求成功，更新缓存
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    // 网络请求失败，使用缓存
                    return caches.match(event.request);
                })
        );
    } else {
        // 对于其他请求，使用缓存优先策略
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        // 同时在后台更新缓存
                        fetch(event.request)
                            .then((fetchResponse) => {
                                if (fetchResponse && fetchResponse.status === 200) {
                                    const responseToCache = fetchResponse.clone();
                                    caches.open(CACHE_NAME)
                                        .then((cache) => {
                                            cache.put(event.request, responseToCache);
                                        });
                                }
                            });
                        return response;
                    }
                    return fetch(event.request)
                        .then((fetchResponse) => {
                            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                                return fetchResponse;
                            }
                            const responseToCache = fetchResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                            return fetchResponse;
                        });
                })
        );
    }
});