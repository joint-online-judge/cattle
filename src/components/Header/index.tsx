import React from 'react';
import { Image, Menu } from 'antd';
import { useIntl, Link, useLocation } from 'umi';
import UserMenuItem from './UserMenuItem';
import style from './style.css';

const Index = () => {
  const location = useLocation();
  const intl = useIntl();

  const menuItems = React.useMemo(() => {
    // TODO: render different menu for different path
    // e.g. if (location.pathname.startswith('/domain')) return ...
    return (
      <>
        <Menu.Item key="test" className={style.headerItem}>
          <Image
            src="https://i.loli.net/2021/03/09/hqnrlFcbAYDVWeN.gif"
            height={20}
            width={20}
          />
          <Link to="/">{intl.formatMessage({id: 'TEST'})}</Link>
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
