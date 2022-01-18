import React from 'react';
import { Col, Row } from 'antd';
import { VERTICAL_GUTTER } from '@/constants';
import ShadowCard from '@/components/ShadowCard';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  extra: React.ReactNode | React.ReactNode[]; // extra component on the side
  position?: 'left' | 'right'; // on left or right side extra component will be placed
}

const Index: React.FC<IProps> = ({ children, extra, position }) => {
  const childrenOrder = position && position === 'left' ? 1 : 0;
  return (
    <>
      <Row gutter={[{ lg: 24, xl: 24, md: 24, sm: 24 }, VERTICAL_GUTTER[1]]}>
        <Col xs={24} sm={24} md={16} xl={16} xxl={18} order={childrenOrder}>
          {React.Children.map(children, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} xxl={6}>
          {React.Children.map(extra, (c) => (
            <ShadowCard>{c}</ShadowCard>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Index;
