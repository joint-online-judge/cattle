import React from 'react';
import { Card, CardProps } from 'antd';
import { merge } from 'lodash';

const Index: React.FC<CardProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Card
      bordered={false}
      {...merge(otherProps, {
        className: otherProps.className
          ? `shadow-md ${otherProps.className}`
          : 'shadow-md',
      })}
    >
      {children}
    </Card>
  );
};

export default Index;
