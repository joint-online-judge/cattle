import React from 'react';
import { Row, Col, Avatar, Skeleton } from 'antd';
import { Link, useModel } from 'umi';
import { MAIN_CONTENT_GRID } from '@/constants';
import { gravatarImageUrl } from '@/utils';
import style from './style.less';

const Index: React.FC = () => {
  const { domain, loading } = useModel('domain');

  if (loading) {
    return (
      <Row
        align="middle"
        justify="center"
        className={style.domainHeaderContainer}
      >
        <Col {...MAIN_CONTENT_GRID}>
          <Skeleton paragraph={{ rows: 1 }} active />
        </Col>
      </Row>
    );
  }

  if (domain) {
    return (
      <Row
        align="middle"
        justify="center"
        className={style.domainHeaderContainer}
      >
        <Col {...MAIN_CONTENT_GRID}>
          <Row justify="space-between">
            <Col>
              <Link to={`/domain/${domain.url}`}>
                <h1 className="text-5xl text-white font-light mb-3">
                  {domain.name}
                </h1>
              </Link>
              <h2 className="text-sm font-light text-white text-opacity-60">
                Powered by JOJ Team
              </h2>
            </Col>
            <Col>
              <Avatar
                shape="square"
                size={100}
                src={gravatarImageUrl(domain.gravatar)}
                alt={`@${domain.name}`}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return null;
};

export default Index;
