import React from 'react';
import ShadowCard from '@/components/ShadowCard';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';

export type PageContentProps = SettingsMenuItem;

const PageContent: React.FC<PageContentProps> = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <ShadowCard>{children}</ShadowCard>
    </React.Fragment>
  );
};

export default PageContent;
