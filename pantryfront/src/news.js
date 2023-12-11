import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //using router dom so that it brings us to a different page 


// url of api info: http://127.0.0.1:8000/backend/get_recipes/?ingredients=cheese,bread,ham


function GetNews() {
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetNews = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}') // change this with the news api
     
      if (response.status === 200) {
        setRecipes(response.data);

        // Redirect to a new URL
        navigate.push(`/backend/get_recipes/?ingredients=${encodeURIComponent(ingredients)}`); //change this with the news api

      } else {
        setError('Failed to fetch news');
      }
    } catch (error) {
      setError('Error fetching news');
    }
  };

   // Function to handle input change
   const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <h1>Food News</h1>
        
        {/* Form for input */}
        <form onSubmit={handleGetNews}>
          <input
            type="text"
            placeholder="Enter a keyword"
            value={keyword}
            onChange={handleInputChange}
          />
      <button type="submit">Get News</button>
        </form> 

      {error && <p>{error}</p>}

      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            {/* Display other recipe details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetRecipes;
