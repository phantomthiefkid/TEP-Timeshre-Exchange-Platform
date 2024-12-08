// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCH89jlk8GNA0YEEUhlIS0rH1SLOULro0o",
  authDomain: "unwind-7cfdb.firebaseapp.com",
  projectId: "unwind-7cfdb",
  storageBucket: "unwind-7cfdb.firebasestorage.app",
  messagingSenderId: "685904756369",
  appId: "1:685904756369:web:6579655c8f485fafc3c930",
  measurementId: "G-WE3DEFPWZZ",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging };
