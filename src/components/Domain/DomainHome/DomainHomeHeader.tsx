import React, { useEffect } from 'react';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import {
  Avatar, Typography, Row, Col, Spin, message
} from 'antd';
import { gravatarImageUrl } from '@/utils';
import { DomainService } from '@/client';
import style from './style.css';

const { Title } = Typography;

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { data, run } = useRequest(async () => {
    const res = await DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data;
  }, {
    manual: true,
    onError: () => {
      message.error('failed to fetch domain info')
    }
  });

  useEffect(() => {
    (async () => {
      await run();
    })();
  }, []);

  return (
    <Spin spinning={!data}>
      {data ? (
        <Typography className={style.homeHeader}>
          <Row
            gutter={{ xs: 16, md: 24 }}
            justify="center"
          >
            <Col flex="100px">
              <Avatar
                shape="square"
                size={100}
                src={gravatarImageUrl(data.gravatar)}
                alt={`@${data.name}`}
              />
            </Col>
            <Col flex="auto">
              <Title
                level={3}
                className={style.homeTitle}
              >
                {data.name}
              </Title>
            </Col>
          </Row>
        </Typography>
      ) : null}
    </Spin>
  );
};

export default Index;
