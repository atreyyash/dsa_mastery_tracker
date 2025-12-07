import React, { createContext, useContext, useEffect, useState } from 'react'
import { getMe } from '../api/authApi';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const fUser = await getMe();
            setUser(fUser);
        } catch (error) {
            console.log('err: ', error);
            logout();
        }
    } 

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setIsLoading(false);
            fetchMe();
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            redirect('/login');
        }
    }, [isAuthenticated, token]);

    const login = (userData, authToken) => {
        setUser(userData);
        localStorage.setItem('authToken', authToken);
        setToken(authToken);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        redirect('/login');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
