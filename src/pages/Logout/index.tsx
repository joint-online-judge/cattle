import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin, Result, message } from 'antd';
import { useRequest, Redirect, useModel, history } from 'umi';
import { Horse } from '@/utils/service';

const Index: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { removeHeader } = useModel('pageHeader');
  const { t } = useTranslation();

  useRequest(
    async () => {
      if (initialState?.accessToken) {
        return Horse.auth.v1Logout({
          responseType: 'json',
        });
      }

      return Promise.resolve({});
    },
    {
      onSuccess: () => {
        message.success(t('Logout.msg.logoutSuccess'));
        refresh().then(() => {
          history.replace('/login');
        });
      },
      onError: () => {
        message.error(t('Logout.msg.logoutFailed'));
      },
    },
  );

  useEffect(() => {
    removeHeader();
  }, [removeHeader]);

  return initialState?.user ? (
    <Result icon={<Spin size="large" />} title={t('Logout.msg.loggingOut')} />
  ) : (
    <Redirect to="/login" />
  );
};

export default Index;
