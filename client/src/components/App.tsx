import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import { Route, Routes, Link } from "react-router-dom"
import { routes } from '../constants/routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
            <Link to="/">Home</Link> <Link to="/test">Test</Link>
        </nav>
        <Routes>
            {/* Insert your Route Here */}
            {routes.map((route) => (<Route path={route.path} element={route.element}/>))}
        </Routes>
      </header>
    </div>
  );
}

export default App;
