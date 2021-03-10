import React, { ReactElement, ReactNode, Fragment } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation, useRouteMatch } from 'react-router';
import style from './style.css';

export interface SideBarProps {
  mode: 'personal' | 'domain' | 'problem';
}

export interface MenuItem {
  key: string;
  path?: string;
  node?: ReactNode,
}

const personal: (MenuItem)[] = [
  {
    key: 'SETTINGS.GENERAL_SETTINGS',
    path: '/general',
  },
  {
    key: 'SETTINGS.ACCOUNT_SETTINGS',
    path: '/account',
  },
  {
    key: 'SETTINGS.SECURITY_SETTINGS',
    path: '/security',
  },
  {
    key: 'DOMAIN.DOMAINS',
    path: '/domains',
  },
];

const domain: MenuItem[] = [
  {
    key: 'SETTINGS.DOMAIN.PROFILE',
    path: '/profile',
  },
  {
    key: 'SETTINGS.DOMAIN.INVITATION',
    path: '/invitation',
  },
  {
    key: 'SETTINGS.DOMAIN.MEMBERS',
    path: '/members',
  },
];

const menuArrange = {
  domain,
  personal,
};

export const SettingsSideBar = observer(
  (props: SideBarProps): ReactElement<SideBarProps, any> => {
    const { url } = useRouteMatch();
    const { t } = useTranslation();
    const location = useLocation();
    const items = menuArrange[props.mode];
    const defaultKey = (items.find(
      (item) => `${url}${item.path}` === `${location.pathname}`,
    ))?.key;
    return (
      <Menu
        mode="vertical"
        className={style.SideBarMenu}
        defaultSelectedKeys={[defaultKey || items[0].key]}
      >
        {
          items.map((item, index) => (
            <Fragment key={`${item.key}-fragment`}>
              <Menu.Item
                key={item.key}
              >
                {item.node ? item.node : (
                  <Link to={`${url}${item.path}`}>
                    {t(item.key)}
                  </Link>
                )}
              </Menu.Item>
              {
                index < items.length - 1
                  ? <Menu.Divider key={`after-${item.key}`} />
                  : null
              }
            </Fragment>
          ))
        }
      </Menu>
    );
  },
);
