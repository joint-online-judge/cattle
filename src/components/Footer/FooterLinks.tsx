import React from 'react';
import { useIntl } from 'umi';
import { Link } from 'react-router-dom';
import { Divider, Row, Typography, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import style from './style.less';

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
    path: '/api',
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
      <Space split={<Divider type="vertical" />} wrap={true} size="small">
        {items.map((item) => {
          return (
            <div key={`${item.name}${item.path}`}>
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
        <Typography.Link
          href="https://github.com/joint-online-judge"
          target="_blank"
        >
          <GithubOutlined className={style.githubIcon} />
        </Typography.Link>
      </Space>
    </Row>
  );
};

export default Index;
