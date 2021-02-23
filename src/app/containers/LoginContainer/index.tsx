import * as React from 'react';
import { Button, Spin } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
// import { gravatarImageUrl } from 'app/utils';
import { useAuth } from 'app/components/Auth';
import { Redirect, useLocation } from 'react-router';
import config from '@/config';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const LoginContainer = observer(() => {
  const auth = useAuth();
  const location = useLocation<{ from: Location }>();
  const query = useQuery();
  const profileHook = useRequest(async () => {
    if (query.get('action') === 'profile' && query.get('from')) {
      await auth.login();
    }
  });
  const loginResult = useRequest(async () => {
    const { from } = location.state || { from: { pathname: '/' } };
    window.location.href = (await UserService.jaccountLoginApiV1UserJaccountLoginGet(
      `${config.BASE_URL}/login/?action=profile&from=${from.pathname}`, false,
    )).redirect_url;
  }, { manual: true });

  return (
    <Spin spinning={profileHook.loading}>
      {auth.loggedIn ? (
        <Redirect to={query.get('from') || '/'} />
      ) : (
        <div>
          <Button
            type="primary"
            onClick={loginResult.run}
            loading={loginResult.loading}
          >
            Login
          </Button>
        </div>
      )}
    </Spin>
  );
});
