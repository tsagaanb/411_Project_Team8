import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginButton from "./components/login"; 
import { gapi } from "gapi-script";

const clientId = "312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com";

export default function App() {
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
    <div className="App">
      <Navbar />
      <h1>Food Diary</h1>
      <h2>Input your ingredients and choose your recipe</h2>

      {/* Login Form */}
      <div className="login-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <LoginButton />
      </div>
    </div>
  );
}
