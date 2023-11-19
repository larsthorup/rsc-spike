export async function renderClientJsxFromServerJsx(jsx) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    jsx == null
  ) {
    // Don't need to do anything special with these types.
    return jsx;
  } else if (Array.isArray(jsx)) {
    // Process each item in an array.
    return Promise.all(jsx.map((child) => renderClientJsxFromServerJsx(child)));
  } else if (jsx != null && typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        // This is a component like <div />.
        // Go over its props to make sure they can be turned into JSON.
        return {
          ...jsx,
          props: await renderClientJsxFromServerJsx(jsx.props),
        };
      } else if (typeof jsx.type === "function") {
        // This is a custom React component (like <Footer />).
        // Call its function, and repeat the procedure for the JSX it returns.
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return renderClientJsxFromServerJsx(returnedJsx);
      } else throw new Error("Not implemented.");
    } else {
      // This is an arbitrary object (for example, props, or something inside of them).
      // Go over every value inside, and process it too in case there's some JSX in it.
      // Skip function props - they will have to be hydrated client-side
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx)
            .filter(([propName, value]) => typeof value !== "function")
            .map(async ([propName, value]) => [
              propName,
              await renderClientJsxFromServerJsx(value),
            ])
        )
      );
    }
  } else throw new Error("Not implemented");
}
