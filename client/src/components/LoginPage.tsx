import React, { CSSProperties, useState, useContext } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import TapeTopLeft from '../assets/Tape_top_left.png';
import TapeTopRight from '../assets/Tape_top_right.png';
import TapeBottomLeft from '../assets/Tape_bot_left.png';
import TapeBottomRight from '../assets/Tape_bot_right.png';
import LogoHB2 from '../assets/LogoHB2.webp';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [view, setView] = useState('main');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedType, setSelectedType] = useState<'student' | 'organization'>('student'); // Default to 'student'

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, type: selectedType }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        // Redirect based on user type after signup
        if (selectedType === 'student') {
          navigate('/user-homepage');
        } else {
          navigate('/club-page');
        }
      } else {
        setErrorMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Error connecting to the server.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        // Redirect based on user type
        if (data.userType === 'student') {
          navigate('/user-homepage');
        } else {
          navigate('/club-page');
        }
      } else {
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error connecting to the server.');
    }
  };

  const handleGoogleSignup = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;

      const response = await fetch('http://localhost:8080/api/auth/google-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, type: selectedType }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        // Redirect based on user type after Google signup
        if (selectedType === 'student') {
          navigate('/user-homepage');
        } else {
          navigate('/club-page');
        }
      } else {
        setErrorMessage(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Error during Google signup:', error);
      setErrorMessage('Error connecting to the server.');
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;

      const response = await fetch('http://localhost:8080/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, type: selectedType }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        // Redirect based on user type
        if (selectedType === 'student') {
          navigate('/user-homepage');
        } else {
          navigate('/club-page');
        }
      } else {
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setErrorMessage('Error connecting to the server.');
    }
  };

  const renderMainOptions = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Welcome!</h2>
      <button style={styles.button} onClick={() => setView('loginSelection')}>Log In</button>
      <button style={styles.button} onClick={() => setView('signupSelection')}>Sign Up</button>
    </div>
  );

  const renderLoginSelection = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Login</h2>
      <p style={styles.subtitle}>Are you a Student or an Organization?</p>
      <button style={styles.button} onClick={() => { setSelectedType('student'); setView('login'); }}>Student</button>
      <button style={styles.button} onClick={() => { setSelectedType('organization'); setView('login'); }}>Organization</button>
      <button style={styles.backButton} onClick={() => setView('main')}>Back</button>
    </div>
  );

  const renderLoginForm = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Log In</h2>
      <input
        type="text"
        placeholder="Username"
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button style={styles.button} onClick={handleLogin}>Log In</button>
      <p style={styles.orText}>OR</p>
      <GoogleLoginButton accountType={selectedType} onSuccess={handleGoogleLogin} />
      <button style={styles.backButton} onClick={() => setView('main')}>Back</button>
    </div>
  );

  const renderSignupSelection = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Sign Up</h2>
      <p style={styles.subtitle}>Are you a Student or an Organization?</p>
      <button style={styles.button} onClick={() => { setSelectedType('student'); setView('signupForm'); }}>Student</button>
      <button style={styles.button} onClick={() => { setSelectedType('organization'); setView('signupForm'); }}>Organization</button>
      <button style={styles.backButton} onClick={() => setView('main')}>Back</button>
    </div>
  );

  const renderSignUpForm = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Sign Up</h2>
      <p style={styles.subtitle}>Sign up as a {selectedType === 'student' ? 'Student' : 'Organization'}</p>
      <input
        type="text"
        placeholder="Username"
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Re-enter Password"
        style={styles.input}
      />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button style={styles.button} onClick={handleSignup}>Sign Up</button>
      <p style={styles.orText}>OR</p>
      <GoogleLoginButton accountType={selectedType} onSuccess={handleGoogleSignup} />
      <button style={styles.backButton} onClick={() => setView('signupSelection')}>Back</button>
    </div>
  );

  return (
    <div style={styles.background}>
      {view === 'main' && renderMainOptions()}
      {view === 'login' && renderLoginForm()}
      {view === 'loginSelection' && renderLoginSelection()}
      {view === 'signupSelection' && renderSignupSelection()}
      {view === 'signupForm' && renderSignUpForm()}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  paper: {
    width: '300px',
    padding: '30px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center' as CSSProperties['textAlign'],
    position: 'relative',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#000',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  orText: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
  tapeTopLeft: {
    position: 'absolute',
    top: '-40px',
    left: '-60px',
    width: '150px',
    height: 'auto',
  },
  tapeTopRight: {
    position: 'absolute',
    top: '-40px',
    right: '-55px',
    width: '150px',
    height: 'auto',
  },
  tapeBottomLeft: {
    position: 'absolute',
    bottom: '-40px',
    left: '-60px',
    width: '150px',
    height: 'auto',
  },
  tapeBottomRight: {
    position: 'absolute',
    bottom: '-50px',
    right: '-65px',
    width: '150px',
    height: 'auto',
  },
  backButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FF8C00', // dark orange color
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default LoginPage;
