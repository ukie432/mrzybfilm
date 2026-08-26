importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA3tTtYP4_Mf01TE7lGHSRayCkxqlCmvW8",
  authDomain: "mrzyb-ht.firebaseapp.com",
  projectId: "mrzyb-ht",
  messagingSenderId: "86202931423",
  appId: "1:86202931423:web:c5aeef07c46cf9bf52316a"
});

const messaging = firebase.messaging();

// Menangani notifikasi saat aplikasi ditutup / berjalan di background
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "Pesan Baru HT";
  const notificationOptions = {
    body: payload.notification.body || "Anda menerima pesan baru.",
    icon: '/logo.png' // Gantilah dengan path logo aplikasi Anda jika ada
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
