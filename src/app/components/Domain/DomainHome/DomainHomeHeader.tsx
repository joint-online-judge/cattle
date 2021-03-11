import { observer } from 'mobx-react';
import React from 'react';
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
  const { url } = useParams<{ url: string }>();
  const domainHook = useRequest(async () => {
    return DomainService.getDomainApiV1DomainsDomainGet(url);
  });
  return (
    <Spin spinning={domainHook.loading}>
      {domainHook.loading ? null : (
        <Typography id={style.HomeHeader}>
          <Row
            gutter={{ xs: 16, md: 24 }}
            justify="center"
          >
            <Col flex="100px">
              <Avatar
                shape="square"
                size={100}
                src={gravatarImageUrl(domainHook.data.gravatar)}
                alt={`@${domainHook.data.name}`}
              />
            </Col>
            <Col flex="auto">
              <Title
                level={3}
                id={style.HomeTitle}
              >
                {domainHook.data.name}
              </Title>
            </Col>
          </Row>
        </Typography>
      )}
    </Spin>
  );
});
