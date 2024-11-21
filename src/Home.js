import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "./Notification.js";

function Home() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  const getNotified = async () => {
    await fetch("https://backendserviceworker.onrender.com/send-notification");
  };

  useEffect(() => {
    // Detect iOS devices
    const iOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const standaloneMode = window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(iOSDevice);
    setIsInStandaloneMode(standaloneMode);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setShowInstallButton(true); // Show install button for Android/Chrome
    };

    // Listen for the `beforeinstallprompt` event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        window.deferredPrompt = null;
        setShowInstallButton(false);
      });
    }
  };

  return (
    <div className="home container">
      <header className="home-header">
        <h1>Welcome to Inhouz News</h1>
        <p>
          Get the latest news on technology, science, and more, in a sleek dark
          mode interface!
        </p>
        <br />
        <img
          className="img"
          src="https://avatars.githubusercontent.com/u/98102242?s=400&u=76287a857f0cab27010f3608ca2419d8514f402d&v=4"
          alt="image"
        />
      </header>
      <br />
      <br />
      <section className="section-flex">
        {showInstallButton && !isIos && (
          <button onClick={handleInstallClick} className="install-button">
            Install App
          </button>
        )}

        {/* iOS Manual Installation Guide */}
        {isIos && !isInStandaloneMode && (
          <div className="ios-install-prompt">
            <p>
              To install this app, tap <strong>Share</strong> and then{" "}
              <strong>Add to Home Screen</strong>.
            </p>
          </div>
        )}

        <button onClick={getNotified} className="install-button">
          Get Notified
        </button>
      </section>

      <section className="home-articles">
        <h2>Latest Articles</h2>
        <ul>
          <li>
            <Link to="/articles/1">
              Understanding Server-Side Rendering with Razzle
            </Link>
          </li>
          <li>
            <Link to="/articles/2">
              Building Responsive Web Apps with React and CSS
            </Link>
          </li>
          <li>
            <Link to="/articles/3">Exploring Dark Mode UI Trends</Link>
          </li>
        </ul>
      </section>

      <Notification />
    </div>
  );
}

export default Home;
