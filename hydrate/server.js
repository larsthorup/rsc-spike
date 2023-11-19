import fs from "fs";
import { createServer } from "http";

createServer(async (req, res) => {
  try {
    console.log(req.url);
    if (req.url === "/") {
      const appHTML = "<div>Hello World!</div>"; // TODO
      const appJSON =
        '{"$$typeof": "$RE","type":"div","key":null,"ref":null,"props":{"children":"Hello World!"}}'; // TODO
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

<body>${appHTML}</body>
<script>
  globalThis.__INITIAL_CLIENT_JSX_STRING__ = '${appJSON}';
</script>
<script src="client.js"></script>
</html>`;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } else if (req.url.endsWith('.js')) {
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
