import React from 'react';
import { Row, Col, Typography } from 'antd';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <Row justify={'center'} align="middle" style={{ marginTop: 200 }}>
      <Col>
        <Typography.Title>ProblemSet has expired!</Typography.Title>
      </Col>
    </Row>
  );
};

export default Index;
