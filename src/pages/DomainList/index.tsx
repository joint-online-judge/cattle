import React, { useEffect } from 'react';
import { Link, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { message, Table, Space, Divider, TableColumnProps } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { Horse, Domain } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const { setHeader } = useModel('pageHeader');

  useEffect(() => {
    setHeader({
      titleI18nKey: 'DOMAIN.DOMAINS',
    });
  }, []);

  const { data, loading } = useRequest(
    async () => {
      const res = await Horse.domain.listDomainsApiV1DomainsGet();
      return res?.data?.data?.results ?? [];
    },
    {
      onError: () => {
        message.error(
          intl.formatMessage(
            { id: 'msg.error.fetch' },
            { data: intl.formatMessage({ id: 'domain' }) },
          ),
        );
      },
    },
  );

  const columns: Array<TableColumnProps<Domain>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'domain.url',
    },
    {
      title: 'My Role',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => text || '-',
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
          <Link to={`/domain/${record.url}`}>
            {intl.formatMessage({ id: 'VISIT' })}
          </Link>
          <Link to={`/domain/${record.url}/settings`}>
            {intl.formatMessage({ id: 'MANAGE' })}
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ShadowCard>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </ShadowCard>
    </>
  );
};

export default Index;
