import React from 'react';
import { CardProps } from 'antd';
import ShadowCard from '@/components/ShadowCard';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';

export type PageContentProps = SettingsMenuItem & {
  shadowCard?: boolean;
  cardProps?: CardProps;
};

const PageContent: React.FC<PageContentProps> = (props) => {
  const { children, cardProps, shadowCard = true } = props;

  return (
    <React.Fragment>
      {shadowCard ? (
        <ShadowCard {...cardProps}>{children}</ShadowCard>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default PageContent;
