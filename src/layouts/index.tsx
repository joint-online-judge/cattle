import React from 'react';
import { Col, Layout, Row, Alert } from 'antd';
import { useModel, Link } from 'umi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CONTENT_GRID_LAYOUT } from '@/constants';
import PageHeaderIntl from '@/components/PageHeaderIntl';
import style from './style.less';
import Logo from '@/assets/logo.svg';

const Index: React.FC = ({ children }) => {
  const { initialState } = useModel('@@initialState');

  return (
    <Layout className={style.pageLayout}>
      <Layout.Header className={style.pageHeader}>
        {/* TODO: responsive nav */}
        <Row wrap={false} align={'middle'} gutter={12}>
          <Col flex={'none'}>
            <Row wrap={false} align={'middle'}>
              <img src={Logo} alt="logo" className={style.pageTitleLogo} />
              <span className={style.pageTitle}>Joint Online Judge</span>
            </Row>
          </Col>
          <Col flex={'auto'}>
            <Header />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className={style.pageBody}>
        {initialState?.user === undefined ? (
          <Alert
            message={
              <div>
                Please login first to continue. Click&nbsp;
                <Link to={`/login?from=${location.pathname}`}>here</Link> to
                login.
              </div>
            }
            banner
            closable
          />
        ) : null}
        <Row justify="center" className={style.pageContent}>
          <Col {...CONTENT_GRID_LAYOUT}>
            <PageHeaderIntl breadcrumb={{}} />
            {children}
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className={style.pageFooter}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default Index;
