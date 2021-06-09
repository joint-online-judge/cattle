import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Col, PageHeader, Row, Spin } from 'antd';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import UpdateDomain from './UpdateDomain';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import { gravatarImageUrl } from '@/utils';
import ShadowCard from '@/components/ShadowCard';
import style from './style.css';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { data, refresh } = useRequest(async () => {
    const res = await Horse.domain.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data.data;
  });

  const menuItems: SettingsMenuItem[] = [
    {
      menuKey: 'SETTINGS.DOMAIN.PROFILE',
      path: '/profile',
      component: <UpdateDomain refresh={refresh} />,
    },
    {
      menuKey: 'SETTINGS.DOMAIN.INVITATION',
      component: <UpdateDomain refresh={refresh} />,
      path: '/invitation',
    },
    {
      menuKey: 'SETTINGS.DOMAIN.MEMBERS',
      component: <UpdateDomain refresh={refresh} />,
      path: '/members',
    },
  ];
  const [key, setKey] = useState<string>(menuItems[0].key);

  return (
    <ShadowCard
      title={
        data ? (
          <PageHeader
            className={style.userInfoHeader}
            title={data.name}
            subTitle={data.url}
            avatar={{ src: gravatarImageUrl(data.gravatar) }}
          />
        ) : (
          <Spin />
        )
      }
    >
      <Row
        gutter={[
          {
            lg: 24,
            xl: 32,
          },
          {
            xs: 16,
            sm: 16,
          },
        ]}
      >
        <Col xs={24} sm={24} lg={6}>
          <SettingsSideBar
            items={menuItems}
            selectedKeys={[key]}
            onClick={(e) => setKey(e.key.toString())}
          />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          {key ? menuItems.find((o) => o.menuKey === key)?.component : null}
        </Col>
      </Row>
    </ShadowCard>
  );
};

export default Index;
