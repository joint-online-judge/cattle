import React from 'react';
import { Row, Col, Typography } from 'antd';

const Index: React.FC = () => {
  return (
    <Row justify={'center'} align="middle" style={{ marginTop: 200 }}>
      <Col>
        <Typography.Title>403 Not Authenticated</Typography.Title>
      </Col>
    </Row>
  );
};

export default Index;
