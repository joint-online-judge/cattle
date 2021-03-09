import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { HomeHeader } from './HomeHeader';
import style from './style.css';

export const DomainHome = observer(() => {
  return (
    <div id={style.Home}>
      <div id={style.HomeHeaderWrapper}>
        <HomeHeader />
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
