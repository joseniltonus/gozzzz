self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: 'GoZzzz', body: event.data.text() };
  }

  const { title = 'GoZzzz', body = '', icon, badge, url = '/' } = payload;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: icon || '/assets/images/icon.png',
      badge: badge || '/assets/images/favicon.png',
      data: { url },
      vibrate: [100, 50, 100],
      requireInteraction: false,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
