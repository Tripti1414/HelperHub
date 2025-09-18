import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/auth.context';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(authContext);

  // If user not logged in, redirect to login page
  if (!user) return <Navigate to="/login" />;

  // If role is specified and user role does not match, redirect to home
  if (role && user.role !== role) return <Navigate to="/" />;

  // Else render the children component (dashboard)
  return children;
};

export default PrivateRoute;
