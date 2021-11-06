import React from 'react';
import { isNil } from 'lodash';
import { Redirect, useModel } from 'umi';

const Index: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');

  if (isNil(initialState?.user)) {
    return <Redirect to={`/login?from=${location.pathname}`} />;
  }

  if (initialState?.user.category !== 'user') {
    return <Redirect to={`/oauth-register?from=${location.pathname}`} />;
  }

  return <>{props.children}</>;
};

export default Index;
