const { React, ReactDOM } = globalThis;
const { hydrateRoot } = ReactDOM;

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
hydrateRoot(document.body, clientJSX);
console.log('hydration completed')