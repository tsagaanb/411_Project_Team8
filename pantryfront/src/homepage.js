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
    </div>
  );
}

export default Homepage;