import React from 'react';
import { Row, Col, Avatar } from 'antd';
import { Link, useModel } from 'umi';
import { CONTENT_GRID_LAYOUT } from '@/constants';
import { gravatarImageUrl } from '@/utils';
import style from './style.less';

const Index: React.FC = () => {
  const { domain } = useModel('domain');

  return domain ? (
    <Row
      align="middle"
      justify="center"
      className={style.domainHeaderContainer}
    >
      <Col {...CONTENT_GRID_LAYOUT}>
        <Row justify="space-between">
          <Col>
            <Link to={`/domain/${domain.url}`}>
              <h1 className={style.domainTitle}>{domain.name}</h1>
            </Link>
            <h2 className={style.domainSubtitle}>Powered by JOJ Team</h2>
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
  ) : null;
};

export default Index;
