import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Row, Col } from 'antd';
import { NavBar, General } from 'app/components/Settings';
import * as style from './style.css';

export const SettingsContainer = observer(() => {
  return (
    <Row className={style.SettingContainer}>
      <Col span={8}>
        <NavBar />
      </Col>
      <Col span={16}>
        <Switch>
          <Route path="/settings/general" component={General} />
        </Switch>
      </Col>
    </Row>
  );
});
