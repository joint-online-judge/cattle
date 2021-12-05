import React from 'react';
import { useParams } from 'umi';
import { Problem } from '@/client';
import { UpsertProblemForm } from '@/components/Problem/UpsertProblemForm';

interface ProblemHomeProps {
  problem: Problem | undefined;
  onUpdateSuccess: (problem: Problem) => void;
}

const Index: React.FC<ProblemHomeProps> = (props) => {
  const { problem, onUpdateSuccess } = props;
  const { domainUrl } = useParams<{ domainUrl: string }>();

  return (
    <UpsertProblemForm
      domainUrl={domainUrl}
      initialValues={problem}
      onUpdateSuccess={onUpdateSuccess}
    />
  );
};

export default Index;
