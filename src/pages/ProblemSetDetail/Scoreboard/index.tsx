import React from 'react';
import { useParams } from 'umi';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { Horse } from '@/utils/service';

interface IProps {
  refresh: () => void;
}

const Index: React.FC<IProps> = ({ refresh }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data } = useRequest(
    async () => {
      const response = await Horse.domain.getDomainApiV1DomainsDomainGet(
        domainUrl,
      );
      return response.data.data;
    },
    {
      onError: () => {
        message.error('fetch domain failed');
      },
    },
  );

  return <h1>Invitation</h1>;
};

export default Index;
