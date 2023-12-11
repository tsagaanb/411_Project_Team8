import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Homepage from './homepage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GetRecipes from "./getRecipe";

const root = document.getElementById('root');

// Use createRoot for React 18
const RootComponent = (
    <Router>

        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/getRecipe" element={<GetRecipes />} />
        </Routes>
    </Router>
);

ReactDOM.createRoot(root).render(RootComponent);
