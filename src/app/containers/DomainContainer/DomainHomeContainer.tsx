import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { DomainHomeHeader, DomainHomeNav } from 'app/components/Domains';
import style from './style.css';

export const DomainHomeContainer = observer(() => {
  return (
    <div id={style.DomainHome}>
      <div id={style.DomainHomeHeaderWrapper}>
        <DomainHomeHeader />
        <Route path="/domain/:url/">
          <DomainHomeNav />
        </Route>
      </div>
      <Switch>
        <Route exact path="/domain/:url/">
          sb
        </Route>
        <Route path="/domain/:url/settings">
          sb2
        </Route>
      </Switch>
    </div>
  );
});
