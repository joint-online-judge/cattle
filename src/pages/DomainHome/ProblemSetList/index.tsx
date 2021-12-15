import React, { useEffect } from 'react';
import { List, message, Typography, Skeleton, Progress, Badge } from 'antd';
import { Link } from 'umi';
import { useRequest } from 'ahooks';
import mm from 'moment';
import Horse from '@/utils/service';

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
      const res = await Horse.problemSet.v1ListProblemSets(domainId, {
        ordering: '-created_at',
      });
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
    unlockAtString: string | undefined,
    dueAtString: string | undefined,
    lockAtString: string | undefined,
  ) => {
    const now = Date.now();
    const unlockAt = unlockAtString
      ? new Date(unlockAtString).getTime()
      : undefined;
    const dueAt = dueAtString ? new Date(dueAtString).getTime() : undefined;
    const lockAt = lockAtString ? new Date(lockAtString).getTime() : undefined;

    if (unlockAt && now < unlockAt) {
      return <Badge status="default" text="Not Started" />;
    }

    if (lockAt && now > lockAt) {
      return <Badge status="error" text="Ended" />;
    }

    if (lockAt && now > lockAt) {
      return <Badge status="error" text="Ended" />;
    }

    if (dueAt && now > dueAt) {
      return <Badge status="warning" text="Overdue" />;
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
            actions={[getStatusBadge(item.unlockAt, item.dueAt, item.lockAt)]}
          >
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <Link to={`/domain/${domainId}/problem-set/${item.id}`}>
                    <h2 className="text-2xl font-light">{item.title}</h2>
                  </Link>
                }
                description={
                  <>
                    {item.dueAt
                      ? mm(item.dueAt).format('YYYY-MM-DD HH:mm')
                      : 'No Due Date'}
                  </>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Index;
