import escapeHtml from "escape-html";

export async function renderHtmlFromJsx(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    // This is a string. Escape it and put it into HTML directly.
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    // This is an empty node. Don't emit anything in HTML for it.
    return "";
  } else if (Array.isArray(jsx)) {
    // This is an array of nodes. Render each into HTML and concatenate.
    return (await Promise.all(jsx.map((child) => renderHtmlFromJsx(child)))).join(
      ""
    );
  } else if (typeof jsx === "object") {
    // Check if this object is a React JSX element (e.g. <div />).
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        // Is this a tag like <div>?
        // Turn it into an an HTML tag.
        let html = "<" + jsx.type;
        for (const propName in jsx.props) {
          if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
            html += ` ${propName}="${renderProptoHtml(jsx, propName)}"`;
          }
        }
        html += ">";
        html += await renderHtmlFromJsx(jsx.props.children);
        html += "</" + jsx.type + ">";
        return html;
      } else if (typeof jsx.type === "function") {
        // Is it a component like <BlogPostPage>?
        // Call the component with its props, and turn its returned JSX into HTML.
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return await renderHtmlFromJsx(returnedJsx);
      } else throw new Error("Not implemented.");
    }
  } else throw new Error("Not implemented.");
}

function renderProptoHtml(jsx, propName) {
  const prop = jsx.props[propName];
  if (propName === "style" && typeof prop === "object") {
    const css = Object.entries(prop)
      .map(([prop, value]) => `${cssPropName(prop)}:${value}`)
      .join(";");
    return escapeHtml(css);
  } else {
    return escapeHtml(prop);
  }
}

function cssPropName(prop) {
  switch (prop) {
    case "backgroundColor":
      return "background-color";
    default:
      return prop;
  }
}
