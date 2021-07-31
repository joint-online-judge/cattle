import React from 'react';
import { useIntl } from 'umi';
import { Link } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import style from './style.css';

interface LinkItem {
  name: string;
  path: string;
  external?: boolean;
}

const items: LinkItem[] = [
  {
    name: 'FOOTER.ABOUT',
    path: '/about',
  },
  {
    name: 'FOOTER.API',
    path: '/api/v1',
    external: true,
  },
  {
    name: 'FOOTER.DOCS',
    path: 'https://joint-online-judge.github.io/',
    external: true,
  },
  {
    name: 'FOOTER.ISSUE',
    path: 'https://github.com/joint-online-judge/cattle/issues',
    external: true,
  },
  {
    name: 'FOOTER.CONTACT',
    path: 'mailto:liuyh615@126.com',
    external: true,
  },
];

const Index: React.FC = () => {
  const intl = useIntl();
  return (
    <Row>
      {items.map((item) => {
        return (
          <div className={style.footerItem} key={`${item.name}${item.path}`}>
            {item.external ? (
              <a href={item.path}>{intl.formatMessage({ id: item.name })}</a>
            ) : (
              <Link to={item.path}>
                {intl.formatMessage({ id: item.name })}
              </Link>
            )}
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
