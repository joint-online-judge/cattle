import { observer } from 'mobx-react';
import { PrivateRoute } from 'app/components/Auth';
import { Route, Router, Switch } from 'react-router';
import {
  DomainContainer,
  LoginContainer,
  LogoutContainer,
  SettingsContainer,
  TodoContainer,
} from 'app/containers';
import { ConfigProvider } from 'antd';
import React from 'react';
import { useSettings } from 'app/contexts';
import { SUPPORT_LANGUAGES } from 'app/constants/i18n';

export const JOJRouters = observer(({ history }) => {
  const settings = useSettings();
  return (
    <ConfigProvider locale={SUPPORT_LANGUAGES[settings.i18nLang].antd}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/logout" component={LogoutContainer} />
          <Route exact path="/" component={TodoContainer} />
          {/* ---Settings--- */}
          <PrivateRoute path="/settings" component={SettingsContainer} />
          {/* ---Settings--- */}
          <PrivateRoute path="/domain" component={DomainContainer} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
});
