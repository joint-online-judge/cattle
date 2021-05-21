import {
  List,
  Typography,
  message,
} from 'antd';
import React, { useEffect } from 'react';
import { useIntl, Link } from 'umi';
import { useRequest } from 'ahooks';
import { ProblemSetService } from '@/client';

interface IProps {
  domainId: string;
}

const { Text } = Typography;

const Index: React.FC<IProps> = ({ domainId }) => {
  const intl = useIntl();

  const { data: problemSets, run } = useRequest(async () => {
    if (!domainId) return [];
    const res = await ProblemSetService.listProblemSetsApiV1ProblemSetsGet(domainId);
    return res.data?.results;
  }, {
    manual: true,
    onError: () => {
      message.error('failed to fetch problem sets');
    },
  });

  useEffect(() => {
    run();
  }, [domainId]);

  return (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={problemSets || []}
      renderItem={(item) => (
        <List.Item>
          <Link
            to={`/problem-set/${item.id}`}
          >
            <strong>{item.title}</strong>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default Index;
