import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Access, history, useAccess, useIntl, useModel, useParams } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProblemSetList from './ProblemSetList';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { removeHeader } = useModel('pageHeader');
  const access = useAccess();

  useEffect(() => {
    removeHeader();
  }, []);

  return (
    <ShadowCard
      title={intl.formatMessage({ id: 'PROBLEM_SET.PROBLEM_SET' })}
      extra={
        <Access accessible={access.canCreateProblemSet}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(`/domain/${domainUrl}/create-problem-set`);
            }}
            type="primary"
          >
            {intl.formatMessage({ id: 'PROBLEM_SET.CREATE.TITLE' })}
          </Button>
        </Access>
      }
      bodyStyle={{ padding: 0 }}
    >
      <ProblemSetList domainId={domainUrl} />
    </ShadowCard>

  );
};

export default Index;
