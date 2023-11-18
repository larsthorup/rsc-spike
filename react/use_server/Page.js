// import { createElement as h } from "react";
import { createElement as h } from "../isomorphic/react_esm_from_umd.js"
import App from "./App.js";

export default function Page() {
  const imports = {
    react: "/use_client/react_esm_from_umd.js",
  };
  return h(
    "html",
    null,
    h(
      "head",
      null,
      h("script", { type: "importmap" }, JSON.stringify({ imports }, null, 2))
    ),
    h(App)
  );
}
