import React, { useState } from 'react';
import axios from 'axios';
import './getRecipe.css'; // Importing the CSS file for styling
import Navbar from './components/Navbar';

function GetRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}`);
      let recipeData = await response.data;
      // Sort recipes by likes (descending order)
      recipeData.sort((a, b) => b.likes - a.likes);
      console.log(recipeData);
      setRecipes(recipeData);
    } catch (error) {
      setError('Failed to fetch recipes');
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSaveRecipe = async (recipeId) => {
    try {
      // Make an API call to save the recipe
      const response = await axios.post(`http://127.0.0.1:8000/backend/save_recipe/${recipeId}/`);
      console.log(response.data); // Handle success or error response
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };


  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  return (
    <div className="recipe-container" style={{ color: 'black' }}>
      <Navbar />
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
              <div className="recipe-details">
                <h3 className="recipe-title">{recipe.title}</h3>
                {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image" />}
                {recipe.likes && <p className="recipe-likes"><b>Likes: </b> {recipe.likes}</p>}
              </div>
              <div className="recipe-ings">
                <h2>Ingredients:</h2>
                <ul>
                  {recipe.usedIngredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.amount} {ingredient.unit} - {ingredient.name}
                    </li>
                  ))}
                </ul>
                <ul>
                  {recipe.missedIngredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.amount} {ingredient.unit} - {ingredient.name}
                    </li>
                  ))} 
                </ul>
                <button onClick={() => handleSaveRecipe(recipe.id)}>Save Recipe</button>
              </div>
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
