import React, { useState } from 'react';
import axios from 'axios';

function GetRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get('http://your-backend-url/get_recipes', {
        params: { ingredients },
      });

      if (response.status === 200) {
        setRecipes(response.data);
      } else {
        setError('Failed to fetch recipes');
      }
    } catch (error) {
      setError('Error fetching recipes');
    }
  };

  return (
    <div>
      <h1>Get Recipes</h1>
      <input
        type="text"
        placeholder="Enter ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleGetRecipes}>Get Recipes</button>

      {error && <p>{error}</p>}

      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {/* Display other recipe details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetRecipes;
