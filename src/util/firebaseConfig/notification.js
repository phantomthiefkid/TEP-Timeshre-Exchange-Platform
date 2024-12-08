import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";


export const requestFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BMKNTrOYz0oeDq1_AoSe5jVDBcBpyRrO2dF7Ueoj_s7ufBnDZfupn6yrfEfPWHhGZkZMLI4BTOOf8k2Rd7XTYxA",
    });

    if (token) {
      localStorage.setItem("FCM_TOKEN", token);

    } else {
      console.error("No registration token available.");
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};

// Listen for messages in foreground
export const listenForMessages = (setNotification) => {
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground: ", payload);
    if (setNotification) {
      setNotification(payload.notification);
     console.log(payload.notification)
    }
  });
};
