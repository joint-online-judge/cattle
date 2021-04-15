import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Avatar, Typography, Row, Col, Spin,
} from 'antd';
import { gravatarImageUrl } from 'app/utils';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';
import style from './style.css';

const { Title } = Typography;
export const DomainHomeHeader = observer(() => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { data, run } = useRequest(async () => {
    return DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
  }, { manual: true });
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
});
