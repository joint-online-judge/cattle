import React, { useEffect } from 'react';
import { Col, Row, Typography, Avatar, Spin, Button } from 'antd';
import { useParams, useIntl, useModel, history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProblemSetList from './ProblemSetList';
import { gravatarImageUrl } from '@/utils';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const { Title } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { removeHeader } = useModel('pageHeader');

  useEffect(() => {
    removeHeader();
  }, []);

  return (
    <Row gutter={[0, 24]}>
      {domain?.bulletin ? (
        <Col span={24}>
          <ShadowCard
            title={intl.formatMessage({ id: 'DOMAIN.CREATE.BULLETIN' })}
          >
            <MarkdownRender>{domain?.bulletin ?? ''}</MarkdownRender>
          </ShadowCard>
        </Col>
      ) : null}
      <Col span={24}>
        <ShadowCard
          title={intl.formatMessage({ id: 'PROBLEM_SET.PROBLEM_SET' })}
          extra={
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                history.push(`/domain/${domainUrl}/create-problem-set`);
              }}
              type="primary"
            >
              {intl.formatMessage({ id: 'PROBLEM_SET.CREATE.TITLE' })}
            </Button>
          }
        >
          <ProblemSetList domainId={domainUrl} />
        </ShadowCard>
      </Col>
    </Row>
  );
};

export default Index;
