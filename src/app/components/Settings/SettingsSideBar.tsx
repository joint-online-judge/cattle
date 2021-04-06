import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuProps } from 'antd';
import { SettingsMenuItem } from '@/types';
import style from './style.css';

export interface SettingsSideBarProps {
  items: SettingsMenuItem[];
  selectedKeys: string[];
  onChange?: MenuProps['onClick'];
}

export const SettingsSideBar: React.FC<SettingsSideBarProps> = observer(
  (props) => {
    const { t } = useTranslation();
    const { items, selectedKeys, onChange } = props;

    return (
      <Menu
        onClick={(e) => onChange && onChange(e)}
        mode="vertical"
        className={style.settingsSideBar}
        selectedKeys={selectedKeys}
      >
        {
          items.map((item, index) => (
            <Fragment key={`${item.key}-fragment`}>
              <Menu.Item
                key={item.key}
              >
                {item.node ? item.node : t(item.key)}
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
