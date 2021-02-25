import { Menu } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserMenuItem } from 'app/components/Header/UserMenuItem';
import * as style from './style.css';

export const Header = observer(() => {
  const { t } = useTranslation();
  return (
    <Menu
      mode="horizontal"
      id={style.Header}
      selectable={false}
    >
      <Menu.Item key="test" className={style.HeaderItem}>
        <a href="/">{t('TEST')}</a>
      </Menu.Item>
      <Menu.Item key="user" className={style.HeaderFloatRightItem}>
        <UserMenuItem />
      </Menu.Item>
    </Menu>
  );
});
