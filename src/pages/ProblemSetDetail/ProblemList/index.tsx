import { List, Typography, message, Button } from 'antd';
import React, { useEffect } from 'react';
import { useIntl, Link, useParams, history } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';


const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl, problemSetId } = useParams<{ problemSetId: string, domainUrl: string }>();

  const { data: problems, run } = useRequest(
    async () => {
      if (!problemSetId) return [];
      const res = await Horse.problem.listProblemsApiV1DomainsDomainProblemsGet(domainUrl, {
        problem_set: problemSetId,
      });
      return res?.data?.data?.results || [];
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
        dataSource={problems || []}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/problem/${item.id}`}>
              <strong>{item.title}</strong>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default Index;
