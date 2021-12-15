import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useParams, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { message, Checkbox } from 'antd';
import {
  EditableProTable,
  ProColumns,
  ActionType,
} from '@ant-design/pro-table';
import { Horse, DomainPermission, DomainRoleCreate } from '@/utils/service';
import { isArray, toPairs, fromPairs, flatten, uniq, groupBy } from 'lodash';
import LoadFailResult from '@/components/LoadFailResult';
import ShadowCard from '@/components/ShadowCard';
import AddRoleModal from './AddRoleModal';

type DataSourceType = {
  id: string;
  permission: string;
} & Record<string, boolean>;

const Index: React.FC = () => {
  const intl = useIntl();
  const ref = useRef<ActionType>();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [activekey, setActiveKey] = useState<keyof DomainPermission>('general');
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const {
    run: fetchDomainRoles,
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

  const { run: createRole, loading: creating } = useRequest(
    async (values: DomainRoleCreate) => {
      const response = await Horse.domain.v1CreateDomainRole(domainUrl, values);
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

  const columns: ProColumns<DataSourceType>[] = useMemo(() => {
    if (isArray(roles)) {
      const roleCols: ProColumns<DataSourceType>[] = roles.map((role) => ({
        title: role.role,
        width: 80,
        dataIndex: role.role,
        align: 'center',
        formItemProps: {
          valuePropName: 'checked',
        },
        renderFormItem: (e) => {
          return <Checkbox onChange={() => {}} />;
        },
      }));

      roleCols.unshift({
        title: intl.formatMessage({ id: 'Permissions' }),
        width: 160,
        dataIndex: 'permission',
        editable: false,
      });

      return roleCols;
    }

    return [];
  }, [roles, intl]);

  const categories = useMemo(() => {
    if (!isArray(roles) || roles.length == 0) return [];
    return uniq(flatten(roles.map((r) => Object.keys(r.permission))));
  }, [roles]);

  const dataSource: DataSourceType[] = useMemo(() => {
    if (!isArray(roles) || roles.length == 0) return [];

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

  const onChange = (e: any) => console.log(e);

  return (
    <ShadowCard>
      {loadFailed ? (
        <LoadFailResult />
      ) : (
        <EditableProTable<DataSourceType>
          bordered
          scroll={{ x: 'max-content' }}
          loading={fetching || creating}
          cardProps={false}
          search={false}
          options={false}
          pagination={false}
          columns={columns}
          rowKey="id"
          value={dataSource}
          onChange={onChange}
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
            actions: [
              <AddRoleModal
                domainUrl={domainUrl}
                roles={roles}
                onSuccess={refetch}
              />,
            ],
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              console.log(record, recordList);
            },
            onChange: setEditableRowKeys,
          }}
        />
      )}
    </ShadowCard>
  );
};

export default Index;
