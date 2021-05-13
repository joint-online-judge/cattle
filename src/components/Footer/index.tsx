import React from 'react';
import {
  Col, Row, Typography,
} from 'antd';
import FooterLinks from './FooterLinks';
import style from './style.css';

const { Text } = Typography;
const Index: React.FC = () => {
  return (
    <Row justify="center">
      <Col span={16}>
        <Row justify="space-between">
          <Col>
            <Text type="secondary">
              © 2021-{new Date().getFullYear()} Joint Online Judge
            </Text>
            <br/>
            <a
              href="http://net.sjtu.edu.cn"
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
            >
              <Text type="secondary">
                沪交ICP备20190085号
              </Text>
            </a>
          </Col>
          <Col>
            <Row>
              <FooterLinks />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
