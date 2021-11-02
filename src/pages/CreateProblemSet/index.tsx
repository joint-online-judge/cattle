import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useIntl, useParams } from 'umi';
import SidePage from '@/components/SidePage';
import { UpsertProblemSetForm } from '@/components/ProblemSet';
import ShadowCard from '@/components/ShadowCard';
import { useModel } from '@@/plugin-model/useModel';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const routes = [
    {
      path: 'domain',
      breadcrumbI18nKey: 'DOMAIN.DOMAINS',
    },
    {
      path: domainUrl,
      breadcrumbName: domain?.name || 'unknown',
    },
    {
      path: 'create-problem-set',
      breadcrumbI18nKey: 'PROBLEM_SET.CREATE.TITLE',
    },
  ];

  useEffect(() => {
    setHeader({
      routes,
      titleI18nKey: 'PROBLEM_SET.CREATE.TITLE',
    });
  }, []);

  return (
    <SidePage>
      <UpsertProblemSetForm
        domainUrl={domainUrl}
        initialValues={{
          hidden: true,
          scoreboard_hidden: true,
        }}
      />
    </SidePage>
  );
};
export default Index;
