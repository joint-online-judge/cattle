import React from 'react';
import { Row, Col } from 'antd';
import ShadowCard from '@/components/ShadowCard';

interface IProps {
  children: React.ReactElement[];
  extra: Array<React.ReactElement | React.ReactNode>; // extra component on the side
}

const Index: React.FC<IProps> = ({ children, extra }) => {
  return (
    <>
      <Row gutter={[{ lg: 24, xl: 24 }, 24]}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} xl={{ span: 18 }}>
          {React.Children.map(children, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} xl={{ span: 6 }}>
          {React.Children.map(extra, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Index;
