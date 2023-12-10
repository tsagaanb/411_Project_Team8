import React, { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./login"; 
import { gapi } from "gapi-script";
import logo from "./components/Images/smallerLogo.png"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './homepage'; 

const clientId = "312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email profile", // Specify the scopes you need
      });

      // Listen for sign-in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);

      // Handle the initial sign-in state
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }
    

    function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        setIsAuthenticated(isSignedIn);
        // User is signed in, update your UI or perform actions accordingly
        console.log("User is signed in");

      } else {
        // User is signed out, update your UI or perform actions accordingly
        console.log("User is signed out");
      }
    }

    gapi.load("client:auth2", start);


    
  }, []);

  return (
    <Router>

    <div className="App">
      <a href="/" className="App-logo">
          <img src={logo} alt="" style={{ width: '600px', height: 'auto' }}/>
        </a>
      <p><b>
        Pantry Wizard is a web application that takes in ingredients from the user and returns 
        </b>
      </p>
      <p><b>
      recipes that uses to ingredients using the Spoonacular API. Pantry Wizard also provides 
      </b>
      </p>
      <p><b>
      users with updated news related to the food world all over the globe using NEWS API.
      </b>
      </p>
      <p>


      </p>
      <h2>Login below</h2>

      {/* Login Form */}
      <div className="login-form">
        <LoginButton />
      </div>
      <Routes>
          <Route exact path="/" component={LoginButton} />
          {isAuthenticated ? (
            <Route path="/homepage" element={<Homepage />} />
          ) : (
            <Route path="*" element={null} />
          )}
          {/* not sure how this is supposed to work, the home page keeps appearing
              on the bottom even if the user is not logged in.
              But when i delete the line above, it says homepage cannot be found.*/}
        </Routes>
    </div>
    </Router>

  );
}
