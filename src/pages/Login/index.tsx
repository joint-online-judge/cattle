import React, { useEffect } from 'react';
import { Spin, Result } from 'antd';
import { Redirect, useLocation, useModel, useRequest } from 'umi';
import { UserService } from '@/client';
import { DOMAIN_HOST } from '@/constants';

const useQuery = () => {
  console.log(useLocation().search);
  return new URLSearchParams(useLocation().search);
};

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const location = useLocation<{ from: Location }>();
  const query = useQuery();

  const { run } = useRequest(async () => {
    // either fetch profile fails or try to login normally
    if (!initialState?.user) {
      const { from } = location.state || { from: { pathname: '/' } };
      UserService.jaccountLoginApiV1UserJaccountLoginGet(
        `${DOMAIN_HOST}/login/?action=profile&from=${from.pathname}`, false,
      ).then(res => {
        window.location.href = res.redirect_url;
      }).catch(err => {
        console.log(err);
        // TODO: message user
      });
    }
  }, { manual: true });

  useEffect(() => {
    run();
  }, []);

  return (
    initialState?.user
      ? <Redirect to={query.get('from') || '/'} />
      : (
        <Result
          icon={<Spin size="large" />}
          title={'Redirecting...'}
        />
      )
  );
};

export default Index;
