import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Redirect, Route, useRouteMatch } from 'react-router';
import { Row, Col } from 'antd';
import {
  General,
  SettingsHeader,
  SettingsSideBar,
} from 'app/components';
import { Domains } from 'app/components/Domains';
import style from './style.css';

export const SettingsContainer = observer(() => {
  const { path } = useRouteMatch();
  return (
    <div className={style.SettingContainer}>
      <Row>
        <SettingsHeader />
      </Row>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={6}
        >
          <SettingsSideBar mode="personal" />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={18}
        >
          <Route
            exact
            path={`${path}`}
            component={() => <Redirect to={`${path}/general`} />}
          />
          <Switch>
            <Route path={`${path}/general`} component={General} />
            <Route path={`${path}/domains`} component={Domains} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
});
