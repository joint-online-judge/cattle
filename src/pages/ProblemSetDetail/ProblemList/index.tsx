import { List, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';

const Index: React.FC = () => {
  const { domainUrl, problemSetId } =
    useParams<{ problemSetId: string; domainUrl: string }>();

  const { data: problems, run } = useRequest(
    async () => {
      if (!problemSetId) return [];
      const res = await Horse.problem.listProblemsApiV1DomainsDomainProblemsGet(
        domainUrl,
        {
          problemSet: problemSetId,
        },
      );
      return res?.data?.data?.results ?? [];
    },
    {
      manual: true,
      onError: () => {
        message.error('failed to fetch problem sets');
      },
    },
  );

  useEffect(() => {
    run();
  }, [problemSetId]);

  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={problems ?? []}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/problem/${item.id ?? ''}`}>
              <strong>{item.title}</strong>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default Index;
