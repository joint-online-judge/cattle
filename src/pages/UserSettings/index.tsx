import React from 'react';
import { IRouteComponentProps, useIntl } from 'umi';
import General from './General';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';

import Domains from '@/components/Domain/Domains';
import { Menu } from 'antd';

// const menuItems: SettingsMenuItem[] = [
//   {
//     menuKey: 'SETTINGS.GENERAL_SETTINGS',
//     component: <General />,
//   },
//   {
//     menuKey: 'SETTINGS.ACCOUNT_SETTINGS',
//     // TODO: component: (<General />),
//   },
//   {
//     menuKey: 'SETTINGS.SECURITY_SETTINGS',
//     // TODO: component: (<General />),
//   },
//   {
//     menuKey: 'DOMAIN.DOMAINS',
//     component: <Domains />,
//   },
// ];

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  const intl = useIntl();
  return (
    <>
      <SideMenuPage
        defaultTab="SETTINGS.GENERAL_SETTINGS"
        route={route}
        routerMode="param"
        matchMode="children"
        menu={
          <Menu mode="inline">
            <Menu.Item
              key="SETTINGS.GENERAL_SETTINGS"
              style={{ margin: 0 }}
            >
              {intl.formatMessage({ id: 'SETTINGS.GENERAL_SETTINGS' })}
            </Menu.Item>
            <Menu.Item
              key="SETTINGS.ACCOUNT_SETTINGS"
              style={{ margin: 0 }}
            >
              {intl.formatMessage({ id: 'SETTINGS.ACCOUNT_SETTINGS' })}
            </Menu.Item>
            <Menu.Item
              key="DOMAIN.DOMAINS"
              style={{ margin: 0 }}
            >
              {intl.formatMessage({ id: 'DOMAIN.DOMAINS' })}
            </Menu.Item>
          </Menu>
        }
      >
        <PageContent menuKey="SETTINGS.GENERAL_SETTINGS">
          <General />
        </PageContent>
        <PageContent menuKey="DOMAIN.DOMAINS">
          <Domains />
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
