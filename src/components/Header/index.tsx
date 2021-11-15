import React, { useState } from 'react';
import { Menu } from 'antd';
import { useIntl, Link, useLocation, useAccess } from 'umi';
import UserMenuItem from './UserMenuItem';
import style from './style.css';

const extractPath = (path: string) => {
  try {
    const p = path.split('/').find((o) => !!o);
    return p ?? 'home';
  } catch {
    return 'home';
  }
};

const Index: React.FC = () => {
  const location = useLocation();
  const intl = useIntl();
  const access = useAccess();
  const [current, setCurrent] = useState(extractPath(location.pathname));

  return (
    <Menu
      mode="horizontal"
      className={style.menu}
      selectedKeys={[current]}
      onClick={(e) => {
        setCurrent(e.key);
      }}
    >
      <Menu.Item key="home">
        <Link to="/">{intl.formatMessage({ id: 'HOME' })}</Link>
      </Menu.Item>
      <Menu.Item key="domain">
        <Link to="/domain">{intl.formatMessage({ id: 'menu.domains' })}</Link>
      </Menu.Item>
      {
        // Note: do not use <Access> of umi -- antd menu cannot regonize wrapped component.
        access.isRoot ? (
          <Menu.Item key="admin">
            <Link to="/admin">{intl.formatMessage({ id: 'menu.admin' })}</Link>
          </Menu.Item>
        ) : null
      }
      <Menu.Item key="user" className={style.headerFloatRightItem}>
        <UserMenuItem />
      </Menu.Item>
    </Menu>
  );
};

export default Index;
