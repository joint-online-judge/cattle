import React, { useEffect, useMemo } from 'react';
import { IRouteComponentProps } from 'umi';
import SideMenuPage from '@/components/SideMenuPage';
import { useModel } from '@@/plugin-model/useModel';

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => {
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
