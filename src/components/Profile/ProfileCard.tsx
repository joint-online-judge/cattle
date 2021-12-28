import React from 'react';
import { VERTICAL_GUTTER } from '@/constants';
import { Col, Row } from 'antd';
import Gravatar from '@/components/Gravatar';
import { MailOutlined, ProfileOutlined } from '@ant-design/icons';

const Index = () => {
  return (
    <Row align="middle" justify="start" gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <Row justify="start">
          <Gravatar
            gravatar="shili2017@sjtu.edu.cn"
            size={200}
          />
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={24}>
            <span className="font-semibold text-2xl">Li Shi</span>
          </Col>
          <Col span={24}>
            <span className="text-lg text-gray-400">fcq8080</span>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <MailOutlined />
          </Col>
          <Col>
            <span className="text-sm">shili2017@sjtu.edu.cn</span>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <ProfileOutlined />
          </Col>
          <Col>
            <span className="text-sm">517370910102</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Index;
