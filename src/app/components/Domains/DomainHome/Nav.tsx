import { observer } from 'mobx-react';
import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  ReadOutlined,
  FileOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import style from './style.css';

export const Nav = observer(() => {
  const { t } = useTranslation();
  const { url, section } = useParams<{ url: string; section: string }>();
  // todo: encapsulate Menu.Item to take consideration of access control
  return (
    <Menu
      mode="horizontal"
      id={style.HomeNav}
      defaultSelectedKeys={[section || 'assignments']}
    >
      <Menu.Item key="assignments" icon={<ReadOutlined />}>
        <Link to={`/domain/${url}/`}>
          {t('DOMAINS.HOME.ASSIGNMENTS')}
        </Link>
      </Menu.Item>
      <Menu.Item key="problems" icon={<FileOutlined />}>
        <Link to={`/domain/${url}/problems`}>
          {t('DOMAINS.HOME.PROBLEMS')}
        </Link>
      </Menu.Item>
      <Menu.Item key="members" icon={<TeamOutlined />}>
        <Link to={`/domain/${url}/members`}>
          {t('DOMAINS.HOME.MEMBERS')}
        </Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to={`/domain/${url}/settings`}>
          {t('DOMAINS.HOME.SETTINGS')}
        </Link>
      </Menu.Item>
    </Menu>
  );
});
