import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = '/login' 
}) => {
  const isAuthenticated = localStorage.getItem('auth_token');

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children || <Outlet />}</>;
};