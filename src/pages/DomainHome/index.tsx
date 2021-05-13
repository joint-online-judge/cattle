import React from 'react';
import DomainHomeHeader from '@/components/Domain/DomainHome/DomainHomeHeader';
import DomainHomeNav from '@/components/Domain/DomainHome/DomainHomeNav';
import { Col, Row, Card } from 'antd';
import style from './style.css';

const Index: React.FC = () => {
  return (
    <div>
      <Card className={style.contentCard}>
        <DomainHomeHeader />
        <DomainHomeNav />
      </Card>
      <Card className={style.contentCard}>
        Home page
      </Card>
    </div>
  );
};
export default Index;
