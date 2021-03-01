import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { gravatarImageUrl } from 'app/utils';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from 'app/components/Auth';
import * as style from './style.css';

interface LoggedInSubMenuItem {
  key: string;
  path: string;
  node?: ReactNode,
}

export const UserMenuItem = observer(() => {
  const { t } = useTranslation();
  const auth = useAuth();
  const LoggedInSubMenuArrange: (LoggedInSubMenuItem | string)[] = [
    {
      key: 'username',
      path: `/user/${auth.profile.uname}`,
      node: (<b>{auth.profile.uname}</b>),
    },
    'username-profile-divider',
    {
      key: 'USERS.PROFILE',
      path: `/user/${auth.profile.uname}`,
    },
    'profile-setting-divider',
    {
      key: 'SETTINGS.SETTINGS',
      path: '/settings/profile',
    },
    {
      key: 'USERS.LOG_OUT',
      path: '/logout',
    },
  ];
  const UserSubMenu = auth.loggedIn ? (
    <Menu className={style.HeaderUserSubMenu}>
      {
        LoggedInSubMenuArrange.map((item) => (typeof (item) !== 'string'
          ? (
            <Menu.Item key={item.key} className={style.HeaderUserSubMenuItem}>
              <Link to={item.path}>
                {
                  item.node ? item.node : t(item.key)
                }
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={`${item}`} />
          )))
      }
    </Menu>
  ) : null;

  return auth.loggedIn
    ? (
      <Dropdown
        overlay={UserSubMenu}
        placement="bottomRight"
        trigger={['click']}
        arrow
      >
        <span>
          <img
            src={gravatarImageUrl(auth.profile.gravatar, 20)}
            alt={`@${auth.profile.uname}`}
            id={style.Gravatar}
          />
          <DownOutlined />
        </span>
      </Dropdown>
    ) : (
      <Link to="/login">{t('USERS.LOGIN.JACCOUNT_LOG_IN')}</Link>
    );
});
