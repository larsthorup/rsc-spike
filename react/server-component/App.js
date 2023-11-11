import { createElement as h } from "react";
import Header from "./Header.js";
import NewsList from "./NewsList.js";

export default function App() {
  return h("html", null, h("body", null, h(Header), h(NewsList)));
}
