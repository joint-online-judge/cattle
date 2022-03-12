import React from 'react';
import { Col, Row } from 'antd';

interface IProps extends React.HTMLProps<HTMLSpanElement> {
  icon: React.ReactElement;
  text: React.ReactNode | React.ReactElement | string | undefined | null;
}

const Index: React.FC<IProps> = ({ text, icon, ...rest }) => (
  <Row align="middle" gutter={8}>
    <Col>{React.cloneElement(icon, { ...rest })}</Col>
    <Col>
      <span {...rest}>{text}</span>
    </Col>
  </Row>
);

export default Index;
