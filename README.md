# rsc-spike

Experiment in implementing React Server Components without using a framework, a bundler or any other dependencies

Without React:

```bash
open html/index.html
```

With React:

```bash
(cd react && npm start)
```


- [x] [Without React](html/index.html)
  - [x] Pass server props to client components
  - [x] Server actions
- [ ] With client side React
  - [x] hydrateRoot
  - [ ] generate reactJSON
- [ ] With server side React
  - [x] Async server components
  - [x] Fetch "react" and "react-dom" UMD in client
  - [ ] Isomorphic way to `import from "react"`
  - [ ] Hydration
  - [ ] Client components

## Goals:

- [x] No dependencies but React
- [x] Example app
- [ ] One tree
- [x] Initial fetch contains pre-rendered HTML
- [x] Server components rendered on server
- [x] Server components not imported on client
- [ ] Importing client components switches to client rendering
- [ ] Client components re-renderes on client
- [x] Nesting client components in server components (upvote button)
- [x] Nesting server components in client components (top-level dark/light mode toggle)
- [x] Server components can access server resources (like database)
- [x] Server components can use heavy libs (like syntax highlighting)
- [x] Client components can access client resources (like click events)
- Testability

## Non goals

- Developer Experience
- Bundler
- TypeScript
- Tests

## Questions

- [x] How are server side props passed to client for hydration?
  - They are included in the serialized reactTree
- [x] Must the entire <App /> reactTree be sent to the browser, essentially duplicating the HTML? 
  - Yes!
- [x] How to include the *markup* but not the *event handler* in a client `<UpvoteButton />`?
  - We want to include the button to avoid layout shift
  - We want to postpone the button to avoid click before active
  - Can we use a headless pattern?
    - Parent: client component that has all event handlers and state
    - Child: server component with markup
  - The server simply also renders client components
- [x] How is a server action invocation serialized to a request and a response?
  - Generate an async client function that calls fetch()
  - Wrap the server action with an API end-point handler
- [x] How to render an async server component?
  - Use renderToPipeableStream
  - Use react@18.3
- [x] Can client components import server actions
  - Yes
  - So only server components ("use server" functions that return React.Element) is prevented from being called from "use client" functions
- [ ] Why must the client bootstrap script import all server components to hydrate?
  - Seems to load too much JS code to the client...?
- [x] Why is there no react-dom/client UMD build?
  - Loading react-dom gives "React.Scheduler is undefined"
  - https://github.com/facebook/react/issues/27675
  - Fixed by reverting to v18.3.0-canary-d6dcad6a8-20230914
- [x] Why is top-level "this" undefined when importing a UMD bundle from a module?
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#global_context
  - This is by design
- [ ] How to make `import from "react"` isomorphic?
  - For hydration client side we import Page which imports "react"
  - No way to inject `<script type="importmap">` into the react stream 
  - Client components must be isomorphic as the run on both client and server

## RSC

- [ ] RSC bundler creates bundle with client components and server action client functions
- [x] RSC server run top server component (App) to build reactTree
- [ ] RSC server render client components gets placeholders?
- [x] RSC server render reactTree to HTML
- [ ] RSC server serialize reactTree to reactJSON
- [ ] RSC server embeds reactJSON in HTML
- [ ] RSC server embeds `<script>` link to RSC client in HTML
- [ ] RSC server embeds `<script>` link to client component bundle in HTML
- [x] RSC server respond with HTML
- [x] Browser renders HTML
- [ ] Browser loads RSC client
- [ ] RSC client derializes reactJSON into reactTree
- [ ] RSC client hydrates DOM with reactTree
- [ ] Browser imports client components from bundle
- [ ] RSC client instantiates the placeholder client components
- [ ] Browser imports server action client functions from bundle
- server action client function sends request to the server
- [ ] RSC server routes request to server action


## Inspiration

Videos:

- [Simplifying Server Components by Mark Dalgleish](https://portal.gitnation.org/contents/simplifying-server-components) 
- [React from another dimension by Dan Abramov](https://youtu.be/zMf_xeGPn6s)


Blogs:

- [Server Side Rendering without a framework by Paul Scanlon](https://thenewstack.io/how-to-build-a-server-side-react-app-using-vite-and-express/)
- [React Server Components, without a framework? by Tim Pillard](https://timtech.blog/posts/react-server-components-rsc-no-framework/)
  - Built on top of "react-server-dom-webpack"
- [ RSC From Scratch. Part 1: Server Components by Dan Abramov](https://github.com/reactwg/server-components/discussions/5)