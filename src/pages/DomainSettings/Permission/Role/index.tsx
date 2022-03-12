import React, { useState } from 'react';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { message, Button, Popconfirm } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import AddRoleModal from './AddRoleModal';
import { Horse, ErrorCode, DomainRole } from '@/utils/service';
import LoadFailResult from '@/components/LoadFailResult';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const {
    refresh: refetch,
    loading: fetching,
    data: roles,
  } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainRoles(domainUrl);
      return response.data.data?.results ?? [];
    },
    {
      onError: () => {
        setLoadFailed(true);
        message.error('fetch domain user failed');
      },
    },
  );

  const { run: deleteRole, loading: deleting } = useRequest(
    async (role?: string) => {
      if (typeof role !== 'string') {
        return;
      }

      const response = await Horse.domain.v1DeleteDomainRole(domainUrl, role);
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        switch (res?.errorCode) {
          case ErrorCode.Success: {
            refetch();
            message.success('delete success');

            break;
          }

          case ErrorCode.DomainRoleReadOnlyError: {
            message.error('this role is read-only');

            break;
          }

          case ErrorCode.DomainRoleUsedError: {
            message.error('users with this role exist');

            break;
          }

          default: {
            message.error('delete failed');
          }
        }
      },
      onError: () => {
        message.error('delete failed');
      },
    },
  );

  const columns: Array<ProColumns<DomainRole>> = [
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '操作',
      width: 160,
      key: 'option',
      dataIndex: 'role',
      render: (role) => [
        <Popconfirm
          title="Are you sure to delete this role?"
          onConfirm={async () => deleteRole(role?.toString())}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <Button type="link">Delete</Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ShadowCard>
      {loadFailed ? (
        <LoadFailResult />
      ) : (
        <ProTable<DomainRole>
          bordered
          scroll={{ x: 'max-content' }}
          loading={fetching || deleting}
          cardProps={false}
          search={false}
          options={false}
          pagination={false}
          columns={columns}
          rowKey="id"
          dataSource={roles ?? []}
          toolBarRender={() => [
            <AddRoleModal
              key="add"
              domainUrl={domainUrl}
              roles={roles}
              onSuccess={refetch}
            />,
          ]}
        />
      )}
    </ShadowCard>
  );
};

export default Index;
