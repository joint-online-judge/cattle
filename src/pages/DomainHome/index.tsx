import React from 'react';
import { Col, Row, message, Typography, Avatar, Spin } from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import { gravatarImageUrl } from '@/utils';
import ProblemSetList from './ProblemSetList';
import ShadowCard from '@/components/ShadowCard';
import style from './style.css';

const { Title, Paragraph } = Typography;

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data: domain } = useRequest(
    async () => {
      const res = await Horse.domain.getDomainApiV1DomainsDomainGet(domainUrl);
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
      <ShadowCard className={style.contentCard}>
        <Spin spinning={!domain}>
          {domain ? (
            <Typography className={style.homeHeader}>
              <Row gutter={{ xs: 16, md: 24 }} justify="center">
                <Col flex="100px">
                  <Avatar
                    shape="square"
                    size={100}
                    src={gravatarImageUrl(domain.gravatar)}
                    alt={`@${domain.name}`}
                  />
                </Col>
                <Col flex="1">
                  <Title level={3}>{domain.name}</Title>
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {domain.bulletin}
                  </Paragraph>
                </Col>
              </Row>
            </Typography>
          ) : null}
        </Spin>
      </ShadowCard>
      <ShadowCard className={style.contentCard}>
        <ProblemSetList domainId={domain?.id || ''} />
      </ShadowCard>
    </div>
  );
};
export default Index;
