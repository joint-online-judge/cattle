import React, { Fragment } from 'react';
import { useIntl } from 'umi';
import { Menu } from 'antd';
import { SettingsSideBarProps } from './typings';
import style from './style.less';

const Index: React.FC<SettingsSideBarProps> = (props) => {
  const intl = useIntl();
  const { items, ...otherProps } = props;

  return (
    <Menu
      mode="vertical"
      className={style.settingsSideBar}
      {...otherProps}
    >
      {
        items.map((item, index) => (
          <Fragment key={`${item.key}-fragment`}>
            <Menu.Item
              style={{ margin: 0 }}
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
