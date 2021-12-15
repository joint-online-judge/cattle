import React from 'react';
import { useModel } from 'umi';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const { domain, refresh } = useModel('domain');

  return (
    <ShadowCard>
      <UpsertDomainForm initialValues={domain} onUpdateSuccess={refresh} />
    </ShadowCard>
  );
};

export default Index;
