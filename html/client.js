// global settings

// View requests at https://public.requestbin.com/r/end47s2p1z8nj
const baseUrl = 'https://end47s2p1z8nj.x.pipedream.net';

// server action client functions

async function upvote(id, upvoted) {
  const body = JSON.stringify({ id, upvoted });
  await fetch(`${baseUrl}/upvote`, { method: 'POST', body });
}

// client components

class ThemeSwitcher {
  constructor(element, props) {
    // mount
    this.element = element;
    this.props = props;
    this.theme = "dark";
    this.inputElement = element.querySelector("input");
    this.inputElement.onclick = () =>
      this.setTheme(this.theme === "dark" ? "light" : "dark");
  }
  setTheme(theme) {
    this.theme = theme;
    this.reconcile();
  }
  reconcile() {
    const color = this.theme === "dark" ? "#fff" : "#333";
    const backgroundColor = this.theme === "dark" ? "#333" : "#fff";
    this.element.style.color = color;
    this.element.style.backgroundColor = backgroundColor;
    this.inputElement.checked = this.theme === "dark";
  }
}

class UpvoteButton {
  constructor(element, props) {
    // mount
    this.element = element;
    this.props = props;
    this.upvoted = props.upvoted;
    this.inputElement = element.querySelector("input");
    this.inputElement.onclick = () => this.onClick();
  }
  setUpvoted(upvoted) {
    this.upvoted = upvoted;
    this.reconcile();
  }
  async onClick() {
    const isUpvoted = !this.upvoted;
    this.setUpvoted(isUpvoted);
    await upvote(this.props.id, isUpvoted);
  }
  reconcile() {
    this.inputElement.checked = this.upvoted;
  }
}

// hydrateRoot(document.body, <App />)
new ThemeSwitcher(document.body, {});
new UpvoteButton(document.querySelectorAll("li")[0], {
  id: "1",
  upvoted: true,
});
new UpvoteButton(document.querySelectorAll("li")[1], {
  id: "2",
  upvoted: false,
});

console.log("hydration completed");
