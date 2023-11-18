const { React, ReactDOM } = globalThis;
const { hydrateRoot } = ReactDOM;

clientJSX = {
  "$$typeof": Symbol.for("react.element"),
  "type": "div",
  "key": null,
  "ref": null,
  "props": {
    "children": "Hello World!"
  },
};
hydrateRoot(document.body, clientJSX);