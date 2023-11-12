import { createElement as h } from "react";

export default async function NewsList() {
  const news = await loadNews();
  return h(
    "ul",
    null,
    news.map((item) =>
      h(
        "li",
        { key: item.id },
        // h(UpvoteButton, item),
        h("b", null, item.title),
        item.description
      )
    )
  );
}

async function loadNews() {
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
