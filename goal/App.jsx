function App() {
  "use server";
  return (
    <ThemeSwitcher>
      <Header />
      <NewsList />
    </ThemeSwitcher>
  );
}

function Header() {
  "use server";
  return <header>Latest news</header>;
}

async function NewsList() {
  "use server";
  const news = await loadNews();
  return (
    <ul>
      {news.map((item) => (
        <li key={item.id}>
          <UpvoteButton id={item.id} upvoted={item.upvoted} />
          <b>{item.title}</b>
          {item.description}
        </li>
      ))}
    </ul>
  );
}

async function loadNews() {
  "use server";
  return Promise.resolve([
    {
      id: "1",
      title: "Tracy Chapman wins country song of the year",
      description: "Chapman is first Black songwriter to win the award.",
    },
    {
      id: "2",
      title: "Yoko Ono: her 20 greatest songs",
      description: "We appraise the best of a bold artist",
    },
  ]);
}

async function upvote(id, upvoted) {
  "use server";
  console.log({ id, upvoted });
}

////////////////////////

function ThemeSwitcher({ children }) {
  "use client";
  const [theme, setTheme] = useState("dark");
  const color = theme === "dark" ? "#fff" : "#333";
  const backgroundColor = theme === "dark" ? "#333" : "#fff";
  useEffect(function initializeTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);
  return (
    <body style={{ color, backgroundColor }}>
      <input
        type="checkbox"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        checked={theme === "dark"}
      />
      <div>{children}</div>
    </body>
  );
}

function UpvoteButton({ id, upvoted }) {
  "use client";
  const [upvoted, setUpvoted] = useState(upvoted);
  const onClick = async () => {
    const isUpvoted = !upvoted;
    setUpvoted(isUpvoted);
    await upvote(id, isUpvoted);
  };
  return <input type="checkbox" onClick={onClick} checked={upvoted} />;
}
