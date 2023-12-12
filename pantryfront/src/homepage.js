import React, { useState } from 'react';
import './homepage.css';
import Navbar from './components/Navbar';
import axios from 'axios';



function Homepage() {

    const [userName, setUserName] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInputChange = (event) => {
      setUserName(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/backend/save_user_name/', { name: userName });
        if (response.status === 200 || response.status === 201) {
          setSubmitStatus('Name saved successfully!');
        } else {
          setSubmitStatus('Failed to save name.');
        }
      } catch (error) {
        console.error('Error saving name:', error);
        setSubmitStatus('Error saving name. Please try again.');
      }
    };


  return (
    <div>
      <Navbar />
      <div className="homepage">
        <h1>Welcome to Pantry Wizard</h1>
        
        
        
        <div className="button-container">
        
        <button onClick={() => window.location.href = '/getRecipe'}>
          Get Recipes
        </button>
        <button onClick={() => window.location.href = '/news'}>
          Food News
        </button>
        </div>
        <br/>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={handleInputChange}
            />
            <button type="submit">Save Name</button>
          </form>
          {submitStatus && <p>{submitStatus}</p>}
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