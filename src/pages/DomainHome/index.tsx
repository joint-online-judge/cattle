import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import DomainHomeHeader from '@/components/Domain/DomainHome/DomainHomeHeader';
import DomainHomeNav from '@/components/Domain/DomainHome/DomainHomeNav';
import { Col, Row } from 'antd';
import { CONTENT_GRID_LAYOUT } from '@/constants';
import style from './style.css';

const Index: React.FC = () => {
  return (
    <div className={style.domainHome}>
      <div className={style.domainHomeHeaderWrapper}>
        <Row justify="center">
          <Col {...CONTENT_GRID_LAYOUT}>
            <DomainHomeHeader />
            <Route path="/domain/:url/">
              <DomainHomeNav />
            </Route>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <Col {...CONTENT_GRID_LAYOUT}>
          <Switch>
            <Route exact path="/domain/:url/">
              Home page
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
