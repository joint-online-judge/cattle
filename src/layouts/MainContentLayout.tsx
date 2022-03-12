import React from 'react';
import { Row, Col } from 'antd';
import { MAIN_CONTENT_GRID } from '@/constants';

const Index: React.FC<{ className?: string }> = ({ children, className }) => (
  <Row justify="center" className={className}>
    <Col {...MAIN_CONTENT_GRID}>{children}</Col>
  </Row>
);

export default Index;
