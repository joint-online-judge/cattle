import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import {
  CreateDomain, Footer, Header, SettingsPage,
} from 'app/components';
import { DomainHomeContainer } from './DomainHomeContainer';
import style from './style.css';

export const DomainContainer = observer(() => {
  const { path } = useRouteMatch();
  return (
    <div className="PageLayout">
      <Header />
      <div className={`${style.DomainContainer} PageContent`}>
        <Switch>
          <Route path={`${path}/create`} component={CreateDomain} />
          <Route path={`${path}/:url/settings`}>
            <SettingsPage mode="domain" />
          </Route>
          <Route path={`${path}/:url/`} component={DomainHomeContainer} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
});
