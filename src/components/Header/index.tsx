import React, { useState } from 'react';
import { Menu } from 'antd';
import { useIntl, Link, useLocation, useRouteMatch } from 'umi';
import UserMenuItem from './UserMenuItem';
import style from './style.css';

const extractPath = (path: string) => {
  try {
    const p = path.split('/').filter((o) => !!o)[0];
    return p || 'home';
  } catch (e) {
    return 'home';
  }
};

const Index = () => {
  const location = useLocation();
  const intl = useIntl();
  const [current, setCurrent] = useState(extractPath(location.pathname));

  return (
    <Menu
      mode="horizontal"
      className={style.menu}
      selectedKeys={[current]}
      onClick={(e) => setCurrent(e.key)}
    >
      <Menu.Item key="home">
        <Link to="/">{intl.formatMessage({ id: 'HOME' })}</Link>
      </Menu.Item>
      <Menu.Item key="domain">
        <Link to="/domain">{intl.formatMessage({ id: 'menu.domains' })}</Link>
      </Menu.Item>
      <Menu.Item key="user" className={style.headerFloatRightItem}>
        <UserMenuItem />
      </Menu.Item>
    </Menu>
  );
};

export default Index;
