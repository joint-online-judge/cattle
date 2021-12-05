import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';
import ShadowCard from '@/components/ShadowCard';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  extra: React.ReactNode | React.ReactNode[]; // extra component on the side
}

const Index: React.FC<IProps> = ({ children, extra }) => {
  return (
    <>
      <Row gutter={[{ lg: 24, xl: 24, md: 24, sm: 24 }, 16]}>
        <Col xs={24} sm={24} md={16} xl={16}>
          {React.Children.map(children, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
        <Col xs={24} sm={24} md={8} xl={8}>
          {React.Children.map(extra, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Index;
