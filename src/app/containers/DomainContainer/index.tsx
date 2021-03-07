import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch } from 'react-router';
import { CreateDomain } from 'app/components';
import style from './style.css';

export const DomainContainer = observer(() => {
  return (
    <div className={style.DomainContainer}>
      <Switch>
        <Route path="/domain/create" component={CreateDomain} />
      </Switch>
    </div>
  );
});
