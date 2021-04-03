import React, { ReactElement, Fragment } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation, useRouteMatch } from 'react-router';
import { SettingsMenuItem } from '@/types';
import style from './style.css';

export interface SettingsSideBarProps {
  items: SettingsMenuItem[];
}

export const SettingsSideBar = observer(
  (props: SettingsSideBarProps): ReactElement<SettingsSideBarProps, any> => {
    const { url } = useRouteMatch();
    const { t } = useTranslation();
    const location = useLocation();
    const { items } = props;
    const defaultKey = (items.find(
      (item) => `${url}${item.path}` === `${location.pathname}`,
    ))?.key;
    return (
      <Menu
        mode="vertical"
        className={style.settingsSideBar}
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
