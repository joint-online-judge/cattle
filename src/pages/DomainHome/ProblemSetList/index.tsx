import React, { useEffect } from 'react';
import { List, message, Typography, Skeleton, Divider, Badge } from 'antd';
import { Link } from 'umi';
import { useRequest } from 'ahooks';
import mm from 'moment';
import { Horse } from '@/utils/service';

interface IProps {
  domainId: string;
}

const { Title } = Typography;

const Index: React.FC<IProps> = ({ domainId }) => {
  const {
    data: problemSets,
    run,
    loading,
  } = useRequest(
    async () => {
      if (!domainId) return [];
      const res =
        await Horse.problemSet.listProblemSetsApiV1DomainsDomainProblemSetsGet(
          domainId,
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

  const getStatusBadge = (
    availableTimeString: string | undefined,
    dueTimeString: string | undefined,
  ) => {
    if (!availableTimeString || !dueTimeString) {
      return <Badge status="default" text="Unknown" />;
    }

    const now = Date.now();
    const availableTime = new Date(availableTimeString).getTime();
    const dueTime = new Date(dueTimeString).getTime();

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
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={problemSets ?? []}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={`/domain/${domainId}/problem-set/${item.id}`}>
                Detail
              </Link>,
              <Link to={`/domain/${domainId}/problem-set/${item.id}/settings`}>
                Edit
              </Link>,
            ]}
          >
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <Link to={`/domain/${domainId}/problem-set/${item.id}`}>
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
