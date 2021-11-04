import React from 'react';
import { notification } from 'antd';
import { Redirect, useModel } from 'umi';

const Index: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');

  if (initialState?.user) {
    return <>{props.children}</>;
  }

  notification.warn({
    message: 'Not Authorized',
    description: 'Please sign in first to continue.',
  });
  return <Redirect to={`/login?from=${location.pathname}`} />;
};

export default Index;
