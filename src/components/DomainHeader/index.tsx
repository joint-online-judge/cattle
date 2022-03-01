import React, { useMemo, useState } from 'react';
import { Col, Menu, Row, Skeleton } from 'antd';
import { Link, useAccess, useIntl, useModel } from 'umi';
import {
  BarsOutlined,
  FormOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { matchPath } from 'react-router';
import style from './style.less';
import { MAIN_CONTENT_GRID } from '@/constants';
import ShadowCard from '@/components/ShadowCard';
import Gravatar from '@/components/Gravatar';

const matchMenuKey = () => {
  if (matchPath(location.pathname, { path: '/domain/:domainUrl/settings' })) {
    return 'domain_manage';
  }

  if (matchPath(location.pathname, { path: '/domain/:domainUrl/problem' })) {
    return 'problem_list';
  }

  if (matchPath(location.pathname, { path: '/domain' })) {
    return 'domain';
  }

  return 'home';
};

const Index: React.FC = () => {
  const { domain, loading, domainUrl } = useModel('domain');
  const [current, setCurrent] = useState(matchMenuKey());
  const intl = useIntl();
  const access = useAccess();

  const domainInfo = useMemo(() => {
    if (loading) {
      return <Skeleton paragraph={{ rows: 1 }} active />;
    }

    if (domain) {
      return (
        <Row justify="start" className="mt-10 mb-6" align="middle">
          <Col>
            <Gravatar gravatar={domain?.gravatar} size={60} />
          </Col>
          <Col>
            <Link to={`/domain/${domain.url ?? ''}`}>
              <h1 className={'text-4xl text-black font-medium ml-8'}>
                {domain.name}
              </h1>
            </Link>
          </Col>
        </Row>
      );
    }

    return null;
  }, [domain, loading]);

  const domainMenu = useMemo(() => {
    if (domainUrl === undefined) {
      return null;
    }

    return (
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        onClick={(e) => {
          setCurrent(e.key);
        }}
      >
        <>
          <Menu.Item key="domain" icon={<HomeOutlined />}>
            <Link to={`/domain/${domainUrl}`}>
              {intl.formatMessage({ id: 'menu.domain.overview' })}
            </Link>
          </Menu.Item>
          <Menu.Item key="problem_set" icon={<FormOutlined />}>
            <Link to={`/domain/${domainUrl}`}>
              {intl.formatMessage({ id: 'menu.problem_set' })}
            </Link>
          </Menu.Item>
          <Menu.Item key="problem_list" icon={<BarsOutlined />}>
            <Link to={`/domain/${domainUrl}/problem`}>
              {intl.formatMessage({ id: 'menu.problem_list' })}
            </Link>
          </Menu.Item>
          {
            // Note: do not use <Access> of umi -- antd menu cannot regonize wrapped component.
            access.isRoot ? (
              <Menu.Item key="domain_manage" icon={<SettingOutlined />}>
                <Link to={`/domain/${domainUrl}/settings/profile`}>
                  {intl.formatMessage({ id: 'menu.domain_manage' })}
                </Link>
              </Menu.Item>
            ) : null
          }
        </>
      </Menu>
    );
  }, [domainUrl]);

  return (
    <ShadowCard bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
      <Row
        align="bottom"
        justify="center"
        className={style.domainHeaderContainer}
      >
        <Col {...MAIN_CONTENT_GRID}>
          {domainInfo}
          {domainMenu}
        </Col>
      </Row>
    </ShadowCard>
  );
};

export default Index;
