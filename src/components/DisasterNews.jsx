import React, { useEffect, useState } from "react";

export default function DisasterNews() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const CSE_ID = process.env.REACT_APP_CSE_ID;
    const query = "India disaster news";


    const fetchNews = async () => {
      try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
          query
        )}&key=${API_KEY}&cx=${CSE_ID}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.items) {
          setArticles(data.items);
        } else {
          setError("No news found.");
        }
      } catch (err) {
        setError("Failed to fetch news.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: "1rem", margin: "1rem" }}>
      <h2>📰 Emergency News Updates</h2>

      {loading && <p>Loading news...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && articles.length === 0 && <p>No articles available.</p>}

      <ul>
        {articles.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <strong>{item.title}</strong>
            </a>
            <p>{item.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
