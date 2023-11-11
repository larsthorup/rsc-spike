import http from "node:http";

import express from "express";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";

import App from "./server-component/App.js";

const app = express();

app.use((req, res, next) => {
  try {
  const html = renderToString(h(App));
  res.set("Content-Type", "text/html").status(200).end(html);
  } catch (err) {
    console.error(err);
    res.set("Content-Type", "text/plain").status(500).end(`${err}`);
  }  
});

const server = http.createServer(app);
server.listen(3000);
console.log('http://localhost:3000/');