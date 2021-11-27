import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useParams, Link, useIntl } from 'umi';
import { Space, message, Popconfirm, Button, Checkbox } from 'antd';
import {
  EditableProTable,
  ProColumns,
  ActionType,
} from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Horse, DomainPermission } from '@/utils/service';
import { isArray, toPairs, fromPairs, flatten, uniq, groupBy } from 'lodash';

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

  const {
    run: fetchDomainRoles,
    refresh: refetch,
    loading: fetching,
    data: roles,
  } = useRequest(
    async () => {
      const response =
        await Horse.domain.listDomainRolesApiV1DomainsDomainRolesGet(domainUrl);
      return response.data.data?.results ?? [];
    },
    {
      onError: () => {
        message.error('fetch domain user failed');
      },
    },
  );

  const { run: removeUser, loading: deleting } = useRequest(
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

  const columns: ProColumns<DataSourceType>[] = useMemo(() => {
    if (isArray(roles)) {
      const roleCols: ProColumns<DataSourceType>[] = roles.map((role) => ({
        title: role.role,
        width: 100,
        dataIndex: role.role,
        align: 'center',
        formItemProps: {
          valuePropName: 'checked',
        },
        renderFormItem: () => <Checkbox />,
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

    console.log('origin: ', roles);
    console.log('activeKey', activekey);

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

    console.log(permissionGroup);

    const dataSource = toPairs(permissionGroup).map((pair) => ({
      id: `${activekey}-${pair[0]}`,
      permission: pair[0],
      ...fromPairs(pair[1].map((o) => o.roleValue)),
    }));

    console.log(dataSource);

    return dataSource as DataSourceType[];
  }, [roles, activekey]);

  useEffect(() => {
    setEditableRowKeys(dataSource.map((o) => o.id));
  }, [dataSource]);

  const onChange = (e: any) => console.log(e);

  return (
    <EditableProTable<DataSourceType>
      bordered
      loading={fetching}
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
          <Button
            type="primary"
            key="create"
            onClick={() => {
              // dataSource 就是当前数据，可以调用 api 将其保存
              console.log(dataSource);
            }}
          >
            创建角色
          </Button>,
        ],
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          console.log(record);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default Index;