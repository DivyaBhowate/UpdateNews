import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with your Currents API key
  const API_KEY = "7yK9LG7O42PWgBlBfVtNyjNL8m0pGVj0YOxIh49jU2QgQfIw";
  const API_URL = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;

  useEffect(() => {
    // Fetch data from Currents API
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data.news);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_URL]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div className="container">
      <h2 className="heading">Latest News</h2>
      {news.map((article) => (
        <a href={article.url} className="news-article" key={article.id}>
          <h2 className="title">{article.title}</h2>
          <p className="des">{article.description}</p>
          <img src={article.image} alt="" />
          <a href={article.url} className="link" target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <p className="published"><strong>Published:</strong> {new Date(article.published).toLocaleString()}</p>
        </a>
      ))
      }

    </div>

  );
};

export default App;
