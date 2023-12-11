import React from 'react';
import './homepage.css';
//import Navbar from './components/Navbar';

function Homepage() {
  
  return (
    <div>
    <div className="homepage">
      <h1>Welcome to Pantry Wizard</h1>
      <div className="button-container">
        <button onClick={() => console.log('Enter Ingredients clicked')}>
          Get Recipes
        </button>
        <button onClick={() => console.log('Saved Recipes clicked')}>
          Saved Recipes
        </button>
      </div>
    </div>
    </div>
  );
}

export default Homepage;