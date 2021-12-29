import React, { useEffect } from 'react';
import { useParams, useModel } from 'umi';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { Horse } from '@/utils/service';

interface IProps {
  refresh: () => void;
}

const Index: React.FC<IProps> = ({ refresh }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { setHeader } = useModel('pageHeader');

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

  useEffect(() => {
    setHeader({});
  }, []);

  return <h1>Invitation</h1>;
};

export default Index;
