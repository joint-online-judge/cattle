import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { CreateDomain, DomainHome } from 'app/components';
import style from './style.css';

export const DomainContainer = observer(() => {
  const { path } = useRouteMatch();
  return (
    <div className={style.DomainContainer}>
      <Switch>
        <Route path={`${path}/create`} component={CreateDomain} />
        <Route path={`${path}/:url/`} component={DomainHome} />
      </Switch>
    </div>
  );
});
