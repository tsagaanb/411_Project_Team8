import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root');

// Use createRoot for React 18
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<App />);
