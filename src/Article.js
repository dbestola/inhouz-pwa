import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticle } from "./api";
import "./Article.css";

const Article = ({ initialData }) => {
  const [article, setArticle] = useState(
    initialData || window.__PRELOADED_STATE__
  );
  const { id } = useParams();
  
  useEffect(() => {
    if (!article) {
      setArticle({ title: 'Loading...', content: 'Please wait while the content loads.' })

      setTimeout(() => {
        fetchArticle(id).then((data) => setArticle(data));
      },2000) // timeout to show client api fetch

    }
    delete window.__PRELOADED_STATE__; // Clean up the preloaded state after hydration
  }, []);

  return (
    <div className="article container">
      <Link to="/">Back</Link>
      <header className="article-header">
        <h1>{article?.title}</h1>
      </header>
      <section className="article-content">
        <p>{article?.content}</p>
      </section>
    </div>
  );
};

export default Article;
