import React from 'react';
import { Empty } from 'antd';
import { ProblemDetailWithLatestRecord } from '@/client';
import MarkdownRender from '@/components/MarkdownRender';

interface ProblemHomeProps {
  problem: ProblemDetailWithLatestRecord | undefined;
}

const Index: React.FC<ProblemHomeProps> = (props) => {
  const { problem } = props;
  return (
    <>
      {problem?.content ? (
        <MarkdownRender>{problem.content || 'No Description'}</MarkdownRender>
      ) : (
        <Empty description={<span>No description for this problem!</span>} />
      )}
    </>
  );
};

export default Index;
