import React from 'react';
import { Col, Row, Card, message, Typography, Avatar, Spin } from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import ProblemList from './ProblemList';
import style from './style.css';

const { Title, Paragraph } = Typography;

const Index: React.FC = () => {
  const { problemSetId } = useParams<{ problemSetId: string }>();

  const { data: problemSet } = useRequest(
    async () => {
      const res =
        await Horse.problemSet.getProblemSetApiV1ProblemSetsProblemSetGet(
          problemSetId,
        );
      return res.data.data;
    },
    {
      onError: () => {
        message.error('failed to fetch domain info');
      },
    },
  );

  return (
    <div>
      <Card className={style.contentCard}>
        <Spin spinning={!problemSet}>
          {problemSet ? (
            <Typography className={style.homeHeader}>
              <Title level={3}>{problemSet.title}</Title>
              <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                {problemSet.content}
              </Paragraph>
            </Typography>
          ) : null}
        </Spin>
      </Card>
      <Card className={style.contentCard}>
        <ProblemList problemSetId={problemSet?.id || ''} />
      </Card>
    </div>
  );
};
export default Index;
