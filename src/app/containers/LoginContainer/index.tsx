import * as React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';
import { useUserStore } from 'app/stores';
import { gravatarImageUrl } from 'app/utils';
import { UserModel } from 'app/models';

export const LoginContainer = observer(() => {
  const userStore = useUserStore(new UserModel());

  if (!userStore.loggedIn) {
    UserService.getUserApiV1UserUidGet('me').then((profile) => {
      userStore.login(profile);
    });
  }

  const loginResult = useRequest(async () => {
    window.location.href = (await UserService.jaccountLoginApiV1UserJaccountLoginGet(
      'http://127.0.0.1:3000/login', false,
    )).redirect_url;
  }, { manual: true });

  const logoutResult = useRequest(async () => {
    window.location.href = (await UserService.logoutApiV1UserLogoutGet(
      'http://127.0.0.1:3000/login', false,
    )).redirect_url;
  }, { manual: true });

  return userStore.loggedIn ? (
    <div>
      <img
        src={gravatarImageUrl(userStore.profile.gravatar)}
        alt={`${userStore.profile.uname} gravatar`}
      />
      <Button
        onClick={logoutResult.run}
        loading={logoutResult.loading}
      >
        Log out
      </Button>
    </div>
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
  );
});
