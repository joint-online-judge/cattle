import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import { Row, Col } from 'antd';
import {
  NavBar,
  General,
  SettingsHeader,
} from 'app/components/Settings';
import { Domains } from 'app/components/Domains';
import * as style from './style.css';

export const SettingsContainer = observer(() => {
  return (
    // todo: add responsive
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
          <NavBar />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={18}
        >
          <Route
            exact
            path="/settings"
            component={() => <Redirect to="/settings/general" />}
          />
          <Switch>
            <Route path="/settings/general" component={General} />
            <Route path="/settings/domains" component={Domains} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
});
