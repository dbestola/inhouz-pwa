import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the service worker registration


hydrate(
  <WebSocketProvider
    url="ws://localhost:5000"
    icon={reactLogo}
    brand=''
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WebSocketProvider>,
  document.getElementById("root")
);


// Register the service worker
serviceWorkerRegistration.register();

if (module.hot) {
  module.hot.accept();
}
