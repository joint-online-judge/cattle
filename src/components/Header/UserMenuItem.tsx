import React, { ReactNode } from 'react';
import { useModel, useIntl, useLocation } from 'umi';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Gravatar from '@/components/Gravatar';
import { DownOutlined } from '@ant-design/icons';
import style from './style.css';

export const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const location = useLocation();

  const subMenu = (
    <Menu>
      <Menu.Item key="username">
        <Link to={`/user/${initialState?.user?.uname || ''}`}>
          <b>{initialState?.user?.uname || ''}</b>
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-1" />
      <Menu.Item key="USER.PROFILE">
        <Link to={`/user/${initialState?.user?.uname || ''}`}>
          {intl.formatMessage({ id: 'USER.PROFILE' })}
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-2" />
      <Menu.Item key="SETTINGS.SETTINGS">
        <Link to={'/settings'}>
          {intl.formatMessage({ id: 'SETTINGS.SETTINGS' })}
        </Link>
      </Menu.Item>
      <Menu.Item key="USER.LOG_OUT">
        <Link to={'/logout'}>
          {intl.formatMessage({ id: 'USER.LOG_OUT' })}
        </Link>
      </Menu.Item>
    </Menu>
  );

  return initialState?.user
    ? (
      <Dropdown
        overlay={subMenu}
        placement="bottomRight"
        trigger={['click']}
        arrow
      >
        <span>
          <Gravatar
            user={initialState?.user}
            size={20}
          />
          <DownOutlined />
        </span>
      </Dropdown>
    ) : (
      <Link to={`/login?from=${location.pathname}`}>
        {intl.formatMessage({ id: 'USER.LOGIN.JACCOUNT_LOG_IN' })}
      </Link>
    );
};

export default Index;
