import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import DomainHomeHeader from '@/components/Domain/DomainHome/DomainHomeHeader';
import DomainHomeNav from '@/components/Domain/DomainHome/DomainHomeNav';
import { Col, Row, Card } from 'antd';
import style from './style.css';

const Index: React.FC = () => {
  return (
    <div>
      <Card className={style.contentCard}>
        <DomainHomeHeader />
        <Route path="/domain/:url/">
          <DomainHomeNav />
        </Route>
      </Card>
      <Card className={style.contentCard}>
        <Switch>
          <Route exact path="/domain/:url/">
            Home page
          </Route>
        </Switch>
      </Card>
    </div>
  );
};
export default Index;
