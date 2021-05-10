import React, { ReactNode } from 'react';
import { useModel, useIntl, useLocation } from 'umi';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { gravatarImageUrl } from '@/utils';
import { DownOutlined } from '@ant-design/icons';
import style from './style.css';

interface LoggedInSubMenuItem {
  key: string;
  path: string;
  node?: ReactNode,
}

export const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const location = useLocation();

  // divider name has no actual meaning just to be a key of the divider component to pass eslint
  const LoggedInSubMenuArrange: (LoggedInSubMenuItem | string)[] = [
    {
      key: 'username',
      path: `/user/${initialState?.user?.uname || ''}`,
      node: (<b>{initialState?.user?.uname || ''}</b>),
    },
    'username-profile-divider',
    {
      key: 'USER.PROFILE',
      path: `/user/${initialState?.user?.uname || ''}`,
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
  const UserSubMenu = (
    <Menu className={style.headerUserSubMenu}>
      {
        LoggedInSubMenuArrange.map((item) => (typeof (item) !== 'string'
          ? (
            <Menu.Item key={item.key} className={style.headerUserSubMenuItem}>
              <Link to={item.path}>
                {
                  item.node ? item.node : intl.formatMessage({ id: item.key })
                }
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={item} />
          )))
      }
    </Menu>
  );

  return initialState?.user
    ? (
      <Dropdown
        overlay={UserSubMenu}
        placement="bottomRight"
        trigger={['click']}
        arrow
      >
        <span>
          <img
            src={gravatarImageUrl(initialState?.user?.gravatar || '', 20)}
            alt={`@${initialState?.user?.uname || ''}`}
            className={style.gravatar}
          />
          <DownOutlined />
        </span>
      </Dropdown>
    ) : (
      <Link to={`/login?from=${location.pathname}`}>
        {intl.formatMessage({ id: 'USER.LOGIN.JACCOUNT_LOG_IN' })}
      </Link>
    );
};

export default Index;
