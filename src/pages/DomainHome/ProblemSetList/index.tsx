import React, { useEffect } from 'react';
import { Row, List, message, Typography, Button, Skeleton, Divider, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useIntl, history, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import mm from 'moment';

interface IProps {
  domainId: string;
}

const { Title } = Typography;

const Index: React.FC<IProps> = ({ domainId }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data: problemSets, run, loading } = useRequest(
    async () => {
      if (!domainId) return [];
      const res = await Horse.problemSet.listProblemSetsApiV1ProblemSetsGet({
        domain: domainId,
        sort: -1,
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

  const getStatusBadge = (availableTimeStr: string, dueTimeStr: string) => {
    const now = (new Date()).getTime();
    const availableTime = (new Date(availableTimeStr)).getTime();
    const dueTime = (new Date(dueTimeStr)).getTime();

    if (now < availableTime) {
      return <Badge status="default" text="Not Started" />;
    }

    if (now > dueTime) {
      return <Badge status="error" text="Overdue" />;
    }

    return <Badge status="processing" text="Ongoing" />;
  };

  useEffect(() => {
    run();
  }, [domainId]);

  return (
    <>
      <Row justify="end">
        <Button
          icon={<PlusOutlined />}
          onClick={() => history.push(`/domain/${domainUrl}/create-problem-set`)}
          type="primary"
        >
          Add Problem Sets
        </Button>
      </Row>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={problemSets || []}
        renderItem={(item) => (
          <List.Item actions={[
            <Link to={`/problem-set/${item.id}`}>Detail</Link>,
            <Link to={`/problem-set/${item.id}/settings`}>Edit</Link>,
          ]}>
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <Link to={`/problem-set/${item.id}`}>
                    <Title level={4}>{item.title}</Title>
                  </Link>
                }
                description={
                  <>
                    {mm(item.available_time).format('YYYY-MM-DD HH:mm')}
                    <Divider type="vertical" />
                    {mm(item.due_time).format('YYYY-MM-DD HH:mm')}
                  </>
                }
              />
              <div>{getStatusBadge(item.available_time, item.due_time)}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Index;
