import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { LoginContainer, TodoContainer } from 'app/containers';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={TodoContainer} />
        <Route path="/login" component={LoginContainer} />
      </Switch>

    </Router>
  );
});
