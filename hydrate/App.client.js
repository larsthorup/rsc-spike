import { createElement as h, useState, useEffect } from "./react.js";

export function ThemeSwitcher({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const color = isDarkTheme ? "#fff" : "#333";
  const backgroundColor = isDarkTheme ? "#333" : "#fff";
  useEffect(function initializeTheme() {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkTheme(prefersDark);
  }, []);
  const onChange = (checked) => {
    setIsDarkTheme(checked);
  };
  return h(
    "div",
    { style: { color, backgroundColor } },
    h(Checkbox, {
      onChange,
      checked: isDarkTheme,
    }),
    h("div", {}, children)
  );
}

export function UpvoteButton({ id, upvoted }) {
  const [isUpvoted, setIsUpvoted] = useState(upvoted);
  const onChanged = async (checked) => {
    const isUpvoted = checked;
    setIsUpvoted(isUpvoted);
    // await upvote(id, isUpvoted);
  };
  return h(Checkbox, {
    onChanged,
    checked: !!isUpvoted,
  });
}

export function Checkbox({ checked, onChange }) {
  const onClick = () => onChange && onChange(!checked);
  return h("span", {
    onClick,
  }, checked ? "\u2611" : "\u2610");
}
