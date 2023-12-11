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
    const news = await response.data;
    console.log(news);
    setNews(news);
  } catch (error) {
    setError('Failed to fetch news'); // Update error state with a descriptive message
    console.error('Error fetching news:', error); // Log the error for debugging
  }
}
   // Function to handle input change
   const handleInputChange = (e) => {
    setNews(e.target.value);
  };

  return (
    <div>
      <h1>Get News!</h1>
        
        {/* Form for input */}
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
        news.map((news, index) => (
          <div key={index}>
            <h3>{news.title}</h3>
            {/* Display other recipe details as needed */}
            <p>{news.description}</p>
            {/* For example, display image */}
            <p>{news.author}</p>     
            <p>{news.content}</p>         
    
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
