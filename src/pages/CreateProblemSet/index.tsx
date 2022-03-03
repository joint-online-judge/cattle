import React, { useEffect, useMemo } from 'react';
import { useParams, useModel } from 'umi';
import SidePage from '@/components/SidePage';
import { UpsertProblemSetForm } from '@/components/ProblemSet';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'create-problem-set',
      },
    ],
    [domainUrl, domain?.name],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM_SET.CREATE.TITLE',
    });
  }, [breads, setHeader]);

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
