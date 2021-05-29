import {
  List,
  Typography,
  message, Button,
} from 'antd';
import React, { useEffect } from 'react';
import { useIntl, Link, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { ProblemService } from '@/client';
import { PlusOutlined } from '@ant-design/icons';
import { history } from '@@/core/history';

interface IProps {
  problemSetId: string;
}

const { Text } = Typography;

const Index: React.FC<IProps> = ({ problemSetId }) => {
  const intl = useIntl();

  const { data: problems, run } = useRequest(async () => {
    if (!problemSetId) return [];
    const res = await ProblemService.listProblemsApiV1ProblemsGet(undefined, problemSetId);
    return res.data?.results;
  }, {
    manual: true,
    onError: () => {
      message.error('failed to fetch problem sets');
    },
  });

  useEffect(() => {
    run();
  }, [problemSetId]);

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => history.push(`/problem-set/${problemSetId}/create-problem`)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Problems
      </Button>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={problems || []}
        renderItem={(item) => (
          <List.Item>
            <Link
              to={`/problem/${item.id}`}
            >
              <strong>{item.title}</strong>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default Index;
