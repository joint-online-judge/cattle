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
    <>
      {problem ? (
        <Typography>
          <MarkdownRender>{problem.content ?? ''}</MarkdownRender>
        </Typography>
      ) : (
        <Spin size="default" />
      )}
    </>
  );
};

export default Index;
