import React, { useEffect } from 'react';
import { Col, Row, Typography, Avatar, Spin, Button } from 'antd';
import { useParams, useIntl, useModel, history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProblemSetList from './ProblemSetList';
import style from './style.css';
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
    <div>
      {domain?.bulletin ? (
        <ShadowCard
          title={intl.formatMessage({ id: 'DOMAIN.CREATE.BULLETIN' })}
          className={style.contentCard}
        >
          <MarkdownRender>{domain?.bulletin ?? ''}</MarkdownRender>
        </ShadowCard>
      ) : null}
      <ShadowCard
        title={intl.formatMessage({ id: 'PROBLEM_SET.PROBLEM_SET' })}
        className={style.contentCard}
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
    </div>
  );
};

export default Index;
