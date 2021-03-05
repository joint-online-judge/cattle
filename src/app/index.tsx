import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import {
  LoginContainer,
  TodoContainer,
  NavBarContainer,
  LogoutContainer,
  SettingsContainer,
  DomainContainer,
} from 'app/containers';
import { PrivateRoute, ProvideAuth } from 'app/components/Auth';
import { ProvideSettings } from 'app/components/Settings';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <ProvideSettings>
      <ProvideAuth>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/logout" component={LogoutContainer} />
            <Route path="/" component={NavBarContainer} />
          </Switch>
          <Switch>
            <Route exact path="/" component={TodoContainer} />
            <PrivateRoute path="/test">
              <TodoContainer />
            </PrivateRoute>
            {/* ---Settings--- */}
            <PrivateRoute path="/settings">
              <SettingsContainer />
            </PrivateRoute>
            {/* ---Settings--- */}
            <PrivateRoute path="/domains">
              <DomainContainer />
            </PrivateRoute>
          </Switch>
        </Router>
      </ProvideAuth>
    </ProvideSettings>
  );
});
