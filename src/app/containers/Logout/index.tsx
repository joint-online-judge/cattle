import * as React from 'react';
import { Spin, Result } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
import { useAuth } from 'app/components/Auth';
import { Redirect } from 'react-router';
import config from '@/config';

export const Logout = observer(() => {
  const auth = useAuth();

  useRequest(async () => {
    if (auth.loggedIn) {
      auth.logout();
      window.location.href = (await UserService.logoutApiV1UserLogoutGet(
        config.BASE_URL, false,
      )).redirect_url;
    }
  });

  return auth.loggedIn
    ? (
      <Result
        icon={<Spin size="large" />}
        title="Logging out..."
      />
    ) : (
      <Redirect to="/" />
    );
});
