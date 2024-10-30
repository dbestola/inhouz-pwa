import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Notification from './Notification.js';

function Home() {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setShowInstallButton(true); // Show the install button when the event is triggered
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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
        setShowInstallButton(false); // Hide the button after interaction
      });
    }
  };

  return (
    <div className="home container">
      <header className="home-header">
        <h1>Welcome to Inhouz News</h1>

        <p>
          Get the latest news on technology, science, and more, in a sleek
          dark mode interface!
        </p>
      </header>
      
      {showInstallButton && (
        <button onClick={handleInstallClick} className="install-button">
          Install App
        </button>
      )}
      
      <section className="home-articles">
        <h2>Latest Articles</h2>
        <ul>
          <li>
            <Link to="/articles/1">Understanding Server-Side Rendering with Razzle</Link>
          </li>
          <li>
            <Link to="/articles/2">Building Responsive Web Apps with React and CSS</Link>
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
