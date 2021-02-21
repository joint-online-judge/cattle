import * as React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserService } from '@/client';

export const LoginContainer = observer(() => {
  const loginResult = useRequest(async () => {
    window.location.href = (await UserService.jaccountLoginApiV1UserJaccountLoginGet(
      'http://127.0.0.1:3000', false,
    )).redirect_url;
  });
  return (
    <div>
      <Button
        type="primary"
        onClick={loginResult.run}
        loading={loginResult.loading}
      >
        Login
      </Button>
      <p>hello</p>
    </div>
  );
});
