import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          if (decoded.exp * 1000 > Date.now()) {
            setUserId(decoded.id);
            setToken(storedToken);
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          } else {
            await logout();
          }
        } catch (error) {
          await logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      setUserId(decoded.id);
      setToken(newToken);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_AUTH_URL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      setUserId(null);
      setToken(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-600" />
    </div>;
  }

  return (
    <AuthContext.Provider value={{ 
      userId, 
      isAuthenticated, 
      token,
      login, 
      logout,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);