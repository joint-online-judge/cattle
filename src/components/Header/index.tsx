import React, { useState } from 'react';
import { matchPath } from 'react-router';
import { Button, Col, Drawer, Menu, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useAccess, useIntl, useLocation, useModel } from 'umi';
import UserMenuItem from './UserMenuItem';
import Logo from '@/assets/logo.svg';
import style from './style.less';

const Index: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const location = useLocation();
  const { domainUrl, domain } = useModel('domain');
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

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

  const menuItems = domainUrl
    ? (
      <>
        <Menu.Item key="domain">
          <Link to={`/domain/${domainUrl}`}>
            {domain?.name}
          </Link>
        </Menu.Item>
        <Menu.Item key="problem_set">
          <Link to={`/domain/${domainUrl}`}>
            {intl.formatMessage({ id: 'menu.problem_set' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="problem_list">
          <Link to={`/domain/${domainUrl}/problem`}>
            {intl.formatMessage({ id: 'menu.problem_list' })}
          </Link>
        </Menu.Item>
        {
          // Note: do not use <Access> of umi -- antd menu cannot regonize wrapped component.
          access.isRoot ? (
            <Menu.Item key="domain_manage">
              <Link to={`/domain/${domainUrl}/settings/profile`}>
                {intl.formatMessage({ id: 'menu.domain_manage' })}
              </Link>
            </Menu.Item>
          ) : null
        }
      </>
    ) : (
      <>
        <Menu.Item key="home">
          <Link to="/">{intl.formatMessage({ id: 'HOME' })}</Link>
        </Menu.Item>
        {access.isRoot ? (
          <Menu.Item key="admin">
            <Link to="/admin">{intl.formatMessage({ id: 'menu.admin' })}</Link>
          </Menu.Item>
        ) : null}
      </>
    );

  return (
    <Row style={{ height: '100%' }} align="middle">
      <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
        <Row wrap={false} align="middle" gutter={12}>
          <Col flex={'none'}>
            <Row wrap={false} align="middle">
              <img src={Logo} alt="logo" className={style.pageTitleLogo} />
              <Link to='/' className={style.pageTitle}>
                Joint Online Judge
              </Link>
            </Row>
          </Col>
          <Col flex={'auto'}>
            <Menu
              mode="horizontal"
              className={style.menu}
              selectedKeys={[current]}
              onClick={(e) => {
                if (e.key !== 'user') setCurrent(e.key);
              }}
            >
              {menuItems}
              <Menu.Item key="user" className={style.headerFloatRightItem}>
                <UserMenuItem />
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
        <Row wrap={false} align="middle" justify="space-between">
          <Col>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          </Col>
          <Col>
            <img src={Logo} alt="logo" className={style.pageTitleLogo} />
          </Col>
          <Col>
            <UserMenuItem mini={true} />
          </Col>
        </Row>
      </Col>

      <Drawer
        title={
          <span className="block text-center text-xl">Joint Online Judge</span>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        closeIcon={false}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          className={style.menu}
          selectedKeys={[current]}
          onClick={(e) => {
            if (e.key !== 'user') setCurrent(e.key);
          }}
        >
          {menuItems}
        </Menu>
      </Drawer>
    </Row>
  );
};

export default Index;
