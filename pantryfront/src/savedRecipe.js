import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './savedRecipe.css';
import Navbar from './components/Navbar';

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleGetSavedRecipes = async () => {
    try {
      // Make a GET request to fetch the user's saved recipes
      const response = await axios.get('http://127.0.0.1:8000/backend/get_saved_recipes/');
      const savedRecipeData = await response.data;
      setSavedRecipes(savedRecipeData);
    } catch (error) {
      setError('Failed to fetch saved recipes');
      console.error('Error fetching saved recipes:', error);
    }
  };

  const handleSaveRecipe = async (recipeId) => {
    try {
      // Make an API call to save the recipe
      const response = await axios.post(`http://127.0.0.1:8000/backend/save_recipe/${recipeId}/`);
      console.log(response.data); // Handle success or error response

      // Refresh the saved recipes after saving
      handleGetSavedRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  useEffect(() => {
    // Fetch saved recipes when the component mounts
    handleGetSavedRecipes();
  }, []);

  return (
    <div className="recipe-container">
        <Navbar />
      <h1>Saved Recipes</h1>

      {error && <p>{error}</p>}

      <div className="recipe-container">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe, index) => (
            <div key={index} className="recipe-item">
              <div className="recipe-details">
                <h3 className="recipe-title">{recipe.recipe_name}</h3>
                <p className="recipe-instructions">{recipe.instructions}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No saved recipes found</p>
        )}
      </div>
    </div>
  );
}

export default SavedRecipe;
