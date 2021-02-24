import { Menu } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';
import { useAuth } from 'app/components/Auth';
import { useTranslation } from 'react-i18next';
import { gravatarImageUrl } from 'app/utils';
import * as style from './style.css';

interface UserSubMenuItem {
  key: string;
  path: string;
  node?: ReactNode
}

export const Header = observer(() => {
  const { t } = useTranslation();
  const auth = useAuth();
  const userSubMenu: (UserSubMenuItem | any)[] = [
    {
      key: 'username',
      path: `/user/${auth.profile.uname}`,
      node: (<b>{auth.profile.uname}</b>),
    },
    {},
    {
      key: 'PROFILE',
      path: `/user/${auth.profile.uname}`,
    },
    {},
    {
      key: 'SETTINGS',
      path: '/settings/profile',
    },
    {
      key: 'LOG_OUT',
      path: '/logout',
    },
  ];
  const LoginButton = (
    <Menu.Item key="login">
      <a href="/login">{t('JACCOUNT_LOG_IN')}</a>
    </Menu.Item>
  );
  return (
    <Menu mode="horizontal" id={style.Header}>
      <Menu.Item key="test" className={style.HeaderItem}>
        <a href="/">{t('TEST')}</a>
      </Menu.Item>
      {
        auth.loggedIn ? (
          <Menu.SubMenu
            className={style.HeaderItem}
            title={(
              <img
                src={gravatarImageUrl(auth.profile.gravatar, 20)}
                alt={`@${auth.profile.uname}`}
                id={style.Gravatar}
              />
            )}
            popupClassName={style.HeaderUserSubMenu}
            // todo: make it dynamic
            popupOffset={[-100, 10]}
          >
            {
              userSubMenu.map((item) => (item.key
                ? (
                  <Menu.Item key={item.key}>
                    <a href={item.path}>
                      {
                        item.node ? item.node : t(item.key)
                      }
                    </a>
                  </Menu.Item>
                ) : (
                  <Menu.Divider />
                )))
            }
          </Menu.SubMenu>
        ) : LoginButton
      }
    </Menu>
  );
});
