import React from 'react';
import { useParams } from 'umi';
import { message } from 'antd';
import ShadowCard from '@/components/ShadowCard';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';

interface IProps {
  refresh: () => void;
}

const Index: React.FC<IProps> = ({ refresh }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data } = useRequest(
    async () => {
      const res = await Horse.domain.getDomainApiV1DomainsDomainGet(domainUrl);
      return res.data.data;
    },
    {
      onError: (e) => {
        message.error('fetch domain failed');
      },
    },
  );

  return (
    <ShadowCard>
      <UpsertDomainForm initialValues={data} onUpdateSuccess={refresh} />
    </ShadowCard>
  );
};

export default Index;
