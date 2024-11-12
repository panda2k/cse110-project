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
            <Link to="/clubrsvp">Club test</Link>
        </nav>
      </header>
      <Routes>
          {/* To add a view to the website, go to the routes.tsx file in the constants directory, and add an entry to the array defined in the file.*/}
          {routes.map((route) => (<Route path={route.path} element={route.element}/>))}
      </Routes>
    </div>
  );
}

export default App;
