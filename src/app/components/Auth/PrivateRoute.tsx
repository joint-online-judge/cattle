import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
