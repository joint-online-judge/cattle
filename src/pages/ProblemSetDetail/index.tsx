import React, { useState } from 'react';
import { Col, Row, Card, message, Typography, Avatar, Spin } from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { ErrorCode, Horse } from '@/utils/service';
import ProblemList from './ProblemList';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import ShadowCard from '@/components/ShadowCard';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const { Title } = Typography;

const Index: React.FC = () => {
  const { problemSetId } = useParams<{ problemSetId: string }>();
  const [beforeAvailable, setBeforeAvailable] = useState<boolean>(false);
  const [afterDue, setAfterDue] = useState<boolean>(false);

  const { data: problemSet } = useRequest(
    async () => {
      const res =
        await Horse.problemSet.getProblemSetApiV1ProblemSetsProblemSetGet(
          problemSetId,
        );
      if (res.data.error_code === ErrorCode.ProblemSetAfterDueError) {
        setAfterDue(true);
      } else if (res.data.error_code === ErrorCode.ProblemSetBeforeAvailableError) {
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

  return (
    afterDue ? <AfterDue /> :
      (beforeAvailable ? <BeforeAvailable /> : <div>
        <ShadowCard title={'作业介绍'}>
          <Spin spinning={!problemSet}>
            {
              problemSet ? (
                <Typography>
                  <Title level={3}>{problemSet.title}</Title>
                  <ReactMarkdown remarkPlugins={[gfm]} children={problemSet.content || ''} />
                </Typography>
              ) : null
            }
          </Spin>
        </ShadowCard>
        <ShadowCard style={{ marginTop: 24 }}>
          <ProblemList problemSetId={problemSet?.id || ''} />
        </ShadowCard>
      </div>)
  );
};
export default Index;
