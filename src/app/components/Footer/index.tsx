import React from 'react';
import { observer } from 'mobx-react';
import {
  Col, Row, Typography,
} from 'antd';
import { CONTENT_GRID_LAYOUT } from 'app/constants';
import { FooterLinks } from './FooterLinks';
import style from './style.css';

const { Text } = Typography;
export const Footer = observer(() => {
  return (
    <Row justify="center">
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row>
          <Col>
            <Text type="secondary">
              © 2021-{new Date().getFullYear()} Joint Online Judge.
            </Text>
          </Col>
          <Col span={1} />
          <Col>
            <Row>
              <FooterLinks />
            </Row>
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Col>
    </Row>
  );
});
