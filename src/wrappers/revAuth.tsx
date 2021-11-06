import React from 'react';
import { Redirect, useModel } from 'umi';

/**
 * A wrapper that prevents-logged in users to access certain routes,
 * e.g. the login page.
 */
const Index: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');

  if (initialState?.user?.category === 'user') {
    return <Redirect to="/" />;
  }

  return <>{props.children}</>;
};

export default Index;
