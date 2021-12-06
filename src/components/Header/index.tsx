import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router';
import { Menu } from 'antd';
import { useIntl, Link, useLocation, useAccess, useModel } from 'umi';
import UserMenuItem from './UserMenuItem';
import style from './style.css';

const Index: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const location = useLocation();
  const { domainUrl } = useModel('domain');

  const matchMenuKey = () => {
    if (matchPath(location.pathname, { path: '/domain/:domainUrl/settings' }))
      return 'domain_manage';

    if (matchPath(location.pathname, { path: '/domain/:domainUrl/problem' }))
      return 'problem_list';

    if (matchPath(location.pathname, { path: '/domain' })) return 'domain';
    if (matchPath(location.pathname, { path: '/admin' })) return 'admin';

    return 'home';
  };

  const [current, setCurrent] = useState(matchMenuKey());

  return (
    <Menu
      mode="horizontal"
      className={style.menu}
      selectedKeys={[current]}
      onClick={(e) => {
        setCurrent(e.key);
      }}
    >
      <Menu.Item key="home">
        <Link to="/">{intl.formatMessage({ id: 'HOME' })}</Link>
      </Menu.Item>
      <Menu.Item key="domain">
        <Link to="/domain">{intl.formatMessage({ id: 'menu.domain' })}</Link>
      </Menu.Item>
      {domainUrl ? (
        <Menu.Item key="problem_list">
          <Link to={`/domain/${domainUrl}/problem`}>
            {intl.formatMessage({ id: 'menu.problem_list' })}
          </Link>
        </Menu.Item>
      ) : null}
      {
        // Note: do not use <Access> of umi -- antd menu cannot regonize wrapped component.
        domainUrl && access.isRoot ? (
          <Menu.Item key="domain_manage">
            <Link to={`/domain/${domainUrl}/settings/profile`}>
              {intl.formatMessage({ id: 'menu.domain_manage' })}
            </Link>
          </Menu.Item>
        ) : null
      }
      {access.isRoot ? (
        <Menu.Item key="admin">
          <Link to="/admin">{intl.formatMessage({ id: 'menu.admin' })}</Link>
        </Menu.Item>
      ) : null}
      <Menu.Item key="user" className={style.headerFloatRightItem}>
        <UserMenuItem />
      </Menu.Item>
    </Menu>
  );
};

export default Index;
