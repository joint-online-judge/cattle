import React from 'react';
import { useIntl } from 'umi';
import { Link } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import style from './style.css';

interface LinkItem {
  name: string;
  path: string;
  external: boolean;
}

const items: LinkItem[] = [
  {
    name: 'FOOTER.ABOUT',
    path: '/about',
    external: false,
  },
  {
    name: 'FOOTER.API',
    path: '/api/v1',
    external: false,
  },
  {
    name: 'FOOTER.DOCS',
    path: 'https://joint-online-judge.github.io/',
    external: false,
  },
  {
    name: 'FOOTER.ISSUE',
    path: 'https://github.com/joint-online-judge/cattle/issues',
    external: false,
  },
  {
    name: 'FOOTER.CONTACT',
    path: 'mailto:liuyh615@126.com',
    external: false,
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
              <Link to={item.path}>
                {intl.formatMessage({ id: item.name })}
              </Link>
            ) : (
              <a href={item.path}>{intl.formatMessage({ id: item.name })}</a>
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
