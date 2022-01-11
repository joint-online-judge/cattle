import React, { useRef, useMemo, useEffect } from 'react';
import { Tooltip, Space, Button } from 'antd';
import {
  useIntl,
  useParams,
  useModel,
  useAccess,
  Access,
  Link,
  history,
} from 'umi';
import { useRequest } from 'ahooks';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons';
import { Horse, Problem } from '@/utils/service';
import { transPagination } from '@/utils';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const ref = useRef<ActionType>();

  const { run: fetchProblems, loading: fetching } = useRequest(
    async (params: ProTablePagination) => {
      const res = await Horse.problem.v1ListProblems(
        domainUrl,
        transPagination(params),
      );
      return res.data.data ?? { count: 0, results: [] };
    },
    {
      manual: true,
    },
  );

  const columns: ProColumns<Problem>[] = [
    {
      title: '标题',
      width: 200,
      dataIndex: 'title',
      render: (_, record) => (
        <Space>
          <Link
            to={`/domain/${domain?.url ?? record.domainId}/problem/${
              record.url ?? record.id
            }`}
          >
            {record.title}
          </Link>
          {record.hidden ? (
            <Tooltip title="This problem is invisible to normal users.">
              <EyeInvisibleOutlined />
            </Tooltip>
          ) : null}
        </Space>
      ),
    },
    {
      title: '递交',
      width: 120,
      dataIndex: 'numSubmit',
    },
    {
      title: 'AC数量',
      width: 120,
      dataIndex: 'numAccept',
    },
  ];

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'problem',
      },
    ],
    [domainUrl, domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'problem.problems',
    });
  }, [breads]);

  return (
    <ShadowCard
      extra={
        <Access accessible={access.canCreateProblem}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(`/domain/${domainUrl}/create-problem`);
            }}
            type="primary"
          >
            {intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' })}
          </Button>
        </Access>
      }
    >
      <ProTable<Problem>
        scroll={{ x: 'max-content' }}
        loading={fetching}
        actionRef={ref}
        cardProps={false}
        columns={columns}
        request={async (params, _sorter, _filter) => {
          const data = await fetchProblems(params);
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
        options={false}
      />
    </ShadowCard>
  );
};

export default Index;
