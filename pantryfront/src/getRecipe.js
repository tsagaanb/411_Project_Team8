import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './getRecipe.css'; // Importing the CSS file for styling

function GetRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}`);
      const recipeData = await response.data;
      console.log(recipeData);
      setRecipes(recipeData);
    } catch (error) {
      setError('Failed to fetch recipes');
      console.error('Error fetching recipes:', error);
    }
  };

  React.useEffect(() => {
    handleGetRecipes();
  }, []);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  return (
    <div className="recipe-container">
      <h1>Get Recipes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetRecipes();
        }}
      >
        <input
          type="text"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={handleInputChange}
        />
        <button type="submit">Get Recipes</button>
      </form>

      {error && <p>{error}</p>}

      <div className="recipe-container">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3 className="recipe-title">{recipe.title}</h3>
            {recipe.image && (<img src={recipe.image} alt={recipe.title} className="recipe-image" />
        )}
            {recipe.original && <p className="recipe-ings"><b>Ingredients: </b> {recipe.original}</p>}

      </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
}

export default GetRecipes;
