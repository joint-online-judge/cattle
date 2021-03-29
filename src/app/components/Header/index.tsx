import { Affix, Image, Menu } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserMenuItem } from 'app/components/Header/UserMenuItem';
import style from './style.css';

export const Header = observer(() => {
  const { t } = useTranslation();
  return (
    <Affix offsetTop={0}>
      <Menu
        mode="horizontal"
        className={style.Header}
        selectable={false}
      >
        <Menu.Item key="test" className={style.HeaderItem}>
          <Image
            src="https://i.loli.net/2021/03/09/hqnrlFcbAYDVWeN.gif"
            height={20}
            width={20}
          />
          <a href="/">{t('TEST')}</a>
        </Menu.Item>
        <Menu.Item key="user" className={style.HeaderFloatRightItem}>
          <UserMenuItem />
        </Menu.Item>
      </Menu>
    </Affix>
  );
});
