import React, { Fragment } from 'react';
import { useIntl } from 'umi';
import { Menu, MenuProps, MenuItemProps } from 'antd';
import ShadowCard from '@/components/ShadowCard';

export interface SettingsMenuItem {
  menuKey: string;
  i18nKey?: string; // Use menuKey as default
  text?: string; // Use i18n(i18nKey) as default
  path?: string;
  node?: React.ReactNode;
  menuItemProps?: MenuItemProps;
}

export interface SettingsSideBarProps extends MenuProps {
  items: SettingsMenuItem[];
  menu?: React.ReactElement<MenuProps>;
}

const Index: React.FC<SettingsSideBarProps> = (props) => {
  const intl = useIntl();
  const { items, menu, ...otherProps } = props;

  return (
    <ShadowCard
      bodyStyle={{ padding: 0 }}
      style={{ overflow: 'hidden' }}
      className="settings-side-bar"
    >
      {menu ? (
        React.cloneElement<MenuProps>(menu, { ...otherProps })
      ) : (
        <Menu mode="inline" {...otherProps}>
          {items.map((item) => (
            <Fragment key={`${item.menuKey}-fragment`}>
              <Menu.Item key={item.menuKey} {...item.menuItemProps}>
                {item.node ||
                  item.text ||
                  (item.i18nKey && intl.formatMessage({ id: item.i18nKey })) ||
                  intl.formatMessage({ id: item.menuKey })}
              </Menu.Item>
            </Fragment>
          ))}
        </Menu>
      )}
    </ShadowCard>
  );
};

export default Index;
