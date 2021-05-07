import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Col, PageHeader, Row, Spin, Card } from 'antd';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import UpdateDomain from '@/components/Domain/DomainHome/UpdateDomain';
import { SettingsMenuItem } from '@/components/Settings/typings';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';
import { gravatarImageUrl } from '@/utils';
import style from './style.css';

const menuItems: SettingsMenuItem[] = [
  {
    key: 'SETTINGS.DOMAIN.PROFILE',
    path: '/profile',
    component: (<UpdateDomain />),
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

export const DomainSettings: React.FC = () => {
  const [key, setKey] = useState<string>(menuItems[0].key);
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { run, data } = useRequest(async () => {
    return DomainService.getDomainApiV1DomainsDomainGet(domainUrl);
  }, { manual: true });
  useEffect(() => {
    (async () => {
      await run();
    })();
  }, []);

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
            onChange={({ key: menuKey }) => setKey(menuKey as string)}
          />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          {key ? menuItems.find((o) => o.key === key)?.component : null}
        </Col>
      </Row>
    </Card>
  );
};
