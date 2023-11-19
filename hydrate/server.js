import fs from "fs";
import { createServer } from "http";

import { renderHtmlFromJsx } from "./renderHtml.js";

import App from "./App.server.js";
import { renderClientJsxFromServerJsx } from "./renderJsx.js";

function stringifyJSX(key, value) {
  if (value === Symbol.for("react.element")) {
    // We can't pass a symbol, so pass our magic string instead.
    return "$RE"; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === "string" && value.startsWith("$")) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return "$" + value;
  } else {
    return value;
  }
}

createServer(async (req, res) => {
  try {
    console.log(req.url);
    if (req.url === "/") {
      const serverJsx = App();
      // console.log('app', JSON.stringify(app, null, 2));
      const clientJsx = await renderClientJsxFromServerJsx(serverJsx);
      console.log("appJson", JSON.stringify(clientJsx, stringifyJSX, 2));
      const appHtml = await renderHtmlFromJsx(clientJsx);
      // console.log('appHtml', appHtml);
      const appJsonString = JSON.stringify(clientJsx, stringifyJSX);
      const appJsonHtmlEncoded = appJsonString.replace(/</g, "\\u003c"); // Note: for embedding in <script> tag
      const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>App</title>
  <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=">
  <script src="node_modules/react/umd/react.development.js"></script>
  <script src="node_modules/react-dom/umd/react-dom.development.js"></script>
</head>

<body>${appHtml}</body>
<script>
  globalThis.__INITIAL_CLIENT_JSX_STRING__ = '${appJsonHtmlEncoded}';
</script>
<script src="client.js" type="module"></script>
</html>`;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } else if (req.url === "/react.js") {
      res.setHeader("Content-Type", "application/javascript");
      res.end(fs.readFileSync('./react.client.js', "utf8"));
    } else if (req.url.endsWith(".js")) {
      const path = req.url.slice(1);
      res.setHeader("Content-Type", "application/javascript");
      res.end(fs.readFileSync(path, "utf8"));
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);
console.log("http://localhost:8080/");
