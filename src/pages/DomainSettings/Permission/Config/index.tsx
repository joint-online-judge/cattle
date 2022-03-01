import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { message, Checkbox, Form } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import {
  isArray,
  toPairs,
  fromPairs,
  flatten,
  uniq,
  groupBy,
  merge,
} from 'lodash';
import Horse, {
  DomainPermission,
  DomainRoleEdit,
  ErrorCode,
} from '@/utils/service';
import LoadFailResult from '@/components/LoadFailResult';
import ShadowCard from '@/components/ShadowCard';

type DataSourceType = {
  id: string;
  permission: string;
} & Record<string, boolean>;

const Index: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [activekey, setActiveKey] = useState<keyof DomainPermission>('general');
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const {
    refresh: refetch,
    loading: fetching,
    data: roles,
  } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainRoles(domainUrl, {
        ordering: 'created_at',
      });
      return response.data.data?.results ?? [];
    },
    {
      onSuccess: () => {
        form.resetFields();
      },
      onError: () => {
        setLoadFailed(true);
        message.error('fetch domain user failed');
      },
    },
  );

  const { run: updateRole, loading: updating } = useRequest(
    async (role: string, data: DomainRoleEdit) => {
      const response = await Horse.domain.v1UpdateDomainRole(
        domainUrl,
        role,
        data,
      );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('update success');
        } else if (res.errorCode === ErrorCode.DomainRoleReadOnlyError) {
          message.error('this role is read-only');
        } else {
          message.error('update failed');
        }

        refetch();
      },
      onError: () => {
        refetch();
        message.error('fetch domain user failed');
      },
    },
  );

  const columns: Array<ProColumns<DataSourceType>> = useMemo(() => {
    if (isArray(roles)) {
      const roleCols: Array<ProColumns<DataSourceType>> = roles.map((role) => ({
        title: role.role,
        width: 60,
        dataIndex: role.role,
        align: 'center',
        formItemProps: {
          valuePropName: 'checked',
        },
        renderFormItem: (e) => (
          <Checkbox
            onChange={(domEvent) => {
              // @ts-expect-error incomplete typings
              const row = e.entity as Record<string, string>;
              const role = e.dataIndex as string;
              const originDomainRole = roles.find((r) => r.role === role);

              if (originDomainRole === undefined) {
                return;
              }

              updateRole(role, {
                permission: merge(originDomainRole.permission, {
                  [activekey]: {
                    [row.permission]: domEvent.target.checked,
                  },
                }),
              });
            }}
          />
        ),
      }));

      roleCols.unshift({
        title: intl.formatMessage({ id: 'PERMISSION' }),
        width: 200,
        dataIndex: 'permission',
        editable: false,
      });

      return roleCols;
    }

    return [];
  }, [roles, intl, activekey, updateRole]);

  const categories = useMemo(() => {
    if (!isArray(roles) || roles.length === 0) {
      return [];
    }

    return uniq(flatten(roles.map((r) => Object.keys(r.permission))));
  }, [roles]);

  const dataSource: DataSourceType[] = useMemo(() => {
    if (!isArray(roles) || roles.length === 0) {
      return [];
    }

    const permissionGroup = groupBy(
      flatten(
        roles
          .map((r) => ({
            role: r.role,
            permission: toPairs(r.permission[activekey]),
          }))
          .map((o) =>
            o.permission.map((pair) => ({
              permName: pair[0],
              roleValue: [o.role, pair[1]],
            })),
          ),
      ),
      (o) => o.permName,
    );

    const dataSource = toPairs(permissionGroup).map((pair) => ({
      id: `${activekey}-${pair[0]}`,
      permission: pair[0],
      ...fromPairs(pair[1].map((o) => o.roleValue)),
    }));
    return dataSource as DataSourceType[];
  }, [roles, activekey]);

  useEffect(() => {
    setEditableRowKeys(dataSource.map((o) => o.id));
  }, [dataSource]);

  return (
    <ShadowCard>
      {loadFailed ? (
        <LoadFailResult />
      ) : (
        <EditableProTable<DataSourceType>
          bordered
          rowKey="id"
          columns={columns}
          value={dataSource}
          scroll={{ x: 'max-content' }}
          loading={fetching || updating}
          cardProps={false}
          search={false}
          options={false}
          pagination={false}
          recordCreatorProps={false}
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activekey,
              items: categories.map((c) => ({
                key: c,
                label: <span>{c}</span>,
              })),
              onChange: (key: any) => {
                setActiveKey(key);
              },
            },
          }}
          editable={{
            type: 'multiple',
            form,
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      )}
    </ShadowCard>
  );
};

export default Index;
