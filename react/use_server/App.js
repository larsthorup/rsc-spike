// import { createElement as h } from "react";
import { createElement as h } from "../isomorphic/react_esm_from_umd.js"
import Header from "./Header.js";
import NewsList from "./NewsList.js";
import ThemeSwitcher from "../use_client/ThemeSwitcher.js";

export default function App() {
  return h(ThemeSwitcher, null, h(Header), h(NewsList));
}
