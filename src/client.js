import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the service worker registration


hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
);


// Register the service worker
serviceWorkerRegistration.register();

if (module.hot) {
  module.hot.accept();
}
