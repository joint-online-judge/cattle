import React, { useState } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useModel } from 'umi';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import Domains from '@/components/Domain/Domains';
import General from './General';
import { gravatarImageUrl } from '@/utils';
import { CONTENT_GRID_LAYOUT } from '@/constants';
import { SettingsMenuItem } from '@/components/Settings/typings';
import style from './style.css';

const menuItems: SettingsMenuItem[] = [
  {
    key: 'SETTINGS.GENERAL_SETTINGS',
    component: (<General />),
  },
  {
    key: 'SETTINGS.ACCOUNT_SETTINGS',
    // TODO: component: (<General />),
  },
  {
    key: 'SETTINGS.SECURITY_SETTINGS',
    // TODO: component: (<General />),
  },
  {
    key: 'DOMAIN.DOMAINS',
    component: (<Domains />),
  },
];

const Index: React.FC = () => {
  const [key, setKey] = useState<string>(menuItems[0].key);
  const { initialState } = useModel('@@initialState');

  return (
    <Row justify="center">
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row>
          <PageHeader
            className={style.userInfoHeader}
            title={initialState?.user?.real_name || ''}
            subTitle={initialState?.user?.student_id || ''}
            avatar={{ src: gravatarImageUrl(initialState?.user?.gravatar || '') }}
          />
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
              onChange={({ key: menuKey }) => setKey(menuKey as string)}
            />
          </Col>
          <Col xs={24} sm={24} lg={18}>
            {key ? menuItems.find((o) => o.key === key)?.component : null}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
