import React, { Fragment } from 'react';
import { useIntl } from 'umi';
import { Menu, MenuProps } from 'antd';
import { SettingsSideBarProps } from './typings';
import style from './style.css';

const Index: React.FC<SettingsSideBarProps> = (props) => {
  const intl = useIntl();
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
              {item.node ? item.node : intl.formatMessage({ id: item.key })}
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
};

export default Index;
