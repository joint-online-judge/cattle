import React, { useEffect } from 'react';
import { Spin, Result } from 'antd';
import { Redirect, useLocation, useModel, useRequest, history } from 'umi';
import { Horse } from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const query = useQuery();

  const { run: login } = useRequest(
    () => {
      if (!initialState?.user) {
        const from = query.get('from') || '/';
        return Horse.user
          .jaccountLoginApiV1UserJaccountLoginGet({
            redirect_url: `${DOMAIN_HOST}${from}`,
            redirect: false,
          })
          .then((res) => {
            window.location.href = res.data.redirect_url;
          });
      }
    },
    {
      manual: true,
      onError: (res) => {
        console.error(res);
      },
    },
  );

  useEffect(() => {
    login();
  }, []);

  return initialState?.user ? (
    <Redirect to={query.get('from') || '/'} />
  ) : (
    <Result icon={<Spin size="large" />} title={'Redirecting...'} />
  );
};

export default Index;
