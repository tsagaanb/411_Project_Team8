import React, { useState } from 'react';
import axios from 'axios';
import './getRecipe.css'; // Importing the CSS file for styling

function GetRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}`);
      const recipeData = response.data;

      // Sort recipes by likes (descending order)
      recipeData.sort((a, b) => b.likes - a.likes);

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
      
      // Check if the response indicates success (status code 2xx)
      if (response.status === 200 || response.status === 201) {
        console.log('Recipe saved successfully:', response.data);
        
        // Display a message to the user
        setSavedMessage('Recipe saved successfully');
        
        // Update the recipe's status to indicate it's saved
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === recipeId ? { ...recipe, saved: true } : recipe
          )
        );
      } else {
        console.error('Failed to save recipe. Unexpected response:', response);
        
        // Display an error message to the user
        setSavedMessage('Error saving recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      
      // Display an error message to the user
      setSavedMessage('Error saving recipe. Please try again.');
    }
  };
  
  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  return (
    <div className="recipe-container" style={{ color: 'black' }}>
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
      {savedMessage && <p style={{ color: 'black' }}>{savedMessage}</p>}

      <div className="recipe-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
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
                <button onClick={() => handleSaveRecipe(recipe.id)} disabled={recipe.saved}>
                  {recipe.saved ? 'Saved' : 'Save Recipe'}
                </button>
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
