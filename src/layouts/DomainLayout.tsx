import React, { useEffect } from 'react';
import { useModel, useParams } from 'umi';
import { Result } from 'antd';
import { ErrorCode } from '@/utils/service';
import MainLayout from '@/layouts/MainLayout';
import DomainHeader from '@/components/DomainHeader';

const Index: React.FC = ({ children }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const {
    fetchDomain,
    errorCode,
    domain,
    loading: domainLoading,
  } = useModel('domain');

  useEffect(() => {
    fetchDomain(domainUrl);
    return () => {
      fetchDomain(null);
    };
  }, [domainUrl]);

  if (!domainLoading && errorCode) {
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
      <DomainHeader />
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default Index;
