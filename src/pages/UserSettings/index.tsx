import React, { useEffect, useMemo } from 'react';
import { IRouteComponentProps } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
import SideMenuPage from '@/components/SideMenuPage';

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
  }, [breads, setHeader]);

  return (
    <SideMenuPage route={route} shadowCard={false}>
      {children}
    </SideMenuPage>
  );
};

export default Index;
