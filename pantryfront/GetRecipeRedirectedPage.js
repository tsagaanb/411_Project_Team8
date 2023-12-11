import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function RedirectedPage() {
    const [ingredients, setIngredients] = useState('');
    const history = useHistory();


    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSearch = () => {
        // Check if ingredients are not empty before redirecting
        if (ingredients.trim() !== '') {
          // Build the URL with the entered ingredients
          const searchUrl = `'http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}`;
        
          // Redirect the user to the new URL
          history.push(searchUrl);
        }else {
            // Optionally, provide feedback to the user if ingredients are empty
            alert('Please enter ingredients before searching.');
          }
    };

    return (
        <div>
          <h1>Search for Recipes</h1>
          <p>Enter ingredients to find recipes:</p>
          
          {/* Controlled input for ingredients */}
          <input
            type="text"
            placeholder="Enter ingredients..."
            value={ingredients}
            onChange={handleInputChange}
          />
    
          {/* Button to trigger the search */}
          <button onClick={handleSearch}>Search</button>
    
          {/* Display other content as needed */}
        </div>
      );


}
export default RedirectedPage;