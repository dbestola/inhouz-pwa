export const fetchArticle = async (id) => {
  // Mock data based on article ID
  const articles = {
    1: {
      title: "Razzle and SSR",
      content: "Learn how to use Razzle with SSR.",
    },
    2: {
      title: "Preloading State with Razzle",
      content: "Learn how to preload state in Razzle apps.",
    },
  };

  return articles[id] || { title: "Article not found", content: "" };

};
