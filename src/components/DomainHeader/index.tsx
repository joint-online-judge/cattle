import React, { useMemo, useState } from 'react';
import { Col, Menu, Row, Skeleton } from 'antd';
import { Link, useAccess, useIntl, useModel } from 'umi';
import { MAIN_CONTENT_GRID } from '@/constants';
import ShadowCard from '@/components/ShadowCard';
import style from './style.less';
import { matchPath } from 'react-router';

const Index: React.FC = () => {
  const { domain, loading, domainUrl } = useModel('domain');
  const intl = useIntl();
  const access = useAccess();
  const matchMenuKey = () => {
    if (matchPath(location.pathname, { path: '/domain/:domainUrl/settings' }))
      return 'domain_manage';

    if (matchPath(location.pathname, { path: '/domain/:domainUrl/problem' }))
      return 'problem_list';

    if (matchPath(location.pathname, { path: '/domain' })) return 'domain';

    return 'home';
  };
  const [current, setCurrent] = useState(matchMenuKey());

  const domainInfo = useMemo(
    () => {
      if (loading) {
        return (
          <Skeleton paragraph={{ rows: 1 }} active />
        );
      }

      if (domain) {
        return (
          <Row justify="space-between">
            <Col>
              <Link to={`/domain/${domain.url}`}>
                <h1
                  className={`text-3xl text-black font-semibold mb-3 mt-5 ${style.domainTitle}`}>
                  {domain.name}
                </h1>
              </Link>
              {/*<h2 className=`text-sm font-light text-white text-opacity-60">*/}
              {/*  Powered by JOJ Team*/}
              {/*</h2>*/}
            </Col>
          </Row>
        );
      }
      return null;
    }, [domain, domainUrl, loading]);

  const domainMenu = (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      onClick={(e) => {
        setCurrent(e.key);
      }}
    >
      <>
        <Menu.Item key="domain">
          <Link to={`/domain/${domainUrl}`}>
            {intl.formatMessage({ id: 'menu.domain.overview' })}
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
    </Menu>
  );

  return (
    <ShadowCard
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <Row
        align="middle"
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
