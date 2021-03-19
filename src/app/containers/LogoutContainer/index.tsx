import React, { useEffect } from 'react';
import { Spin, Result } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
import { useAuth } from 'app/contexts';
import { Redirect } from 'react-router';
import { BASE_URL } from 'app/constants';

export const LogoutContainer = observer(() => {
  const auth = useAuth();
  const { run } = useRequest(async () => {
    if (auth.loggedIn) {
      auth.logout();
      window.location.href = (await UserService.logoutApiV1UserLogoutGet(
        BASE_URL, false,
      )).redirect_url;
    }
  }, { manual: true });

  useEffect(() => {
    (async () => {
      await run();
    })();
  }, []);

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
