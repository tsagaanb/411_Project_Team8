import React from "react";
import "./Navbar.css";

function Navbar(){
  return(
    <>
      <nav>
        <a href="/" className="Navbar-logo">
          <img src="./Image/logo.jpg"/>
        </a>
        <div>
          <ul id ="navbar">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="index.html">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default Navbar;