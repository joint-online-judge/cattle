import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect, RouteProps, useLocation } from 'react-router';
import { useAuth } from 'app/contexts';

export const PrivateRoute = (props: RouteProps): Route<any, string> => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    <Route
      {...props}
    />
  ) : (
    <Redirect to={{
      pathname: '/login',
      state: { from: location },
    }}
    />
  );
};
