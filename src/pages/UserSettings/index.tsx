import React, { useState } from 'react';
import { Col, PageHeader, Row, Card } from 'antd';
import { useModel } from 'umi';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import Domains from '@/components/Domain/Domains';
import General from './General';
import { SettingsMenuItem } from '@/components/Settings/typings';

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
    <div>
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
          <Card>
            {key ? menuItems.find((o) => o.key === key)?.component : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
