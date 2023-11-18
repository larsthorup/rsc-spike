// import { createElement as h } from "react";
import { createElement as h } from "../isomorphic/react_esm_from_umd.js"

export default function Header() {
  return h('h1', null, 'Latest news!');
}