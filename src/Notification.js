import React, { useState, useEffect } from "react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

const EnableNotifications = () => {
  // State to track if notifications are enabled
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Check permission status when the component mounts
  useEffect(() => {
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const registration = await serviceWorkerRegistration.register();
        console.log("Notification permission granted:", registration);
        setNotificationsEnabled(true); // Hide button after enabling notifications
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    } else {
      console.log("Notification permission denied");
    }
  };

  // Only show the button if notifications are not enabled
  return (
    !notificationsEnabled && (
      <button onClick={requestNotificationPermission}>Enable Notifications</button>
    )
  );
};

export default EnableNotifications;
