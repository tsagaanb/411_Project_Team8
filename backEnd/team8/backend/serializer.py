
#Serializers are basically used to convert complex data to native Python datatypes that can then be easily rendered 
#into JSON(Which we are going to use in React#

#for connecting front to backend
from rest_framework import serializers 
from . models import React

"""
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Header from './components/Header';
import './App.css';
import './scss/main.scss';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

// Importing ReactSerializer from your backend
import { ReactSerializer } from './path-to-your-serializer';  // Replace 'path-to-your-serializer' with the actual path

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);

  // Sample useEffect to fetch user data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-backend-api-endpoint');  // Replace 'your-backend-api-endpoint' with the actual API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <NavigationBar />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {userData && (
          <p>
            User Name: {userData.User_name}, Email: {userData.User_email}
          </p>
        )}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer />
    </>
  );
}

export default App;
"""


class ReactSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = React 
        fields = ['name', 'detail']

        