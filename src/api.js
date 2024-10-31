export const fetchArticle = async (id) => {
  // Mock data based on article ID

  try {
    const response = await fetch("https://backendserviceworker.onrender.com/article")
    const articles = await response.json()

    return articles[id] || { title: "Article not found", content: "" };
  } catch (error) {
    console.error(error)
    return { title: "An Error occured", content: error?.message };
  }


};
