import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { WebSocketProvider } from "./websocket-provider"; // Import the WebSocketProvider
import reactLogo from "./react.svg";


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

if (module.hot) {
  module.hot.accept();
}
