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

async function hydrateComponent(moduleName, exportName, props, children, selector) {
  const module = await import(moduleName);
  const Component = module[exportName];
  hydrate(h(Component, props, children), document.querySelector(selector));
}

const clientJSX = JSON.parse(globalThis.__INITIAL_CLIENT_JSX_STRING__, reviveJSX);
// TODO: drive this from clientJSX
await hydrateComponent('./App.client.js', 'ThemeSwitcher', {}, clientJSX.props.children[1].props.children, 'body');
await hydrateComponent('./App.client.js', 'UpvoteButton',  {id: '1', upvoted: false}, [], 'body > div > div > ul > li:nth-child(1)');
await hydrateComponent('./App.client.js', 'UpvoteButton',  {id: '2', upvoted: false}, [], 'body > div > div > ul > li:nth-child(2)');
console.log('hydration completed')