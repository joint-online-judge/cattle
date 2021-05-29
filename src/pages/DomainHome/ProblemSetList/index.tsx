import React, { useEffect } from 'react';
import { List, message, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useIntl, history, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { ProblemSetService, SortEnum } from '@/client';

interface IProps {
  domainId: string;
}

const { Text } = Typography;

const Index: React.FC<IProps> = ({ domainId }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data: problemSets, run } = useRequest(async () => {
    if (!domainId) return [];
    const res = await ProblemSetService.listProblemSetsApiV1ProblemSetsGet(domainId, SortEnum['_-1']);
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
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => history.push(`/domain/${domainUrl}/create-problem-set`)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Problem Sets
      </Button>
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
    </>
  );
};

export default Index;
