import React from "react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    try {
      const registration = await serviceWorkerRegistration.register();
      console.log("Notification permission granted:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  } else {
    console.log("Notification permission denied");
  }
};


const EnableNotifications = () => (
  <button onClick={requestNotificationPermission}>Enable Notifications</button>
);

export default EnableNotifications;
