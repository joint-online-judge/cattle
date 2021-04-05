import { observer } from 'mobx-react';
import { PrivateRoute } from 'app/components/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  LoginContainer,
  LogoutContainer,
  DomainList,
  DomainHome,
  UserSettings,
  DomainSettings,
  TodoContainer,
  NoMatch,
} from 'app/containers';
import {
  Footer, Header, CreateDomain,
} from 'app/components';
import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { useSettings } from 'app/contexts';
import { SUPPORT_LANGUAGES } from 'app/constants/i18n';
import style from 'app/containers/DomainHome/style.css';

export const JOJRouters = observer(() => {
  const settings = useSettings();

  return (
    <ConfigProvider locale={SUPPORT_LANGUAGES[settings.i18nLang].antd}>
      <Router>
        <Layout>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.Content className={style.domainContainer}>
            <Switch>
              {/* Basic Routes */}
              <Route exact path="/" component={TodoContainer} />
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/logout" component={LogoutContainer} />

              {/* User Settings */}
              {/* TODO: default landing */}
              <PrivateRoute
                exact
                path="/settings/domains"
                component={UserSettings}
              />
              <PrivateRoute exact path="/settings" component={UserSettings} />

              {/* Domain */}
              <PrivateRoute
                exact
                path="/domain/create"
                component={CreateDomain}
              />
              <PrivateRoute
                exact
                path="/domain/:domainUrl/settings"
                component={DomainSettings}
              />
              <PrivateRoute
                exact
                path="/domain/:domainUrl"
                component={DomainHome}
              />
              <PrivateRoute exact path="/domain" component={DomainList} />

              {/* Special Routes */}
              <Route path="*" component={NoMatch} />
            </Switch>
          </Layout.Content>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
});
