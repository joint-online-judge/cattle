import React from 'react';
import { CardProps } from 'antd';
import ShadowCard from '@/components/ShadowCard';
import { PageContentProps } from './PageContent';

interface IProps extends PageContentProps {
  cardProps: CardProps;
}

const ContentCard: React.FC<IProps> = (props) => {
  const { children, cardProps } = props;

  return (
    <ShadowCard {...cardProps}>
      {children}
    </ShadowCard>
  );
};

export default ContentCard;
