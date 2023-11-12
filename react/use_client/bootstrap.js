// Note: React UMD cannot be imported into a module context.
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Page from '/use_server/Page.js';

const { React, ReactDOM } = window;
const { createElement: h } = React;
const { createRoot, hydrateRoot } = ReactDOM;

createRoot(document.body).render(h('div', null, 'Hello World!'));
// ReactDOM.hydrateRoot(document, h(Page));