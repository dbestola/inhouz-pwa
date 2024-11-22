import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { fetchArticle } from "./api";
import path from "path";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || './build/assets.json');



// Helper functions for adding CSS and JS links
const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
        .map((asset) => `<link rel="stylesheet" href="${asset}">`)
        .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
        .map((asset) => `<script src="${asset}" ${extra.join(" ")}></script>`)
        .join("")
      : ""
    : "";
};

// Updated renderApp function to preload data
export const renderApp = async (req, res) => {
  const context = {};

  // Check if the URL matches the articles route
  const match = req.url.match(/\/articles\/(\d+)/);
  const articleId = match ? match[1] : null;
  let initialData = {};

  // If the URL has an article ID, fetch article data
  if (articleId) {
    initialData = await fetchArticle(articleId);
    console.log(initialData);
  }

  // Render the app with the preloaded data
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App initialData={initialData} />
    </StaticRouter>
  );

  // Create the HTML response, including serialized initial state
  const html = `<!doctype html>
  <html lang="">
  <head>

      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/css/App.css">
      <link rel="stylesheet" href="/css/Article.css">
      <link rel="stylesheet" href="/css/Home.css">
      <link rel="stylesheet" href="/css/NetworkStatusBanner.css">
      ${cssLinksFromAssets(assets, "client")}
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="apple-mobile-web-app-title" content="Inhouz News">
      <link rel="apple-touch-icon" sizes="180x180" href="/maskable.png">
      <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png">
      <link rel="apple-touch-icon" sizes="512x512" href="/logo512.png">


  </head>
  <body>
      <div id="root">${markup}</div>
      <script>
          window.__PRELOADED_STATE__ = ${serialize(initialData)};
      </script>
      ${jsScriptTagsFromAssets(assets, "client", "defer", "crossorigin")}
  </body>
</html>`;

  return { context, html };
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || path.join(__dirname, 'build/public')))
  .get("/*", async (req, res) => {
    const { context, html } = await renderApp(req, res);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });

export default server;
