import React, { useEffect } from 'react';
import { Col, Row, Typography, Avatar, Spin, Button } from 'antd';
import { useParams, useIntl, useModel, history } from 'umi';
import { gravatarImageUrl } from '@/utils';
import ProblemSetList from './ProblemSetList';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';
import { PlusOutlined } from '@ant-design/icons';
import style from './style.css';

const { Title, Paragraph } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { removeHeader } = useModel('pageHeader');

  useEffect(() => {
    removeHeader();
  }, []);

  return (
    <div>
      <ShadowCard className={style.contentCard}>
        <Spin spinning={!domain}>
          {domain ? (
            <Typography>
              <Row gutter={{ xs: 16, md: 24 }} justify="center">
                <Col span={4}>
                  <Avatar
                    shape="square"
                    size={100}
                    src={gravatarImageUrl(domain.gravatar)}
                    alt={`@${domain.name}`}
                  />
                </Col>
                <Col span={20}>
                  <Title level={3}>{domain.name}</Title>
                  <MarkdownRender children={domain?.bulletin || ''} />
                  {/* <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    <MarkdownRender children={domain?.bulletin || ''} />
                  </Paragraph> */}
                </Col>
              </Row>
            </Typography>
          ) : null}
        </Spin>
      </ShadowCard>
      <ShadowCard
        title={intl.formatMessage({ id: 'PROBLEM_SET.PROBLEM_SET' })}
        className={style.contentCard}
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() =>
              history.push(`/domain/${domainUrl}/create-problem-set`)
            }
            type="primary"
          >
            {intl.formatMessage({ id: 'PROBLEM_SET.CREATE.TITLE' })}
          </Button>
        }
      >
        <ProblemSetList domainId={domain?.id || ''} />
      </ShadowCard>
    </div>
  );
};
export default Index;
