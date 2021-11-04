import React, { useState } from 'react';
import { message, Typography, Spin, Button } from 'antd';
import { useParams, useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import ProblemList from './ProblemList';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import { ErrorCode, Horse } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const { Title } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();
  const [beforeAvailable, setBeforeAvailable] = useState<boolean>(false);
  const [afterDue, setAfterDue] = useState<boolean>(false);

  const { data: problemSet } = useRequest(
    async () => {
      const res =
        await Horse.problemSet.getProblemSetApiV1DomainsDomainProblemSetsProblemSetGet(
          domainUrl,
          problemSetId,
        );
      if (res.data.error_code === ErrorCode.ProblemSetAfterDueError) {
        setAfterDue(true);
      } else if (
        res.data.error_code === ErrorCode.ProblemSetBeforeAvailableError
      ) {
        setBeforeAvailable(true);
      }

      return res.data.data;
    },
    {
      onError: () => {
        message.error('failed to fetch domain info');
      },
    },
  );

  return afterDue ? (
    <AfterDue />
  ) : beforeAvailable ? (
    <BeforeAvailable />
  ) : (
    <div>
      <ShadowCard
        title={intl.formatMessage({ id: 'PROBLEM_SET.INTRODUCTION' })}
      >
        <Spin spinning={!problemSet}>
          {problemSet ? (
            <Typography>
              <Title level={3}>{problemSet.title}</Title>
              <MarkdownRender>{problemSet.content ?? ''}</MarkdownRender>
            </Typography>
          ) : null}
        </Spin>
      </ShadowCard>
      <ShadowCard
        title={intl.formatMessage({ id: 'PROBLEM' })}
        style={{ marginTop: 24 }}
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(
                `/domain/${domainUrl}/problem-set/${problemSetId}/create-problem`,
              );
            }}
            type="primary"
          >
            {intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' })}
          </Button>
        }
      >
        <ProblemList />
      </ShadowCard>
    </div>
  );
};

export default Index;
