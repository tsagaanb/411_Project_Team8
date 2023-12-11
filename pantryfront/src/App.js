import React, { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./login";
import { gapi } from "gapi-script";
import logo from "./components/Images/smallerLogo.png";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      setIsAuthenticated(isSignedIn);
      // Rest of your logic based on authentication status...
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleLogout = () => {
    // Perform logout action here
    // For Google sign-out, you can use something like:
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsAuthenticated(false);
      // Other actions after logout...
    });
  };

  return (
    <Router>
      <div className="App">
      <a href="/" className="App-logo"> {/* Adjust padding as needed */}
          <img src={logo} alt="" style={{ width: '550px', height: 'auto' }} />
        </a>
        <p>
          <b>Pantry Wizard is a web application that takes in ingredients from the user and returns </b>
        </p>
        <p><b>recipes that use ingredients using the Spoonacular API. Pantry Wizard also provides </b></p>
        <p><b>users with updated news related to the food world all over the globe using the NEWS API.</b></p>
        <div className="login-form">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Routes>
                <Route exact path="/" element={<LoginButton />} />
                <Route path="/homepage" element={<Homepage />} />
              </Routes>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </Router>
  );
}
