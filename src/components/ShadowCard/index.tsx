import React from 'react';
import { Card, CardProps } from 'antd';
import { merge } from 'lodash-es';

const Index: React.FC<CardProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Card
      bordered={false}
      {
        ...merge(otherProps, {
          style: {
            boxShadow: '0 2px 8px #dfdfdf',
          },
        })
      }
    >
      {children}
    </Card>
  );
};

export default Index;
