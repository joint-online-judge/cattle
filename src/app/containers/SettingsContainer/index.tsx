import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import {
  Redirect, Route, useRouteMatch,
} from 'react-router';
import { Row, Col, Image } from 'antd';
import {
  Footer,
  Header,
  SettingsHeader,
  SettingsSideBar,
} from 'app/components';
import { menuArrange } from 'app/containers/SettingsContainer/MenuArrange';
import style from './style.css';

export interface SettingsContainerProps {
  mode?: 'personal' | 'domain' | 'problem';
}

export const SettingsContainer = observer(
  (props: SettingsContainerProps): ReactElement<SettingsContainerProps, any> => {
    const { path, url } = useRouteMatch();
    const mode = props?.mode || 'personal';
    const items = menuArrange[mode];
    return (
      <>
        <Header />
        <div className={style.SettingContainer}>
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
                        key={`${path}${item.path}`}
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
        <Footer />
      </>
    );
  },
);
