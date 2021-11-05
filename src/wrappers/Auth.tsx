import React from 'react';
import { notification } from 'antd';
import { isNil } from 'lodash';
import { Redirect, useModel } from 'umi';

const Index: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');

  if (isNil(initialState?.user)) {
    notification.warn({
      message: 'Not Authorized',
      description: 'Please sign in first to continue.',
    });
    return <Redirect to={`/login?from=${location.pathname}`} />;
  }

  if (initialState?.user.category !== 'user') {
    notification.info({
      message: 'Not Registerd',
      description: 'Please complete the registration process.',
    });
    return <Redirect to={`/oauth-register?from=${location.pathname}`} />;
  }

  return <>{props.children}</>;
};

export default Index;
