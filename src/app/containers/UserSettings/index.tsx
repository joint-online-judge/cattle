import React, { useState } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { SettingsSideBar } from 'app/components/Settings';
import { CONTENT_GRID_LAYOUT } from 'app/constants';
import { Domains } from 'app/components';
import { useAuth } from 'app/contexts';
import { gravatarImageUrl } from 'app/utils';
import style from 'app/containers/UserSettings/style.css';
import { SettingsMenuItem } from 'types';
import General from './General';

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

export const UserSettings: React.FC = () => {
  const [key, setKey] = useState<string>(menuItems[0].key);
  const auth = useAuth();

  return (
    <Row justify="center">
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row>
          <PageHeader
            className={style.userInfoHeader}
            title={auth.profile.real_name}
            subTitle={auth.profile.student_id}
            avatar={{ src: gravatarImageUrl(auth.profile.gravatar) }}
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
