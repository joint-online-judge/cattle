import React from 'react';
import { useIntl } from 'umi';
import { Link } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import style from './style.css';

interface LinkItem {
  name: string;
  path: string;
}

const items: LinkItem[] = [
  {
    name: 'FOOTER.ABOUT',
    path: '/about',
  },
  {
    name: 'FOOTER.API',
    path: '/api',
  },
  {
    name: 'FOOTER.DOCS',
    path: '/docs',
  },
  {
    name: 'FOOTER.ISSUE',
    path: '/issue',
  },
  {
    name: 'FOOTER.CONTACT',
    path: '/contact',
  },
];

const Index: React.FC = () => {
  const intl = useIntl();
  return (
    <Row>
      {items.map((item) => {
        return (
          <div className={style.footerItem} key={`${item.name}${item.path}`}>
            <Link to={item.path}>{intl.formatMessage({ id: item.name })}</Link>
          </div>
        );
      })}
      <Col>
        <Typography.Link
          href="https://github.com/joint-online-judge"
          target="_blank"
        >
          <GithubOutlined className={style.githubIcon} />
        </Typography.Link>
      </Col>
    </Row>
  );
};

export default Index;
