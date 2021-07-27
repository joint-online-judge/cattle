import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useIntl, useParams } from 'umi';
import { UpsertProblemSetForm } from '@/components/ProblemSet';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();

  return (
    <ShadowCard
      title={intl.formatMessage({ id: 'PROBLEM_SET.CREATE.TITLE' })}
    >
      <UpsertProblemSetForm
        domainUrl={domainUrl}
        initialValues={{
          hidden: true,
          scoreboard_hidden: true,
        }} />
    </ShadowCard>
  );
};
export default Index;
