import React from 'react';
import './homepage.css';
import Navbar from './components/Navbar';

function Homepage() {
  
  return (
    <div>
      <Navbar />
      <div className="homepage">
        <h1>Welcome to Pantry Wizard</h1>
        <div className="button-container">
        <button onClick={() => window.location.href = '/savedRecipe'}>
          Saved Recipes
        </button>
        <button onClick={() => window.location.href = '/getRecipe'}>
          Get Recipes
        </button>
        <button onClick={() => window.location.href = '/news'}>
          Food News
        </button>
        </div>
      </div>
      <div>
      <p><b>
        Click on the "Saved Recipes" button to retrieve your saved recipes. <br></br>
        Click on the "Get Recipes" button to input ingredients and get a recipe.<br></br>
        Click on the "Food News" button to get news updates on the food universe.<br></br>
        </b>
      </p>
      </div>
    </div>
    
  );
}

export default Homepage;