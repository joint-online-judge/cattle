import { observer } from 'mobx-react';
import React from 'react';
import { PageHeader } from 'antd';
import { useAuth } from 'app/components/Auth';
import { gravatarImageUrl } from 'app/utils';
import style from './style.css';

export const SettingsHeader = observer(() => {
  const auth = useAuth();
  return (
    <PageHeader
      className={style.UserInfoHeader}
      title={auth.profile.real_name}
      subTitle={auth.profile.student_id}
      avatar={{ src: gravatarImageUrl(auth.profile.gravatar) }}
    />
  );
});
