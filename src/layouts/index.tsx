import React, { useEffect } from 'react';
import { isNil } from 'lodash';
import { Col, Layout, Row, BackTop, message, Result } from 'antd';
import { useModel, useParams } from 'umi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import GlobalPageHeader from '@/components/GlobalPageHeader';
import DomainHeader from '@/components/DomainHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MAIN_CONTENT_GRID } from '@/constants';
import { ErrorCode } from '@/utils/service';
import Logo from '@/assets/logo.svg';
import style from './style.less';

const Index: React.FC = ({ children }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const {
    fetchDomain,
    errorCode,
    domain,
    loading: domainLoading,
  } = useModel('domain');
  const { headerVisible } = useModel('pageHeader');

  useEffect(() => {
    fetchDomain(domainUrl);
  }, [domainUrl]);

  useEffect(() => {
    // @Chujie: default message will display and overlap with the Header
    message.config({
      top: 72, // header height 64 + default top 8
    });
  }, []);

  const renderMain = () => {
    if (domainUrl && !domainLoading && isNil(domain)) {
      let errMsg = 'Unknown';

      // TODO: error msg i18n & image
      if (errorCode === ErrorCode.DomainNotFoundError) {
        errMsg = 'Domain Not Found';
      } else if (errorCode === ErrorCode.DomainUserNotFoundError) {
        errMsg = 'User Not Found in Domain';
      } else if (errorCode === ErrorCode.DomainRoleNotFoundError) {
        errMsg = 'Domain Role Not Found';
      } else if (errorCode === 403) {
        errMsg = 'You are not a member';
      }

      return (
        <Result
          status="404"
          title="Cannot Load Domain"
          subTitle={errMsg}
          className="mt-16"
        />
      );
    }

    return (
      <>
        {domainUrl ? <DomainHeader /> : null}
        <Row
          justify="center"
          className={
            headerVisible
              ? style.pageContentWithHeader
              : style.pageContentNoHeader
          }
        >
          <Col {...MAIN_CONTENT_GRID}>
            {headerVisible ? <GlobalPageHeader /> : null}
            {children}
          </Col>
        </Row>
      </>
    );
  };

  return (
    <ErrorBoundary>
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
