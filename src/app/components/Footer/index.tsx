import React from 'react';
import { observer } from 'mobx-react';
import {
  Col, Row, Typography,
} from 'antd';
import { FooterLinks } from './FooterLinks';
import style from './style.css';

const { Text } = Typography;
export const Footer = observer(() => {
  return (
    <div className={style.FooterWrapper}>
      <div className={style.Footer}>
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
            className={style.Link}
          >
            <Text type="secondary">
              沪交ICP备20190085号
            </Text>
          </a>
        </Row>
      </div>
    </div>
  );
});
