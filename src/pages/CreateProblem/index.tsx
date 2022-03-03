import React, { useMemo, useEffect } from 'react';
import { useParams, useModel } from 'umi';
import { UpsertProblemForm } from '@/components/Problem';
import SidePage from '@/components/SidePage';

const Index: React.FC = () => {
  const { domain } = useModel('domain');
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { setHeader } = useModel('pageHeader');

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'create-problem',
      },
    ],
    [domainUrl, domain?.name],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM.CREATE.TITLE',
    });
  }, [breads, setHeader]);

  return (
    <SidePage extra={<h1>Side</h1>}>
      <UpsertProblemForm
        domainUrl={domainUrl}
        initialValues={{ hidden: true }}
      />
    </SidePage>
  );
};

export default Index;
