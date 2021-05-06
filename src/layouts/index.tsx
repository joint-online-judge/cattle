import React from 'react';
import { Layout } from 'antd';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import style from './style.less';

const Index: React.FC = ({ children }) => {
  return (
    <Layout className={style.pageLayout}>
      <Layout.Header className={style.pageHeader}>
        <Header />
      </Layout.Header>
      <Layout.Content className={style.pageContent}>
        {children}
      </Layout.Content>
      <Layout.Footer className={style.pageFooter}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default Index;
