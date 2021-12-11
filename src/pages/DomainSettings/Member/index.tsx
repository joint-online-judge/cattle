import React, { useRef, useState } from 'react';
import { useParams, Link } from 'umi';
import { Space, message, Popconfirm, Tag, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { Horse, UserWithDomainRole, DomainUserAdd } from '@/utils/service';
import { transPagination } from '@/utils';
import AddUserModal from './AddUserModal';
import Gravatar from '@/components/Gravatar';

const Index: React.FC = () => {
  const [modalVis, setModalVis] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<
    UserWithDomainRole | undefined
  >(undefined);
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const tableRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance<DomainUserAdd>>();

  const { run: fetchDomainUsers, loading: fetching } = useRequest(
    async (params: ProTablePagination) => {
      const response = await Horse.domain.v1ListDomainUsers(
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

  const { run: removeUser, loading: deleting } = useRequest(
    async (userId: string) => {
      const response = await Horse.domain.v1RemoveDomainUser(domainUrl, userId);
      return response.data;
    },
    {
      manual: true,
      onSuccess: () => {
        tableRef.current?.reload();
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
      width: 140,
      render: (_, record) => (
        <Space>
          <Gravatar gravatar={record.gravatar} size="small" />
          <Link to={`/user/${record.id}`}>{record.username}</Link>
        </Space>
      ),
    },
    {
      title: '真名',
      width: 120,
      ellipsis: true,
      dataIndex: 'realName',
    },
    {
      title: '角色',
      width: 120,
      dataIndex: 'domainRole',
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_text, record) => [
        <a
          type="link"
          key="edit"
          onClick={() => {
            setEditingUser(record);
            setModalVis(true);
          }}
        >
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
    <>
      <ProTable<UserWithDomainRole>
        scroll={{ x: 'max-content' }}
        loading={fetching || deleting}
        actionRef={tableRef}
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
        toolBarRender={() => [
          <Button
            key="add-user"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => {
              setEditingUser(undefined);
              setModalVis(true);
              modalFormRef.current?.resetFields();
            }}
          >
            添加用户
          </Button>,
        ]}
      />
      <AddUserModal
        domainUrl={domainUrl}
        onSuccess={() => tableRef.current?.reload()}
        visible={modalVis}
        onVisibleChange={setModalVis}
        formRef={modalFormRef as any}
        editingUser={editingUser}
      />
    </>
  );
};

export default Index;
