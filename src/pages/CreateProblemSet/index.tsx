import React, { useEffect, useMemo } from 'react';
import { useParams } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
import SidePage from '@/components/SidePage';
import { UpsertProblemSetForm } from '@/components/ProblemSet';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const breads = useMemo(
    () => [
      {
        path: domainUrl,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'create-problem-set',
      },
    ],
    [domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM_SET.CREATE.TITLE',
    });
  }, [breads]);

  return (
    <SidePage extra={<h1>Side</h1>}>
      <UpsertProblemSetForm
        domainUrl={domainUrl}
        initialValues={{
          hidden: true,
          scoreboardHidden: true,
        }}
      />
    </SidePage>
  );
};

export default Index;
