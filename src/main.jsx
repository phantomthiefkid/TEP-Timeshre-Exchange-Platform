import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Ví dụ: Gửi một thông điệp tới Service Worker
      if (registration.active) {
        registration.active.postMessage({ type: "INIT", payload: "Hello SW!" });
      }
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
