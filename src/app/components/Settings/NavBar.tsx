import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.css';

interface MenuItem {
  key: string;
  path: string;
  node?: ReactNode,
}

export const NavBar = observer(() => {
  const { t } = useTranslation();
  const MenuArrange: (MenuItem)[] = [
    {
      key: 'SETTINGS.GENERAL_SETTINGS',
      path: '/settings/general',
    },
    {
      key: 'SETTINGS.ACCOUNT_SETTINGS',
      path: '/settings/account',
    },
    {
      key: 'SETTINGS.SECURITY_SETTINGS',
      path: '/settings/security',
    },
    {
      key: 'DOMAINS.DOMAINS',
      path: '/settings/domains',
    },
  ];
  return (
    <Menu mode="vertical" className={style.NavBarMenu}>
      {
        MenuArrange.map((item, index) => (
          <>
            <Menu.Item key={item.key}>
              <Link to={item.path}>
                {
                  item.node ? item.node : t(item.key)
                }
              </Link>
            </Menu.Item>
            {
              index < MenuArrange.length - 1
                ? <Menu.Divider key={`after-${item.key}`} />
                : null
            }
          </>
        ))
      }
    </Menu>
  );
});
