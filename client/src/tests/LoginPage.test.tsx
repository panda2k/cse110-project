import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../components/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <LoginPage />
      </GoogleOAuthProvider>
    );
  };

  test('renders main options view', () => {
    renderWithProvider();
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('switches to login form when Log In button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Log In'));
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('switches to signup selection when Sign Up button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByText('Who are you?')).toBeInTheDocument();
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Organization')).toBeInTheDocument();
  });

  test('switches to signup form when Student or Organization button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Student'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('displays error message on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid username or password' }),
      })
    ) as jest.Mock;

    renderWithProvider();
    fireEvent.click(screen.getByText('Log In'));

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  test('does not display error message on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mock_token' }),
      })
    ) as jest.Mock;

    renderWithProvider();
    fireEvent.click(screen.getByText('Log In'));

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'correctUsername' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctPassword' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
    });
    expect(window.localStorage.getItem('token')).toBe('mock_token');
  });
});