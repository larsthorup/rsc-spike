// server components and server actions

function App() {
  return (
    <ThemeSwitcher>
      <Header />
      <NewsList />
    </ThemeSwitcher>
  );
}

function Header() {
  return <header>Latest news</header>;
}

async function NewsList() {
  const data = await fetchNews();
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <UpvoteButton id={item.id} upvoted={item.upvoted} />
          <b>{item.title}</b>
          {item.description}
        </li>
      ))}
    </ul>
  );
}

async function fetchNews() {
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

async function postUpvote(id, upvoted) {
  console.log(`${upvoted ? "Upvoting" : "Downvoting"} ${id}`);
}

// client components

function ThemeSwitcher({ children }) {
  const [theme, setTheme] = useState("dark");
  const backgroundColor = theme === "dark" ? "#333" : "#fff";
  return (
    <body style={{ backgroundColor }}>
      <input
        type="checkbox"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        checked={value === "dark"}
      />
      <div>{children}</div>
    </body>
  );
}

function UpvoteButton({ id, upvoted }) {
  const [upvoted, setUpvoted] = useState(upvoted);
  const onClick = async () => {
    const isUpvoted = !upvoted;
    setUpvoted(isUpvoted);
    await postUpvote(id, upvoted);
  };
  return <input type="checkbox" onClick={onClick} checked={upvoted} />;
}
