// src/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from './token';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Don't check for preferences if we're already on the preferences page
  if (location.pathname === '/preferences') {
    return children;
  }

  // If we don't have a userId stored, redirect to login
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;