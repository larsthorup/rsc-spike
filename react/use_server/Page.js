import { createElement as h } from "react";
import App from "./App.js";

export default function Page() {
  return h("html", null, h("head"), h(App));
}
