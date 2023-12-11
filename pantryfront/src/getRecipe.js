import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //using router dom so that it brings us to a different page 


// url of api info: http://127.0.0.1:8000/backend/get_recipes/?ingredients=cheese,bread,ham


function GetRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/backend/get_recipes/?ingredients=${ingredients}`)
      const recipe = await response.data;
      console.log(recipe);
      setRecipes(recipe);

      if (response.status === 200) {
        setRecipes(response.data);

        // Redirect to a new URL
        navigate.push(`/backend/get_recipes/?ingredients=${encodeURIComponent(ingredients)}`);

      } else {
        setError('Failed to fetch recipes');
      }
    } catch (error) {
      setError('Error fetching recipes');
    }
  };
  React.useEffect(() => {
    handleGetRecipes();
  }, []);

   // Function to handle input change
   const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  return (
    <div>
      <h1>Get Recipes</h1>
        
        {/* Form for input */}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleGetRecipes();
        }}>
          <input
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={handleInputChange}
          />
      <button type="submit">Get Recipes</button>
        </form> 

      {error && <p>{error}</p>}

      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            {/* <p>{recipe.description}</p> */}
            {/* Display other recipe details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetRecipes;
