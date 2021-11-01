import React, { useEffect } from 'react';
import { Col, Layout, Row, Alert, BackTop } from 'antd';
import { useModel, Link, useParams } from 'umi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CONTENT_GRID_LAYOUT } from '@/constants';
import GlobalPageHeader from '@/components/GlobalPageHeader';
import style from './style.less';
import Logo from '@/assets/logo.svg';
import DomainHeader from '@/components/DomainHeader';

const Index: React.FC = ({ children }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { initialState } = useModel('@@initialState');
  const { fetchDomain } = useModel('domain');
  const { headerVisible } = useModel('pageHeader');

  useEffect(() => {
    if (domainUrl) {
      fetchDomain(domainUrl);
    }
  }, [domainUrl]);

  useEffect(() => {
    if (domainUrl) {
      fetchDomain(domainUrl);
    }
  }, [domainUrl]);

  return (
    <Layout className={style.pageLayout}>
      <Layout.Header
        className={domainUrl ? style.domainLayoutHeader : style.pageHeader}
      >
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
        {domainUrl ? <DomainHeader /> : null}
        <Row
          justify="center"
          className={
            headerVisible
              ? style.pageContentWithHeader
              : style.pageContentNoHeader
          }
        >
          <Col {...CONTENT_GRID_LAYOUT}>
            {headerVisible ? <GlobalPageHeader /> : null}
            {children}
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className={style.pageFooter}>
        <Footer />
      </Layout.Footer>
      <BackTop />
    </Layout>
  );
};

export default Index;
