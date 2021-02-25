import * as React from 'react';
import { Spin, Result } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
import { useAuth } from 'app/components/Auth';
import { Redirect, useLocation } from 'react-router';
import { BASE_URL } from 'app/constants';

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
  useRequest(async () => {
    if (!auth.loggedIn) {
      const { from } = location.state || { from: { pathname: '/' } };
      window.location.href = (await UserService.jaccountLoginApiV1UserJaccountLoginGet(
        `${BASE_URL}/login/?action=profile&from=${from.pathname}`, false,
      )).redirect_url;
    }
  });

  return (
    <Spin spinning={profileHook.loading} size="large">
      {
        auth.loggedIn
          ? <Redirect to={query.get('from') || '/'} />
          : (
            <Result
              icon={<Spin size="large" />}
              title="Redirecting to login page..."
            />
          )
      }
    </Spin>
  );
});