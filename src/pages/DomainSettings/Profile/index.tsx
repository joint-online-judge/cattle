import React from 'react';
import { useParams, useModel } from 'umi';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { Horse } from '@/utils/service';

const Index: React.FC = () => {
  const { refresh } = useModel('domain');
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data } = useRequest(
    async () => {
      const response = await Horse.domain.v1GetDomain(domainUrl);
      return response.data.data;
    },
    {
      onError: () => {
        message.error('fetch domain failed');
      },
    },
  );

  return <UpsertDomainForm initialValues={data} onUpdateSuccess={refresh} />;
};

export default Index;
