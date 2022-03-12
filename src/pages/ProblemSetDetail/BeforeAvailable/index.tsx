import React from 'react';
import { Row, Col, Typography } from 'antd';

const Index: React.FC = () => (
  <Row justify={'center'} align="middle" style={{ marginTop: 200 }}>
    <Col>
      <Typography.Title>{"ProblemSet hasn't started yet!"}</Typography.Title>
    </Col>
  </Row>
);

export default Index;
