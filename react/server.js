import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createElement as h } from "react";
import { renderToPipeableStream } from "react-dom/server";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: this is not actually ismorphic
app.use("/isomorphic", express.static(path.join(__dirname, "isomorphic")));
app.use("/use_client", express.static(path.join(__dirname, "use_client")));
app.use("/use_server", express.static(path.join(__dirname, "use_server")));
// app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// TODO: bundle and serve this for better cache performance
const umdScripts = [
  'node_modules/react/umd/react.development.js',
  'node_modules/react-dom/umd/react-dom.development.js'
].map((filePath) =>
  fs.readFileSync(path.join(__dirname, filePath), "utf8")
);
// Note: React UMD must be imported into a non-module context.
const bootstrapScriptContent = [
  umdScripts[0],
  umdScripts[1],
].join("\n");

app.use("/", async (req, res, next) => {
  const { default: React } = await import("./node_modules/react/umd/react.development.js");
  globalThis.React = React;
  const { default: Page } = await import("./use_server/Page.js");
  const { pipe } = renderToPipeableStream(h(Page), {
    bootstrapScriptContent,
    bootstrapModules: ["/use_client/bootstrap.js"],
    onShellReady() {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
    onShellError(err) {
      console.error(err);
      res.set("Content-Type", "text/plain").status(500).end(`${err}`);
    },
  });
});

const server = http.createServer(app);
server.listen(3000);
console.log("http://localhost:3000/");
