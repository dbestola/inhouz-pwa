import React, { useState, useEffect } from "react";
import "./NetworkStatusBanner.css"; // Import a CSS file to style the banner

const NetworkStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true); // Initial network status
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        // Fetch a small endpoint to verify connectivity
        const response = await fetch(
          "https://backendserviceworker.onrender.com/article",
          {
            method: "HEAD",
            cache: "no-store",
          }
        );
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    const handleOnline = async () => {
      const online = await checkOnlineStatus();
      setIsOnline(online);
      if (online) {
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 2000); // Show restored message briefly
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true); // Show offline message
    };

    // Event listeners for network changes
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial status check when component mounts
    const initialCheck = async () => {
      const online = await checkOnlineStatus();
      setIsOnline(online);
      if (!online) {
        setShowBanner(true); // Show offline message on initial load if offline
      }
    };
    initialCheck();

    // Polling only when offline to detect reconnection
    const interval = setInterval(async () => {
      if (!isOnline) {
        const online = await checkOnlineStatus();
        if (online) {
          handleOnline();
        }
      }
    }, 10000);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [isOnline]);

  return (
    showBanner && (
      <div
        className={`network-status-banner ${isOnline ? "online" : "offline"}`}
      >
        {isOnline
          ? "Network connectivity restored"
          : "You are currently offline"}
        <br />
      </div>
    )
  );
};

export default NetworkStatusBanner;
