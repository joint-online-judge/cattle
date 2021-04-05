import React, { useEffect, useState } from 'react';
import { Col, PageHeader, Row, Spin } from 'antd';
import { SettingsSideBar } from 'app/components/Settings';
import { CONTENT_GRID_LAYOUT } from 'app/constants';
import { UpdateDomain } from 'app/components';
import { gravatarImageUrl } from 'app/utils';
import style from 'app/containers/UserSettings/style.css';
import { SettingsMenuItem } from 'types';
import { useParams } from 'react-router';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';

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
    <Row justify="center">
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row>
          {data ? (
            <PageHeader
              className={style.userInfoHeader}
              title={data.name}
              subTitle={data.url}
              avatar={{ src: gravatarImageUrl(data.gravatar) }}
            />
          ) : <Spin />}
        </Row>
        <Row
          gutter={[
            {
              lg: 24,
            }, {
              xs: 16,
              sm: 16,
              lg: 16,
            }]}
        >
          <Col xs={24} sm={24} lg={6}>
            <SettingsSideBar
              items={menuItems}
              selectedKeys={[key]}
              onChange={({ key }) => setKey(key as string)}
            />
          </Col>
          <Col xs={24} sm={24} lg={18}>
            {key ? menuItems.find(o => o.key === key)?.component : null}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
