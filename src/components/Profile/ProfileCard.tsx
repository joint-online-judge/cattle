import React from 'react';
import { VERTICAL_GUTTER } from '@/constants';
import { Button, Col, Row } from 'antd';
import { history } from 'umi';
import Gravatar from '@/components/Gravatar';
import { EditOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons';
import { useModel } from '@@/plugin-model/useModel';

const Index = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <Row align="middle" justify="center" gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <Row justify="center">
          <Gravatar
            gravatar={initialState?.user?.gravatar}
            size={200}
          />
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={24}>
            <span
              className="font-semibold text-2xl">
              {initialState?.user?.realName
              || initialState?.user?.username}
            </span>
          </Col>
          <Col span={24}>
            <span
              className="text-lg text-gray-400">{initialState?.user?.username}
            </span>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button
          block
          icon={<EditOutlined />}
          onClick={() => {
            history.push('/settings');
          }}>
          Edit Profile
        </Button>
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <MailOutlined />
          </Col>
          <Col>
            <span className="text-sm">{initialState?.user?.email}</span>
          </Col>
        </Row>
      </Col>
      {initialState?.user?.studentId
      && <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <ProfileOutlined />
          </Col>
          <Col>
            <span className="text-sm">{initialState?.user?.studentId}</span>
          </Col>
        </Row>
      </Col>}
    </Row>
  );
};
export default Index;
