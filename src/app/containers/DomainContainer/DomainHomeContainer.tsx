import { observer } from 'mobx-react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { DomainHomeHeader, DomainHomeNav } from 'app/components/Domain';
import { Col, Row } from 'antd';
import style from './style.css';

export const DomainHomeContainer = observer(() => {
  return (
    <div className={style.domainHome}>
      <div className={style.domainHomeHeaderWrapper}>
        <Row justify="center">
          <Col
            xs={23}
            sm={22}
            md={21}
          >
            <DomainHomeHeader />
            <Route path="/domain/:url/">
              <DomainHomeNav />
            </Route>
          </Col>
        </Row>
      </div>
      <Switch>
        <Route exact path="/domain/:url/">
          Home page
        </Route>
      </Switch>
    </div>
  );
});
