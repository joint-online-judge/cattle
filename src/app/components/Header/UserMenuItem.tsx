import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { gravatarImageUrl } from 'app/utils';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from 'app/contexts';
import style from './style.css';

interface LoggedInSubMenuItem {
  key: string;
  path: string;
  node?: ReactNode,
}

export const UserMenuItem = observer(() => {
  const { t } = useTranslation();
  const auth = useAuth();
  // divider name has no actual meaning just to be a key of the divider component to pass eslint
  const LoggedInSubMenuArrange: (LoggedInSubMenuItem | string)[] = [
    {
      key: 'username',
      path: `/user/${auth.profile.uname}`,
      node: (<b>{auth.profile.uname}</b>),
    },
    'username-profile-divider',
    {
      key: 'USER.PROFILE',
      path: `/user/${auth.profile.uname}`,
    },
    'profile-setting-divider',
    {
      key: 'SETTINGS.SETTINGS',
      path: '/settings',
    },
    {
      key: 'USER.LOG_OUT',
      path: '/logout',
    },
  ];
  const UserSubMenu = auth.loggedIn ? (
    <Menu className={style.headerUserSubMenu}>
      {
        LoggedInSubMenuArrange.map((item) => (typeof (item) !== 'string'
          ? (
            <Menu.Item key={item.key} className={style.headerUserSubMenuItem}>
              <Link to={item.path}>
                {
                  item.node ? item.node : t(item.key)
                }
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={item} />
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
            className={style.gravatar}
          />
          <DownOutlined />
        </span>
      </Dropdown>
    ) : (
      <Link to="/login">{t('USER.LOGIN.JACCOUNT_LOG_IN')}</Link>
    );
});
