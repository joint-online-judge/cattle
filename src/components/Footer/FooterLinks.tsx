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
    name: 'ABOUT',
    path: '/about',
  },
  {
    name: 'API',
    path: '/api',
  },
  {
    name: 'DOCS',
    path: '/docs',
  },
  {
    name: 'ISSUE',
    path: '/issue',
  },
  {
    name: 'CONTACT',
    path: '/contact',
  },
];

const Index: React.FC = () => {
  const intl = useIntl();
  return (
    <Row>
      {
        items.map((item) => {
          return (
            <div className={style.footerItem} key={`${item.name}${item.path}`}>
              <Link to={item.path}>
                {console.log(item.name)}
                {intl.formatMessage({ id: item.name })}
              </Link>
            </div>
          );
        })
      }
      <Col>
        <Typography.Link href="https://github.com/joint-online-judge" target="_blank">
          <GithubOutlined className={style.githubIcon} />
        </Typography.Link>
      </Col>
    </Row>
  );
};

export default Index;
