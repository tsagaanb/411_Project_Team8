import React from 'react';
import './homepage.css';
import Navbar from './components/Navbar';


function Homepage() {
  return (
    <div className="homepage">
        <Navbar/>
      <h1>Welcome to Food Diary</h1>
      <div className="button-container">
        <button onClick={() => console.log('Enter Ingredients clicked')}>
          Enter Ingredients
        </button>
        <button onClick={() => console.log('Saved Recipes clicked')}>
          Saved Recipes
        </button>
      </div>
    </div>
  );
}

export default Homepage;
