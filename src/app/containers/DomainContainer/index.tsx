import { observer } from 'mobx-react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import {
  CreateDomain, Footer, Header, SettingsPage,
} from 'app/components';
import { Layout } from 'antd';
import { DomainHomeContainer } from './DomainHomeContainer';
import style from './style.css';

export const DomainContainer = observer(() => {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content className={style.domainContainer}>
        <Switch>
          <Route path={`${path}/create`} component={CreateDomain} />
          <Route path={`${path}/:url/settings`}>
            <SettingsPage mode="domain" />
          </Route>
          <Route path={`${path}/:url/`} component={DomainHomeContainer} />
        </Switch>
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
});
