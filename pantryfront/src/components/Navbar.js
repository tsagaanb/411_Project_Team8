import React from "react";
import "./Navbar.css";
import logo from "./Images/logo.png";

function Navbar(){
  return(
    <>
      <nav>
        <a href="/" className="Navbar-logo">
          <img src={logo} alt="" style={{ width: '100px', height: 'auto' }}/>
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