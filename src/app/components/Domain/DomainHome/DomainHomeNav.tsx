import { observer } from 'mobx-react';
import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  ReadOutlined,
  FileOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocation, useRouteMatch } from 'react-router';
import style from './style.css';

const menuItems = [
  {
    key: 'DOMAIN.HOME.ASSIGNMENTS',
    path: '',
    icon: (<ReadOutlined />),
  }, {
    key: 'DOMAIN.HOME.PROBLEMS',
    path: '/problems',
    icon: (<FileOutlined />),
  },
  {
    key: 'DOMAIN.HOME.MEMBERS',
    path: '/members',
    icon: (<TeamOutlined />),
  },
  {
    key: 'DOMAIN.HOME.SETTINGS',
    path: '/settings',
    icon: (<SettingOutlined />),
  },
];

export const DomainHomeNav = observer(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const { url } = useRouteMatch();
  const defaultKey = (menuItems.find(
    (item) => `${url}${item.path}` === `${location.pathname}`,
  ))?.key;
  // todo: encapsulate Menu.Item to take consideration of access control
  return (
    <Menu
      mode="horizontal"
      className={style.HomeNav}
      defaultSelectedKeys={[defaultKey || menuItems[0].key]}
    >
      {
        menuItems.map((item) => {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={`${url}${item.path}`}>
                {t(item.key)}
              </Link>
            </Menu.Item>
          );
        })
      }
    </Menu>
  );
});
