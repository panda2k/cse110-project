// src/App.tsx
import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import { Route, Routes, Link } from "react-router-dom";
import { routes } from '../constants/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <GoogleOAuthProvider clientId="1099337102933-5icef0mas6rao5bsn07iubaaqhpde7f5.apps.googleusercontent.com">
      <AuthProvider>
        <div className="App">
          <header className="App-header">
            <nav>
              <Link to="/">Home</Link> <Link to="/test">Test</Link>
            </nav>
          </header>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

// import React from 'react';
// import UserHomepage from './student_user/UserHomepage';
// import ClubPage from './student_org/ClubPage';

// function App() {
//   return <UserHomepage />;
// }

// export default App;