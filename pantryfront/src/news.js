import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './news.css';

function GetNews() {
  const defaultKeyword = 'Food'; // Default keyword
  const [keywords, setKeywords] = useState(defaultKeyword); // State for entered keywords
  const [news, setNews] = useState([]); // State to store fetched news articles
  const [error, setError] = useState(''); // State to handle errors

  // Function to fetch news articles based on provided keywords
  const handleGetNews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/backend/get_news/?keywords=${keywords}`);
      const newsData = await response.data;
      setNews(newsData.articles || []);
    } catch (error) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setKeywords(e.target.value);
  };

  useEffect(() => {
    // Fetch news articles related to the default keyword when component mounts
    setKeywords(defaultKeyword);
    handleGetNews();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div className="news-container">
      <h1>Get News! (Change the keyword to get news on other topics)</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetNews();
        }}
      >
        <input
          type="text"
          placeholder="Enter keywords or phrases"
          value={keywords}
          onChange={handleInputChange}
        />
        <button type="submit">Get News</button>
      </form>


      {error && <p>{error}</p>}

      <div className="articles-container">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="article">
              <h3>{article.title}</h3>
              {article.author && <p><b>Author: </b> {article.author}</p>}
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              <br />
              <br />

              {article.urlToImage && (
                <img src={article.urlToImage} alt="Article" style={{ width: '400px', height: 'auto' }} />
              )}
            </div>
          ))
        ) : (
          <p>No news found</p>
        )}
      </div>
    </div>
  );
}

export default GetNews;
