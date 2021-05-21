import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useIntl, Link, useHistory, useLocation, useRouteMatch } from 'umi';
import UserMenuItem from './UserMenuItem';
import style from './style.css';

const Index = () => {
  const history = useHistory();
  const intl = useIntl();

  console.log(history);
  console.log(useLocation());
  console.log(useRouteMatch());

  const menuItems = React.useMemo(() => {
    // TODO: render different menu for different path
    // e.g. if (location.pathname.startswith('/domain')) return ...
    return (
      <>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">{intl.formatMessage({ id: 'HOME' })}</Link>
        </Menu.Item>
        <Menu.Item key="domain" icon={<AppstoreOutlined />}>
          <Link to="/domain">{intl.formatMessage({ id: 'DOMAIN' })}</Link>
        </Menu.Item>
        <Menu.Item key="user" className={style.headerFloatRightItem}>
          <UserMenuItem />
        </Menu.Item>
      </>
    );
  }, [location.pathname]);
  // p.s. Here, the function will be run each time location.pathname is changed.
  //      We can be more aggressive to change this value to location.pathname.split('/')[1],
  //      to rerun the function only when the first url string changes.

  return (
    <Menu
      mode="horizontal"
      className={style.menu}
      selectable={false}
    >
      {menuItems}
    </Menu>
  );
};

export default Index;
