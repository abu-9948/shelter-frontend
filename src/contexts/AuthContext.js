import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        setIsAuthenticated(true);
        setToken(token)
      } catch (error) {
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setIsAuthenticated(true);
      setToken(token)
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUserId(null);
    setToken(null)
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);