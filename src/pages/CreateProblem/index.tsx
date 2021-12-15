import React, { useMemo, useEffect } from 'react';
import { useIntl, useParams, useModel } from 'umi';
import { UpsertProblemForm } from '@/components/Problem';
import SidePage from '@/components/SidePage';

const Index: React.FC = () => {
  const intl = useIntl();
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
    [domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM.CREATE.TITLE',
    });
  }, [breads]);

  intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' });

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
