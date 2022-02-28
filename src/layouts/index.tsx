import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { BackTop, Layout, message } from 'antd';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainLayout from '@/layouts/MainLayout';
import style from './style.less';

const Index: React.FC = ({ children }) => {
  const { domainUrl } = useModel('domain');

  useEffect(() => {
    // @Chujie: default message will display and overlap with the Header
    message.config({
      top: 72, // header height 64 + default top 8
    });
  }, []);

  const renderMain = () => {
    if (domainUrl) return children;

    return <MainLayout>{children}</MainLayout>;
  };

  return (
    <ErrorBoundary>
      <Layout className={style.pageLayout}>
        <Layout.Header className={style.pageHeader}>
          <Header />
        </Layout.Header>
        <Layout.Content className={style.pageBody}>
          <ErrorBoundary>{renderMain()}</ErrorBoundary>
        </Layout.Content>
        <Layout.Footer className={style.pageFooter}>
          <Footer />
        </Layout.Footer>
        <BackTop />
      </Layout>
    </ErrorBoundary>
  );
};

export default Index;
