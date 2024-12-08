import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const Test = () => {
  useEffect(() => {
    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // Register the Firebase messaging service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`/firebase-messaging-sw.js`)
        .then((registration) => {
          console.log("Service Worker registered:", registration);
          messaging.useServiceWorker(registration);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    // Request permission and retrieve FCM token
    const requestFCMToken = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: "BMKNTrOYz0oeDq1_AoSe5jVDBcBpyRrO2dF7Ueoj_s7ufBnDZfupn6yrfEfPWHhGZkZMLI4BTOOf8k2Rd7XTYxA",
        });

        if (currentToken) {
          console.log("FCM Token:", currentToken);
        } else {
          console.error("No registration token available.");
        }
      } catch (err) {
        console.error("An error occurred while retrieving token.", err);
      }
    };

    // Listen for incoming messages in the foreground
    const listenForMessages = () => {
      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        alert(`Notification received: ${payload.notification.title}`);
      });
    };

    // Call the functions to request token and listen for messages
    requestFCMToken();
    listenForMessages();
  }, []);

  return (
    <div>
      <h1>FCM Test Component</h1>
      <p>Check your console for FCM token and notifications!</p>
    </div>
  );
};

export default Test;
