import React, { useEffect, useMemo } from 'react';
import { IRouteComponentProps, useIntl } from 'umi';
import SideMenuPage from '@/components/SideMenuPage';
import { useModel } from '@@/plugin-model/useModel';

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

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => {
  const intl = useIntl();
  const { setHeader } = useModel('pageHeader');
  const breads = useMemo(
    () => [
      {
        path: 'settings',
        breadcrumbI18nKey: 'settings.header',
      },
    ],
    [],
  );
  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'settings.header',
    });
  }, []);
  return (
    <SideMenuPage
      route={route}
    >
      {children}
    </SideMenuPage>
  );
};

export default Index;
