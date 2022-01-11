import React from 'react';
import ChangePassword from './ChangePassword';
import UpdateProfile from '@/pages/UserSettings/Account/UpdateProfile';
import { Col, Divider, Row } from 'antd';
import { VERTICAL_GUTTER } from '@/constants';

const Index: React.FC = () => {

  return (
    <>
      <Row gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <UpdateProfile />
        </Col>
        <Divider />
        <Col span={24}>
          <ChangePassword />
        </Col>
      </Row>
    </>
  );
};

export default Index;
