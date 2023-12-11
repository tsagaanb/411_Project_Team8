//import React, { useState, useEffect } from "react";
import "./App.css";
//import LoginButton from "./login"; 
//import { gapi } from "gapi-script";
import logo from "./components/Images/smallerLogo.png"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//import axios from "axios";


//const clientId = "312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com";

const App = () => {
  const handleLoginSuccess = ({code}) => {
    console.log('Login succsful', code);
  };
  /*
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
*/
  return (
    <div className="App">
      <a href="/" className="App-logo">
          <img src={logo} alt="" style={{ width: '600px', height: 'auto' }}/>
        </a>
      
      <p><b>
        Pantry Wizard is a web application that takes in ingredients from the user  <br></br>
        and returns recipes that uses to ingredients using the Spoonacular API.<br></br>
        Pantry Wizard also provides users with updated news related to the<br></br>
        food world all over the globe using NEWS API.
        </b>
      </p>

      <h2>Login below</h2>

      {/* Login Form */}
          <div className="login-form">
            <GoogleOAuthProvider clientId="312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={() => {
                  console.log('Login successful');
                  window.location.href ='/homepage'; // Redirect to the homepage after login
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
      </div>
    );
  }
  export default App;