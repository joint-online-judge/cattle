import React from 'react';
import { Spin, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Problem } from '@/client';
import ShadowCard from '@/components/ShadowCard';

const { Title } = Typography;

interface ProblemHomeProps {
  problem: Problem | undefined;
}

const Index: React.FC<ProblemHomeProps> = (props) => {
  const { problem } = props;
  return (
    <ShadowCard
      title={
        <Title level={2}>{problem?.title || <Spin size="default" />}</Title>
      }
    >
      {problem ? (
        <Typography>
          <ReactMarkdown
            remarkPlugins={[gfm]}
            children={problem.content || ''}
            components={{
              code: 'kbd'
            }}
          />
        </Typography>
      ) : (
        <Spin size="default" />
      )}
    </ShadowCard>
  );
};

export default Index;
