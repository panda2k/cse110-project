// src/App.tsx
import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import { Route, Routes, Link } from "react-router-dom";
import { routes } from '../constants/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="281005346216-595e2iv07jrpjkshv6j0stmhnfj1rqh5.apps.googleusercontent.com">
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
  );
}

export default App;
