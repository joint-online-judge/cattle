import React from 'react';
import { Layout, Row, Col } from 'antd';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import style from './style.less';
import { CONTENT_GRID_LAYOUT } from '@/constants';

const Index: React.FC = ({ children }) => {
  return (
    <Layout className={style.pageLayout}>
      <Layout.Header className={style.pageHeader}>
        <Header />
      </Layout.Header>
      <Layout.Content className={style.pageContent}>
        <Row justify="center">
          <Col {...CONTENT_GRID_LAYOUT}>{children}</Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className={style.pageFooter}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default Index;
