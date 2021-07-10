import React from 'react';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';

export type PageContentProps = SettingsMenuItem;

const PageContent: React.FC<PageContentProps> = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default PageContent;
