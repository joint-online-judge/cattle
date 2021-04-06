import { Image, Menu } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserMenuItem } from 'app/components/Header/UserMenuItem';
import style from './style.css';

export const Header = observer(() => {
  const { t } = useTranslation();
  const location = useLocation();

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
          <Link to="/">{t('TEST')}</Link>
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
});
