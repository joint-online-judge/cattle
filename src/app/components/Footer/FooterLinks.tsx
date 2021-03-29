import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
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

export const FooterLinks = observer(() => {
  const { t } = useTranslation();
  return (
    <Row>
      {
        items.map((item) => {
          return (
            <div className={style.FooterItem} key={`${item.name}${item.path}`}>
              <Link to={item.path}>
                {t(item.name)}
              </Link>
            </div>
          );
        })
      }
      <Col>
        <Typography.Link href="https://github.com/joint-online-judge">
          <GithubOutlined className={style.GithubIcon} />
        </Typography.Link>
      </Col>
    </Row>
  );
});
