import React, { ReactNode } from 'react';
import { useModel, useIntl } from 'umi';
import { Dropdown, Menu, Avatar, Space } from 'antd';
import { Link } from 'react-router-dom';
import { gravatarImageUrl } from '@/utils';
import { DownOutlined } from '@ant-design/icons';
import style from './style.css';

export const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();

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
        <Space>
          <Avatar
            src={gravatarImageUrl(initialState?.user?.gravatar || '', 20)}
            alt={initialState?.user?.uname || ''}
          />
          <DownOutlined />
        </Space>
      </Dropdown>
    ) : (
      <Link to="/login">{intl.formatMessage({ id: 'USER.LOGIN.JACCOUNT_LOG_IN' })}</Link>
    );
};

export default Index;
