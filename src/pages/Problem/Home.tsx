import React from 'react';
import { Card, Spin, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Problem } from '@/client';

const { Title } = Typography;

interface ProblemHomeProps {
  problem: Problem | undefined;
}

const Index: React.FC<ProblemHomeProps> = (props) => {
  const { problem } = props;
  return (
    <Card
      title={
        <Title level={2}>{problem?.title || <Spin size="default" />}</Title>
      }
    >
      {problem ? (
        <ReactMarkdown remarkPlugins={[gfm]} children={problem.content || ''} />
      ) : (
        <Spin size="default" />
      )}
    </Card>
  );
};

export default Index;
