import React, { useEffect } from 'react';
import { Spin, Result } from 'antd';
import { useRequest, Redirect, useModel } from 'umi';
import { UserService } from '@/client';
import { DOMAIN_HOST } from '@/constants';

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { run } = useRequest(async () => {
    if (initialState?.user) {
      UserService.logoutApiV1UserLogoutGet(
        DOMAIN_HOST, false,
      ).then(res => {
        window.location.href = res.redirect_url;
      }).catch((err) => {
        console.log(err);
        // TODO: message user
      });
    }
  }, { manual: true });

  useEffect(() => {
    (async () => {
      await run();
    })();
  }, []);

  return initialState?.user
    ? (
      <Result
        icon={<Spin size="large" />}
        title="Logging out..."
      />
    ) : (
      <Redirect to="/" />
    );
};

export default Index;
