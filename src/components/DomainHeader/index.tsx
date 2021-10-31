import React, { useEffect } from 'react';
import { PageHeaderProps, Row, Col, message } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Link, useParams, useLocation } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
import style from './style.less';
import { CONTENT_GRID_LAYOUT } from '@/constants';

const Index: React.FC = () => {
  const { domain } = useModel('domain');

  return domain ? (
    <Row
      align="middle"
      justify="center"
      className={style.domainHeaderContainer}
    >
      <Col {...CONTENT_GRID_LAYOUT}>
        <Link to={`/domain/${domain.url}`}>
          <h1 className={style.domainTitle}>{domain.name}</h1>
        </Link>
        <h2 className={style.domainSubtitle}>Powered by JOJ Team</h2>
      </Col>
    </Row>
  ) : null;
};

export default Index;
