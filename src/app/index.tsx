import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { LoginContainer, TodoContainer } from 'app/containers';
import { PrivateRoute, ProvideAuth } from 'app/components/Auth';
import { NaviBarContainer } from 'app/containers/NaviBarContainer';
import { Logout } from 'app/containers/Logout';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <ProvideAuth>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={NaviBarContainer} />
        </Switch>
        <Switch>
          <Route exact path="/" component={TodoContainer} />
          <PrivateRoute>
            <Route path="/test" component={TodoContainer} />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
});
