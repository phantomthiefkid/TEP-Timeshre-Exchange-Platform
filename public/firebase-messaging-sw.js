// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCH89jlk8GNA0YEEUhlIS0rH1SLOULro0o",
  authDomain: "unwind-7cfdb.firebaseapp.com",
  projectId: "unwind-7cfdb",
  storageBucket: "unwind-7cfdb.firebasestorage.app",
  messagingSenderId: "685904756369",
  appId: "1:685904756369:web:6579655c8f485fafc3c930",
  measurementId: "G-WE3DEFPWZZ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
