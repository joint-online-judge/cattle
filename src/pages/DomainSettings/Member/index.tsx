import React, { useRef } from 'react';
import { useParams, Link } from 'umi';
import { Button, Space, message, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Horse, UserWithDomainRole } from '@/utils/service';
import Gravatar from '@/components/Gravatar';
import { transPagination } from '@/utils';
import AddUserModal from './AddUserModal';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const ref = useRef<ActionType>();

  const { run: fetchDomainUsers } = useRequest(
    async (params: ProTablePagination) => {
      const response =
        await Horse.domain.listDomainUsersApiV1DomainsDomainUsersGet(
          domainUrl,
          transPagination(params),
        );
      return response.data.data ?? { count: 0, results: [] };
    },
    {
      manual: true,
      onError: () => {
        message.error('fetch domain user failed');
      },
    },
  );

  const { run: removeUser } = useRequest(
    async (userId: string) => {
      const response =
        await Horse.domain.removeDomainUserApiV1DomainsDomainUsersUserDelete(
          domainUrl,
          userId,
        );
      return response.data;
    },
    {
      manual: true,
      onSuccess: () => {
        ref.current?.reload();
        message.success('remove domain user success');
      },
      onError: () => {
        message.error('remove domain user failed');
      },
    },
  );

  const columns: ProColumns<UserWithDomainRole>[] = [
    {
      title: '学号',
      width: 140,
      dataIndex: 'studentId',
    },
    {
      title: '用户名',
      width: 160,
      render: (_, record) => (
        <Space>
          <Gravatar gravatar={record.gravatar} size="small" />
          <Link to={`/user/${record.id}`}>{record.username}</Link>
        </Space>
      ),
    },
    {
      title: '真名',
      width: 150,
      dataIndex: 'realName',
    },
    {
      title: '角色',
      width: 80,
      dataIndex: 'role',
    },
    {
      title: '操作',
      width: 96,
      key: 'option',
      valueType: 'option',
      render: (_text, record) => [
        <a type="link" key="edit">
          编辑
        </a>,
        <Popconfirm
          key="remove"
          title="Are you sure to remove this user?"
          onConfirm={() => removeUser(record.id)}
        >
          <a type="link">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<UserWithDomainRole>
      actionRef={ref}
      cardProps={false}
      columns={columns}
      request={async (params, _sorter, _filter) => {
        const data = await fetchDomainUsers(params);
        return Promise.resolve({
          data: data.results,
          total: data.count,
          success: true,
        });
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      headerTitle="Domain Users"
      toolBarRender={() => [
        <AddUserModal
          key="add-user"
          domainUrl={domainUrl}
          onSuccess={() => ref.current?.reload()}
        />,
      ]}
    />
  );
};

export default Index;
