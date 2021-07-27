import React from 'react';
import { useIntl } from 'umi';
import { UpsertProblemForm } from '@/components/Problem';
import ShadowCard from '@/components/ShadowCard';
import { useParams } from 'umi';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  return (
    <ShadowCard
      title={intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' })}
    >
      <UpsertProblemForm domainUrl={domainUrl} />
    </ShadowCard>
  );
};
export default Index;
