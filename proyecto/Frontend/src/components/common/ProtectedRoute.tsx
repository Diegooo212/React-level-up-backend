import React from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  const isAdmin = currentUser && currentUser.role === 'admin';

  if (isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;