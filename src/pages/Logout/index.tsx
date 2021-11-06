import React, { useEffect } from 'react';
import { Spin, Result, message } from 'antd';
import { useRequest, Redirect, useModel, history } from 'umi';
import { Horse } from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';

const Index: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { removeHeader } = useModel('pageHeader');

  const { run } = useRequest(
    async () => {
      if (initialState?.accessToken) {
        return Horse.auth
          .logoutApiV1AuthLogoutPost({
            responseType: 'json',
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            // TODO: message user
          });
      } else {
        return Promise.resolve({});
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Logged out');
        refresh().then(() => {
          history.replace('/login');
        });
      },
      onError: () => {
        message.error('Log out failed');
      },
    },
  );

  useEffect(() => {
    removeHeader();
    run();
  }, []);

  return initialState?.user ? (
    <Result icon={<Spin size="large" />} title="Logging out..." />
  ) : (
    <Redirect to="/login" />
  );
};

export default Index;
