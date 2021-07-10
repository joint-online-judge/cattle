import React, { useState } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useModel } from 'umi';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import Domains from '@/components/Domain/Domains';
import General from './General';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';
import ShadowCard from '@/components/ShadowCard';

const menuItems: SettingsMenuItem[] = [
  {
    menuKey: 'SETTINGS.GENERAL_SETTINGS',
    component: <General />,
  },
  {
    menuKey: 'SETTINGS.ACCOUNT_SETTINGS',
    // TODO: component: (<General />),
  },
  {
    menuKey: 'SETTINGS.SECURITY_SETTINGS',
    // TODO: component: (<General />),
  },
  {
    menuKey: 'DOMAIN.DOMAINS',
    component: <Domains />,
  },
];

const Index: React.FC = () => {
  const [key, setKey] = useState<string>(menuItems[0].key);
  const { initialState } = useModel('@@initialState');

  return (
    <div>
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
            onClick={({ key: menuKey }) => setKey(menuKey as string)}
          />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          <ShadowCard>
            {key ? menuItems.find((o) => o.key === key)?.component : null}
          </ShadowCard>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
