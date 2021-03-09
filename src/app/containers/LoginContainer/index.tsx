import React from 'react';
import { Spin, Result } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
import { useAuth } from 'app/components/Auth';
import { Redirect, useLocation } from 'react-router';
import { BASE_URL } from 'app/constants';
import { useTranslation } from 'react-i18next';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const LoginContainer = observer(() => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation<{ from: Location }>();
  const query = useQuery();
  const profileHook = useRequest(async () => {
    // redirect back from jAccount page
    if (query.get('action') === 'profile' && query.get('from')) {
      try {
        await auth.login();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    // either fetch profile fails or try to login normally
    if (!auth.loggedIn) {
      const { from } = location.state || { from: { pathname: '/' } };
      window.location.href = (
        await UserService.jaccountLoginApiV1UserJaccountLoginGet(
          `${BASE_URL}/login/?action=profile&from=${from.pathname}`,
          false
        )
      ).redirect_url;
    }
  });
  return (
    <Spin spinning={profileHook.loading} size="large">
      {auth.loggedIn ? (
        <Redirect to={query.get('from') || '/'} />
      ) : (
        <Result
          icon={<Spin size="large" />}
          title={t('USERS.LOGIN.REDIRECTING')}
        />
      )}
    </Spin>
  );
});
