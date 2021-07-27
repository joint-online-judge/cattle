import React from 'react';
import { Spin, Typography } from 'antd';
import { Problem } from '@/client';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const { Title } = Typography;

interface ProblemHomeProps {
  problem: Problem | undefined;
}

const Index: React.FC<ProblemHomeProps> = (props) => {
  const { problem } = props;
  return (
    <ShadowCard
      title={
        <Title level={3}>{problem?.title || <Spin size="default" />}</Title>
      }
    >
      {problem ? (
        <Typography>
          <MarkdownRender
            children={problem.content || ''}
          />
        </Typography>
      ) : (
        <Spin size="default" />
      )}
    </ShadowCard>
  );
};

export default Index;
