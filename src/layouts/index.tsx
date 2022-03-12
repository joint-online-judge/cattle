import React from 'react';
import { matchPath } from 'react-router';
import { useLocation } from 'umi';
import { BackTop, Layout } from 'antd';
import style from './style.less';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainLayout from '@/layouts/MainLayout';

const Index: React.FC = ({ children }) => {
  const location = useLocation();

  const renderMain = () => {
    if (matchPath(location.pathname, { path: '/domain/:domainUrl' })) {
      return children;
    }

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
