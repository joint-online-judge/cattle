import React, { ReactElement } from 'react';
import { Col, Image, Row } from 'antd';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router';
import { SettingsHeader, SettingsSideBar } from 'app/components/Settings';
import { SettingsMode } from '@/types';
import { CONTENT_GRID_LAYOUT } from 'app/constants';
import { menuArrange } from './MenuArrange';

export interface SettingsPageProps {
  mode: SettingsMode;
}

export const SettingsPage = (props: SettingsPageProps): ReactElement<SettingsPageProps, any> => {
  const { mode } = props;
  const { path, url } = useRouteMatch();
  const items = menuArrange[mode];
  return (
    <Row justify="center">
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row>
          <SettingsHeader mode={mode} />
        </Row>
        <Row
          gutter={[
            {
              lg: 24,
            }, {
              xs: 16,
              sm: 16,
              lg: 16,
            }]}
        >
          <Col
            xs={24}
            sm={24}
            lg={6}
          >
            <SettingsSideBar items={items} />
          </Col>
          <Col
            xs={24}
            sm={24}
            lg={18}
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
      </Col>
    </Row>
  );
};
