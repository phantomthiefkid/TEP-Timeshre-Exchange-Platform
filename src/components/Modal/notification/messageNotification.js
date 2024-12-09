// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH89jlk8GNA0YEEUhlIS0rH1SLOULro0o",
  authDomain: "unwind-7cfdb.firebaseapp.com",
  projectId: "unwind-7cfdb",
  storageBucket: "unwind-7cfdb.firebasestorage.app",
  messagingSenderId: "685904756369",
  appId: "1:685904756369:web:6579655c8f485fafc3c930",
  measurementId: "G-WE3DEFPWZZ",
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Add your custom icon here
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
