import React from 'react';
import { useParams } from 'umi';
import { UpsertProblemSetForm } from '@/components/ProblemSet';
import ShadowCard from '@/components/ShadowCard';
import { ProblemSetDetail } from '@/utils/service';

interface IProps {
  problemSet: ProblemSetDetail | undefined;
  loading: boolean;
  onUpdateSuccess?: () => void;
}

const ProblemSetEditDetail: React.FC<IProps> = (props) => {
  const { problemSet, loading, onUpdateSuccess } = props;
  const { domainUrl } = useParams<{ domainUrl: string }>();

  return (
    <ShadowCard loading={loading}>
      <UpsertProblemSetForm
        domainUrl={domainUrl}
        initialValues={problemSet}
        onUpdateSuccess={onUpdateSuccess}
      />
    </ShadowCard>
  );
};

export default ProblemSetEditDetail;
