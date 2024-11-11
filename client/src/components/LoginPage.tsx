import React, { CSSProperties, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import TapeTopLeft from '../assets/Tape_top_left.png';
import TapeTopRight from '../assets/Tape_top_right.png';
import TapeBottomLeft from '../assets/Tape_bot_left.png';
import TapeBottomRight from '../assets/Tape_bot_right.png';

const LoginPage: React.FC = () => {
  const [view, setView] = useState('main');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (username !== 'correctUsername' || password !== 'correctPassword') {
      setErrorMessage('Incorrect username or password');
    } else {
      setErrorMessage('');
      alert('Login successful!');
    }
  };

  const renderMainOptions = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Welcome!</h2>
      <button style={styles.button} onClick={() => setView('login')}>Log In</button>
      <button style={styles.button} onClick={() => setView('signupSelection')}>Sign Up</button>
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
      <button style={styles.button} onClick={handleLogin}>Log In</button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <p style={styles.orText}>OR</p>
      <GoogleLoginButton />
    </div>
  );

  const renderSignUpSelection = () => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Sign Up</h2>
      <p style={styles.subtitle}>Who are you?</p>
      <button style={styles.button} onClick={() => setView('signupFormStudent')}>Student</button>
      <button style={styles.button} onClick={() => setView('signupFormOrganization')}>Organization</button>
    </div>
  );

  const renderSignUpForm = (type: string) => (
    <div style={styles.paper}>
      <img src={TapeTopLeft} alt="Tape top left" style={styles.tapeTopLeft} />
      <img src={TapeTopRight} alt="Tape top right" style={styles.tapeTopRight} />
      <img src={TapeBottomLeft} alt="Tape bottom left" style={styles.tapeBottomLeft} />
      <img src={TapeBottomRight} alt="Tape bottom right" style={styles.tapeBottomRight} />
      <h2 style={styles.title}>Sign Up</h2>
      <p style={styles.subtitle}>Sign up as a {type}</p>
      <input type="text" placeholder="Username" style={styles.input} />
      <input type="password" placeholder="Password" style={styles.input} />
      <input type="password" placeholder="Re-enter Password" style={styles.input} />
      <button style={styles.button}>Sign Up</button>
      <p style={styles.orText}>OR</p>
      <GoogleLoginButton />
    </div>
  );

  return (
    <div style={styles.background}>
      {view === 'main' && renderMainOptions()}
      {view === 'login' && renderLoginForm()}
      {view === 'signupSelection' && renderSignUpSelection()}
      {view === 'signupFormStudent' && renderSignUpForm('Student')}
      {view === 'signupFormOrganization' && renderSignUpForm('Organization')}
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
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
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
    right: '-65px',
    width: '150px',
    height: 'auto',
  },
  tapeBottomLeft: {
    position: 'absolute',
    bottom: '-50px',
    left: '-50px',
    width: '150px',
    height: 'auto',
  },
  tapeBottomRight: {
    position: 'absolute',
    bottom: '-50px',
    right: '-60px',
    width: '150px',
    height: 'auto',
  },
};

export default LoginPage;