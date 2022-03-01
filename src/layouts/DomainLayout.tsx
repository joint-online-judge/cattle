import React, { useEffect } from 'react';
import { useModel, useParams } from 'umi';
import { Result } from 'antd';
import { ErrorCode } from '@/utils/service';
import MainLayout from '@/layouts/MainLayout';
import DomainHeader from '@/components/DomainHeader';

const Index: React.FC = ({ children }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { fetchDomain, errorCode, loading: domainLoading } = useModel('domain');

  useEffect(() => {
    fetchDomain(domainUrl);
    return () => {
      fetchDomain(null); // Clear the current model
    };
  }, []);

  if (!domainLoading && errorCode) {
    let errorTitle: string;
    let errorMessage: string;

    // TODO: error msg i18n & image
    switch (errorCode) {
      case ErrorCode.DomainNotFoundError: {
        errorTitle = 'Domain Not Found';
        errorMessage = 'Please check your URL.';

        break;
      }

      case ErrorCode.DomainUserNotFoundError: {
        errorTitle = 'User Not Found in Domain';
        errorMessage = 'You are not a member of this domain.';

        break;
      }

      case ErrorCode.DomainRoleNotFoundError: {
        errorTitle = 'Domain Role Not Found';
        errorMessage = 'Please contact the domain administrator.';

        break;
      }

      case 403: {
        errorTitle = 'No Permission';
        errorMessage = 'You are not a member of this domain.';

        break;
      }

      default: {
        errorTitle = 'Unknown Error';
        errorMessage = 'Failed to load domain info.';
      }
    }

    return (
      <Result
        className="mt-16"
        status="404"
        title={errorTitle}
        subTitle={errorMessage}
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
