import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';
import { PageHeader, Spin } from 'antd';
import { useAuth } from 'app/components/Auth';
import { gravatarImageUrl } from 'app/utils';
import { useParams } from 'react-router';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';
import style from './style.css';

export interface SettingsHeaderProps {
  mode: 'personal' | 'domain' | 'problem'
}

// todo: make data source one level upper
export const SettingsHeader = observer(
  (props: SettingsHeaderProps): ReactElement<SettingsHeaderProps, any> => {
    switch (props.mode) {
      case 'personal':
      default: {
        const auth = useAuth();
        return (
          <PageHeader
            className={style.UserInfoHeader}
            title={auth.profile.real_name}
            subTitle={auth.profile.student_id}
            avatar={{ src: gravatarImageUrl(auth.profile.gravatar) }}
          />
        );
      }
      case 'domain': {
        const { url } = useParams<{ url: string }>();
        const { loading, data } = useRequest(async () => {
          return DomainService.getDomainApiV1DomainsDomainGet(url);
        });
        return loading ? <Spin />
          : (
            <PageHeader
              className={style.UserInfoHeader}
              title={data.name}
              subTitle={data.url}
              avatar={{ src: gravatarImageUrl(data.gravatar) }}
            />
          );
      }
    }
  },
);
