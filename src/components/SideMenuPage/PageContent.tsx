import React, { ReactNode } from 'react';

export interface PageContentProps {
  menuKey: string;
  i18nKey?: string; // use menuKey as default
  text?: string; // use i18n(i18nKey) as default
  path?: string;
  node?: ReactNode;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default PageContent;
