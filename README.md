# rsc-spike

Experiment in implementing React Server Components without using a framework

```bash
open html/index.html
```


- [x] [Without React](html/index.html)
  - [ ] Pass server props to client components
- [ ] With React

## Goals:

- [x] Example app
- [ ] One tree
- [x] Initial fetch contains pre-rendered HTML
- [x] Server components rendered on server
- [x] Server components not imported on client
- [ ] Importing client components switches to client rendering
- [ ] Client components renderes on client
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

- How are server side props passed to client for hydration?
- Must the entire <App /> reactTree be sent to the browser, essentially duplicating the HTML? 
- How to include the *markup* but not the *event handler* in a client `<UpvoteButton />`?
  - We want to include the button to avoid layout shift
  - We want to postpone the button to avoid click before active
  - Can we use a headless pattern?
    - Parent: client component that has all event handlers and state
    - Child: server component with markup
  - Will the server simply also render client components?
- How is a server action invocation serialized to a request and a response?

## RSC

- RSC bundler creates client component bundle
- RSC server run top server component (App) to build reactTree
  - (client components gets placeholders)
- RSC server serialize reactTree to reactJSON
- RSC server render reactTree to HTML
- RSC server embeds `<script>` link to RSC client in HTML
- RSC server embeds reactJSON in HTML
- RSC server respond with HTML
- RSC client derializes JSON
- RSC client builds reactTree
- RSC client hydrates DOM with reactTree
- RSC client loads client component bundle
- RSC client imports client comoponents from bundle
- RSC client instantiates the placeholder client components
- server actions??

## Inspiration

Videos:

- [Simplifying Server Components by Mark Dalgleish](https://portal.gitnation.org/contents/simplifying-server-components) 

Blogs:

- [Server Side Rendering without a framework by Paul Scanlon](https://thenewstack.io/how-to-build-a-server-side-react-app-using-vite-and-express/)