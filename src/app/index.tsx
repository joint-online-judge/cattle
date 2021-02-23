import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { LoginContainer, TodoContainer } from 'app/containers';
import { PrivateRoute, ProvideAuth } from 'app/components/Auth';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <ProvideAuth>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={TodoContainer} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute>
            <Route path="/test" component={TodoContainer} />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
});
