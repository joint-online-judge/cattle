import React, { useContext } from 'react';
import { Empty } from 'antd';
import ProblemContext from '../context';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const Index: React.FC = () => {
  const problemContext = useContext(ProblemContext);

  return (
    <ShadowCard title={'Problem Description'}>
      {problemContext?.problem?.content ? (
        <MarkdownRender>
          {problemContext?.problem?.content || 'No Description'}
        </MarkdownRender>
      ) : (
        <Empty description={<span>No description for this problem!</span>} />
      )}
    </ShadowCard>
  );
};

export default Index;
