import React, { useMemo, useEffect } from 'react';
import { useParams, useModel } from 'umi';
import { message, Row, Col } from 'antd';
import { useRequest } from 'ahooks';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import { Horse } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();

  const { data: problemSet } = useRequest(
    async () => {
      const res = await Horse.problemSet.v1GetProblemSet(
        domainUrl,
        problemSetId,
      );
      return res.data.data;
    },
    {
      onError: () => {
        message.error('failed to fetch domain info');
      },
    },
  );

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'problem-set',
        breadcrumbI18nKey: 'PROBLEM_SET.PROBLEM_SET',
      },
      {
        path: problemSetId,
        breadcrumbName: problemSet?.title ?? 'unknown',
      },
      {
        path: 'settings',
      },
    ],
    [domain, problemSet],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'problem_set.side_menu.settings',
    });
  }, [breads]);

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <ShadowCard>12312</ShadowCard>
      </Col>
    </Row>
  );
};

export default Index;
