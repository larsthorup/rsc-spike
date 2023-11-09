// client components

class ThemeSwitcher {
  constructor(element) {
    // mount
    this.element = element;
    this.theme = "dark";
    this.inputElement = element.querySelector('input');
    this.inputElement.onclick = () => this.setTheme(this.theme === "dark" ? "light" : "dark");
  }
  setTheme(theme) {
    this.theme = theme;
    this.reconcile();
  }
  reconcile() {
    const backgroundColor = this.theme === "dark" ? "#333" : "#fff";
    this.element.style.backgroundColor = backgroundColor;
  }
}

// hydrateRoot(document.body, <App />)
const themeSwitcher = new ThemeSwitcher(document.body);

console.log('hydration completed');