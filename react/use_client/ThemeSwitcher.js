import { createElement as h, useState, useEffect } from "react";

export default function ThemeSwitcher({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const color = isDarkTheme ? "#fff" : "#333";
  const backgroundColor = isDarkTheme ? "#333" : "#fff";
  useEffect(function initializeTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkTheme(isDark);
  }, []);
  const onChange = (ev) => {
    setIsDarkTheme(ev.target.checked);
  };
  return h(
    "body",
    { style: { color, backgroundColor } },
    h("input", {
      type: "checkbox",
      onChange,
      checked: isDarkTheme,
    }),
    h("div", null, ...children)
  );
}
