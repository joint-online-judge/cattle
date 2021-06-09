import React from 'react';
import { Card, CardProps } from 'antd';
import { PageContentProps } from './PageContent';

const ContentCard: React.FC<PageContentProps & CardProps> = (props) => {
  const { children } = props;

  return (
    <Card>
      {children}
    </Card>
  );
};

export default ContentCard;
