import { UpvoteButton } from './App.client.js';

const { React, ReactDOM } = globalThis;
const { createElement: h } = React;
const { hydrateRoot, hydrate } = ReactDOM;

function reviveJSX(key, value) {
  if (value === "$RE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    // This is a string starting with $. Remove the extra $ added by the server.
    return value.slice(1);
  } else {
    return value;
  }
}

const clientJSX = JSON.parse(globalThis.__INITIAL_CLIENT_JSX_STRING__, reviveJSX);
// console.log(clientJSX);
// TODO: get props from clientJSX
// TODO: ThemeSwitcher
// TODO: async dynamic import driven from clientJSX
// TODO: drive this from clientJSX
hydrate(h(UpvoteButton, {id: '1', upvoted: false}), document.querySelector('body > div > div > ul > li:nth-child(1)'));
hydrate(h(UpvoteButton, {id: '2', upvoted: false}), document.querySelector('body > div > div > ul > li:nth-child(2)'));
// hydrateRoot(document.body, clientJSX);
console.log('hydration completed')