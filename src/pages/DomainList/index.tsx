import React, { useEffect } from 'react';
import { Link, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import {
  message,
  Card,
  Table,
  Space,
  Typography,
  Divider,
  TableColumnProps,
} from 'antd';
import { DomainService, Domain } from '@/client';
import { gravatarImageUrl } from '@/utils';
// import {
//   CreateDomain,
// } from 'app/components';
// import { DomainHomeContainer } from './DomainHomeContainer';

const { Title } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
  const { data, loading } = useRequest(async () => {
    const res = await DomainService.listDomainsApiV1DomainsGet();
    return res.data?.results;
  }, {
    onError: () => {
      message.error('failed to fetch domain info');
    },
  });

  const columns: Array<TableColumnProps<Domain>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'My Role',
      dataIndex: 'role',
      key: 'role',
      render: text => text || '-',
    },
    // TODO: render role as tags
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space split={<Divider type="vertical" />}>
          <Link to={`/domain/${record.url}`}>{intl.formatMessage(
            { id: 'VISIT' })}</Link>
          <Link to={`/domain/${record.url}/settings`}>{intl.formatMessage(
            { id: 'MANAGE' })}</Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginTop: 24 }}>
        <Title level={3}>{intl.formatMessage({ id: 'DOMAIN.DOMAINS' })}</Title>
        <Table
          columns={columns}
          dataSource={data || []}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </>
  );
};

export default Index;
