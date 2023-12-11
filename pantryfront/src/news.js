import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom'; //using router dom so that it brings us to a different page 


// url of api info: http://127.0.0.1:8000/backend/get_recipes/?ingredients=cheese,bread,ham


function GetNews() {
  const [keywords, setKeywords] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  //const navigate = useNavigate();
  const handleGetNews = async () => {

  try {
    const response = await axios.get(`http://127.0.0.1:8000/backend/get_news/?keywords=${keywords}`);
      const newsData = await response.data;
      console.log(newsData); // Log the received news data
      setNews(newsData.articles || []); // Update the 'news' state with articles array from response or an empty array if 'articles' is not present
    } catch (error) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', error);
    }
}
   // Function to handle input change
   const handleInputChange = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div>
        <h1>Get News!</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleGetNews();
      }}>
        <input
          type="text"
          placeholder="Enter keywords or phrases"
          value={keywords}
          onChange={handleInputChange}
        />
        <button type="submit">Get News</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        {news.length > 0 ? (
          news.map((articles, index) => (
            <div key={index}>
              <h3>{articles.title}</h3>
              <p>{articles.description}</p>
              <p>{articles.author}</p>
              <p>{articles.content}</p>
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
