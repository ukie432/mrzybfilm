importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AiZaSyA3tTtYP4_Mf01TE7lGHSRayCkxqlCmvW8",
  authDomain: "mrzyb-ht.firebaseapp.com",
  projectId: "mrzyb-ht",
  messagingSenderId: "86202931423",
  appId: "1:86202931423:web:c5aeef07c46cf9bf52316a"
});

const messaging = firebase.messaging();

// 1. Simpan pesan saat aplikasi ditutup / background
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || payload.data?.title || "Pesan Baru HT";
  const notificationBody = payload.notification?.body || payload.data?.body || "Anda menerima pesan baru.";

  // Simpan data pesan ke cache/storage sederhana agar bisa dibaca WebView
  const pesanData = {
    title: notificationTitle,
    body: notificationBody,
    timestamp: Date.now()
  };

  // Kirim ke seluruh client WebView yang aktif atau simpan
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    clientList.forEach((client) => {
      client.postMessage({ type: 'HT_PESAN_MASUK', data: pesanData });
    });
  });

  const notificationOptions = {
    body: notificationBody,
    icon: '/logo.png',
    data: pesanData // Simpan objek data ke dalam payload notifikasi
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 2. Tangani event ketika Notifikasi DIKLIK
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Buka aplikasi / fokuskan kembali WebView
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if ('focus' in client) {
          client.postMessage({ type: 'HT_PESAN_MASUK', data: event.notification.data });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});
