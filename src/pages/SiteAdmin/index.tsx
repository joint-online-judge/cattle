import React from 'react';
import { IRouteComponentProps } from 'umi';
import SideMenuPage from '@/components/SideMenuPage';

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => {
  return <SideMenuPage route={route}>{children}</SideMenuPage>;
};

export default Index;
