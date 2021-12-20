import React from 'react';
import { VERTICAL_GUTTER } from '@/constants';
import { Col, Row, Typography } from 'antd';
import Gravatar from '@/components/Gravatar';
import style from '@/components/Profile/style.less';
import { MailOutlined, ProfileOutlined } from '@ant-design/icons';

const { Text } = Typography;
const Index = () => {
  return (
    <Row align="middle" justify="start" gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <Row justify="center">
          <Gravatar
            gravatar="shili2017@sjtu.edu.cn"
            size={200}
          />
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={24}>
            <Text strong className={style.nameBadge}>Shi Li</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">fcq8080</Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <MailOutlined />
          </Col>
          <Col>
            <Text>shili2017@sjtu.edu.cn</Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={8}>
          <Col>
            <ProfileOutlined />
          </Col>
          <Col>
            <Text>517370910102</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Index;
