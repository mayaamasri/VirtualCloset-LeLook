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

  if (location.pathname === '/preferences') {
    return children;
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;