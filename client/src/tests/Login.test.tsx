import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import { AuthContext } from '../context/AuthContext';

const mockLogin = jest.fn();
const mockLogout = jest.fn();

const renderWithRouter = (component: React.ReactNode) => {
    return render(
        <BrowserRouter>
            <AuthContext.Provider value={{ user: null, login: mockLogin, logout: mockLogout }}>
                {component}
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('LoginPage Component', () => {
    test('renders welcome message', () => {
        renderWithRouter(<LoginPage />);
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });

    test('shows login and signup buttons', () => {
        renderWithRouter(<LoginPage />);
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
});
