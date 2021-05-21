import React from 'react';
import { useParams } from 'umi';
import { message } from 'antd';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';

interface IProps {
  refresh: () => void;
}

const Index: React.FC<IProps> = ({ refresh }) => {
  const { domainUrl } = useParams<{ domainUrl: string; }>();

  const { data } = useRequest(async () => {
    const res = await DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data;
  }, {
    onError: e => {
      message.error('fetch domain failed');
    },
  });

  return (
    <UpsertDomainForm initialValues={data} onUpdateSuccess={refresh} />
  );
};

export default Index;
