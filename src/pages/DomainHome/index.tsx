import React from 'react';
import { Col, Row, Card, message, Typography, Avatar, Spin } from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { DomainService, ProblemSetService } from '@/client';
import { gravatarImageUrl } from '@/utils';
import ProblemSetList from './ProblemSetList';
import style from './style.css';

const { Title, Paragraph } = Typography;

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data: domain } = useRequest(async () => {
    const res = await DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data;
  }, {
    onError: () => {
      message.error('failed to fetch domain info');
    },
  });


  return (
    <div>
      <Card className={style.contentCard}>
        <Spin spinning={!domain}>
          {domain ? (
            <Typography className={style.homeHeader}>
              <Row
                gutter={{ xs: 16, md: 24 }}
                justify="center"
              >
                <Col flex="100px">
                  <Avatar
                    shape="square"
                    size={100}
                    src={gravatarImageUrl(domain.gravatar)}
                    alt={`@${domain.name}`}
                  />
                </Col>
                <Col flex="1">
                  <Title level={3}>
                    {domain.name}
                  </Title>
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>{domain.bulletin}</Paragraph>
                </Col>
              </Row>
            </Typography>
          ) : null}
        </Spin>
      </Card>
      <Card className={style.contentCard}>
        <ProblemSetList domainId={domain?.id || ''} />
      </Card>
    </div>
  );
};
export default Index;
