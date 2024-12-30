import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RouteWrapper = ({ 
  children, 
  title, 
  requireAuth = false,
  isPublicOnly = false
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = `Shelter Finder | ${title}`;
  }, [title]);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (isPublicOnly && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};