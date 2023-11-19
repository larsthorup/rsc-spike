export function createElement(type, props = {}, ...children) {
  return {
    $$typeof: Symbol.for("react.element"),
    type,
    props: { ...props, children },
    ref: null,
  };
}

export function useState(initialValue) {
  // Note: server version
  return [initialValue, () => {}];
}

export function useEffect(callback, dependencies) {
  // Note: server version
}