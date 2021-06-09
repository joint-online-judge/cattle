import React, { Fragment, ReactNode } from 'react';
import { useIntl } from 'umi';
import { Menu, MenuProps } from 'antd';
import style from './style.less';

export interface SettingsMenuItem {
  menuKey: string;
  i18nKey?: string; // use menuKey as default
  text?: string; // use i18n(i18nKey) as default
  path?: string;
  node?: ReactNode;
  component: ReactNode;
}

export interface SettingsSideBarProps extends MenuProps {
  items: SettingsMenuItem[];
}

const Index: React.FC<SettingsSideBarProps> = (props) => {
  const intl = useIntl();
  const { items, ...otherProps } = props;

  return (
    <Menu mode="vertical" className={style.settingsSideBar} {...otherProps}>
      {items.map((item, index) => (
        <Fragment key={`${item.menuKey}-fragment`}>
          <Menu.Item style={{ margin: 0 }} key={item.menuKey}>
            {item.node ? item.node : intl.formatMessage({ id: item.menuKey })}
          </Menu.Item>
          {index < items.length - 1 ? (
            <Menu.Divider key={`after-${item.menuKey}`} />
          ) : null}
        </Fragment>
      ))}
    </Menu>
  );
};

export default Index;
