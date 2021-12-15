import { useState } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { Horse } from '@/utils/service';

/**
 * Global problem set data model.
 * Every page below a domain and uses problem set data should use this model.
 * Data are initialized in the layout component.
 * Specially, you can consider this model as loading the `problemSetId`
 * in the site URL.
 */
export default function DomainModel() {
  const [problemSetId, setProblemSetId] = useState<string>();

  const {
    data: problemSet,
    run: fetchProblemSet,
    loading,
    refresh,
  } = useRequest(
    async (
      domainUrl: string | undefined | null,
      problemSetId: string | undefined | null,
    ) => {
      if (
        typeof domainUrl === 'string' &&
        domainUrl.length > 0 &&
        typeof problemSetId === 'string' &&
        problemSetId.length > 0
      ) {
        setProblemSetId(problemSetId);
        const res = await Horse.problemSet.v1GetProblemSet(
          domainUrl,
          problemSetId,
        );
        return res.data.data;
      } else {
        setProblemSetId(undefined);
        return undefined;
      }
    },
    {
      manual: true,
      onError: () => {
        // TODO: i18n message
        message.error('failed to fetch problem set');
      },
    },
  );

  return {
    problemSetId,
    problemSet,
    fetchProblemSet,
    refresh,
    loading,
  };
}
