import React from 'react';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import { Col, Row } from 'antd';
import { VERTICAL_GUTTER } from '@/constants';

const Index: React.FC = () => (
  <Row gutter={VERTICAL_GUTTER}>
    <Col span={24}>
      <EditProfile />
    </Col>
    <Col span={24}>
      <ChangePassword />
    </Col>
  </Row>
);

export default Index;
