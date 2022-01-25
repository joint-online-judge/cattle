import React, { useEffect } from 'react';
import { isNil } from 'lodash';
import { BackTop, Col, Layout, message, Result, Row } from 'antd';
import { useModel, useParams } from 'umi';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import GlobalPageHeader from '@/components/GlobalPageHeader';
import DomainHeader from '@/components/DomainHeader';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MAIN_CONTENT_GRID } from '@/constants';
import { ErrorCode } from '@/utils/service';
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
      let errTitle = 'Unknown Error';
      let errMsg = 'Failed to load domain info.';

      // TODO: error msg i18n & image
      if (errorCode === ErrorCode.DomainNotFoundError) {
        errTitle = 'Domain Not Found';
        errMsg = 'Please check your URL.';
      } else if (errorCode === ErrorCode.DomainUserNotFoundError) {
        errTitle = 'User Not Found in Domain';
        errMsg = 'You are not a member of this domain.';
      } else if (errorCode === ErrorCode.DomainRoleNotFoundError) {
        errTitle = 'Domain Role Not Found';
        errMsg = 'Please contact the domain administrator.';
      } else if (errorCode === 403) {
        errTitle = 'No Permission';
        errMsg = 'You are not a member of this domain.';
      }

      return (
        <Result
          className="mt-16"
          status="404"
          title={errTitle}
          subTitle={errMsg}
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
          className={style.pageHeader}
        >
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
