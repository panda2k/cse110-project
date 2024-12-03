import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    user: any;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode<JwtPayload & { type?: string }>(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwtDecode<JwtPayload & { type?: string }>(token);
            const currentTime = Date.now() / 1000;

            if (decodedUser.exp && decodedUser.exp < currentTime) {
                // Token has expired
                localStorage.removeItem('token');
                setUser(null);
            } else {
                setUser(decodedUser);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};