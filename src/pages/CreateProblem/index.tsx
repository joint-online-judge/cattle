import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useIntl } from 'umi';
import { UpsertProblem } from '@/components/Problem';
import ShadowCard from '@/components/ShadowCard';
import { useParams } from 'umi';

const Index: React.FC = () => {
  const intl = useIntl();
  const { problemSetId } = useParams<{ problemSetId: string }>();
  return (
    <Row justify="center">
      <Col span={16}>
        <ShadowCard
          title={
            <Typography.Title level={2}>
              {intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' })}
            </Typography.Title>
          }
        >
          <UpsertProblem initialValues={{ problem_set: problemSetId }} />
        </ShadowCard>
      </Col>
    </Row>
  );
};
export default Index;
