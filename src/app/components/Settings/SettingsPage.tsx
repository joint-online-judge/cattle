import React, { ReactElement } from 'react';
import { Col, Image, Row } from 'antd';
import {
 Redirect, Route, Switch, useRouteMatch
} from 'react-router';
import { SettingsHeader, SettingsSideBar } from 'app/components/Settings';
import { SettingsPageProps } from '@types';
import { menuArrange } from './MenuArrange';
import style from './style.css';

export const SettingsPage = (props: SettingsPageProps): ReactElement<SettingsPageProps, any> => {
  const { mode } = props;
  const { path, url } = useRouteMatch();
  const items = menuArrange[mode];
  return (
    <div className={style.SettingsPage}>
      <Row>
        <SettingsHeader mode={mode} />
      </Row>
      <Row
        gutter={[
          {
            md: 24,
          }, {
            xs: 16,
            sm: 16,
            md: 16,
          }]}
      >
        <Col
          xs={24}
          sm={24}
          md={5}
        >
          <SettingsSideBar items={items} />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={19}
        >
          <Route
            exact
            path={path}
            component={() => <Redirect to={`${url}${items[0].path}`} />}
          />
          <Switch>
            {
              items.map((item) => {
                return (
                  <Route
                    key={item.key}
                    path={`${path}${item.path}`}
                  >
                    {item.component || (
                      <Image
                        src="https://i.loli.net/2021/03/10/aAV7sfDBemgIZ1l.jpg"
                      />
                    )}
                  </Route>
                );
              })
            }
          </Switch>
        </Col>
      </Row>
    </div>
  );
};
