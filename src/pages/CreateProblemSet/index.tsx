import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { useIntl } from 'umi';
import { UpsertProblemSetForm } from '@/components/ProblemSet';
import { useParams } from 'umi';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();

  return (
    <Row justify="center">
      <Col span={16}>
        <Card
          title={
            <Typography.Title level={2}>
              {intl.formatMessage({ id: 'PROBLEM_SET.CREATE.TITLE' })}
            </Typography.Title>
          }
        >
          <UpsertProblemSetForm initialValues={{ domain: domainUrl }} />
        </Card>
      </Col>
    </Row>
  );
};
export default Index;
