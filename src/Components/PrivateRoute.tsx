import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {  isAuthenticated} = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
