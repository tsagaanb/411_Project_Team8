// NavigationBar.jsx
import React from 'react';
import './NavigationBar.scss';

const NavigationBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
