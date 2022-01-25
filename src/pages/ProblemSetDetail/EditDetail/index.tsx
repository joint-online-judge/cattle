import { UpsertProblemSetForm } from '@/components/ProblemSet';
import ShadowCard from '@/components/ShadowCard';
import { ProblemSetDetail } from '@/utils/service';
import React from 'react';
import { useParams } from 'umi';

interface IProps {
  problemSet: ProblemSetDetail | undefined;
  loading: boolean;
}

const ProblemSetEditDetail: React.FC<IProps> = (props) => {
  const { problemSet, loading } = props;
  const { domainUrl } = useParams<{ domainUrl: string }>();

  return (
    <ShadowCard loading={loading}>
      <UpsertProblemSetForm domainUrl={domainUrl} initialValues={problemSet} />
    </ShadowCard>
  );
};

export default ProblemSetEditDetail;
