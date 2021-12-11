import React from 'react';
import { useParams, useModel } from 'umi';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';

const Index: React.FC = () => {
  const { domain, refresh } = useModel('domain');

  return <UpsertDomainForm initialValues={domain} onUpdateSuccess={refresh} />;
};

export default Index;
