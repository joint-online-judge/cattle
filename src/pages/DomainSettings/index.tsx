import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Col, PageHeader, Row, Spin, Card, Tabs } from 'antd';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import UpdateDomain from './UpdateDomain';
import { SettingsMenuItem } from '@/components/Settings/typings';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';
import { gravatarImageUrl } from '@/utils';
import style from './style.css';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { data, refresh } = useRequest(async () => {
    const res = await DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data;
  });

  const menuItems: SettingsMenuItem[] = [
    {
      key: 'SETTINGS.DOMAIN.PROFILE',
      path: '/profile',
      component: (<UpdateDomain refresh={refresh} />),
    },
    {
      key: 'SETTINGS.DOMAIN.INVITATION',
      path: '/invitation',
    },
    {
      key: 'SETTINGS.DOMAIN.MEMBERS',
      path: '/members',
    },
  ];
  const [key, setKey] = useState<string>(menuItems[0].key);

  return (
    <Card
      title={(
        data ? (
          <PageHeader
            className={style.userInfoHeader}
            title={data.name}
            subTitle={data.url}
            avatar={{ src: gravatarImageUrl(data.gravatar) }}
          />
        ) : <Spin />
      )}
    >
      <Row
        gutter={[
          {
            lg: 24,
            xl: 32,
          }, {
            xs: 16,
            sm: 16,
          }]}
      >
        <Col xs={24} sm={24} lg={6}>
          <SettingsSideBar
            items={menuItems}
            selectedKeys={[key]}
            onClick={e => setKey(e.key.toString())}
          />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          {key ? menuItems.find((o) => o.key === key)?.component : null}
        </Col>
      </Row>
    </Card>
  );
};

export default Index;
