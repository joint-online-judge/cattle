import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { DomainHomeHeader, DomainHomeNav } from 'app/components/Domain';
import style from './style.css';

export const DomainHomeContainer = observer(() => {
  return (
    <div className={style.DomainHome}>
      <div className={style.DomainHomeHeaderWrapper}>
        <DomainHomeHeader />
        <Route path="/domain/:url/">
          <DomainHomeNav />
        </Route>
      </div>
      <Switch>
        <Route exact path="/domain/:url/">
          Home page
        </Route>
      </Switch>
    </div>
  );
});
