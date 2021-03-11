import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { CreateDomain } from 'app/components';
import { SettingsContainer } from 'app/containers';
import { DomainHomeContainer } from './DomainHomeContainer';
import style from './style.css';

export const DomainContainer = observer(() => {
  const { path } = useRouteMatch();
  return (
    <div className={style.DomainContainer}>
      <Switch>
        <Route path={`${path}/create`} component={CreateDomain} />
        <Route path={`${path}/:url/settings`}>
          <SettingsContainer mode="domain" />
        </Route>
        <Route path={`${path}/:url/`} component={DomainHomeContainer} />
      </Switch>
    </div>
  );
});
