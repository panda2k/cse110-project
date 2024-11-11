// src/App.tsx
import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import { Route, Routes, Link } from "react-router-dom";
import { routes } from '../constants/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
              <Link to="/">Home</Link> <Link to="/test">Test</Link>
          </nav>
          <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
          </Routes>
        </header>
      </div>
    </GoogleOAuthProvider>
=======
=======

>>>>>>> 17e5de94a9103904552036d60193b1a66c70bad1
    <div className="App">
      <header className="App-header">
        <nav>
            <Link to="/">Home</Link> <Link to="/test">Test</Link>
        </nav>
        <Routes>
            {/* To add a view to the website, go to the routes.tsx file in the constants directory, and add an entry to the array defined in the file.*/}
            {routes.map((route) => (<Route path={route.path} element={route.element}/>))}
        </Routes>
      </header>
    </div>
<<<<<<< HEAD
>>>>>>> main
=======

>>>>>>> 17e5de94a9103904552036d60193b1a66c70bad1
  );
}

export default App;
