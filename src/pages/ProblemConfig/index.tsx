import React, { useRef, useMemo, useEffect } from 'react';
import { Tooltip, Space, Button } from 'antd';
import { useIntl, useParams, useModel, useAccess, Link, history } from 'umi';
import { useRequest } from 'ahooks';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons';
import { Horse, Problem } from '@/utils/service';
import { transPagination } from '@/utils';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>();
  const ref = useRef<ActionType>();

  const { data: problem, refresh: refreshProblem } = useRequest(
    async () => {
      const res = await Horse.problem.v1GetProblem(domainUrl, problemId);
      return res.data.data;
    },
    {
      refreshDeps: [domainUrl, problemId],
      onError: (res) => {
        console.log('get problem fail', res);
      },
    },
  );

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
      onError: (res) => {},
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
        breadcrumbI18nKey: 'problem.problems',
      },
      {
        path: problem?.title ?? 'null',
        breadcrumbName: problem?.title ?? 'unknown',
      },
    ],
    [domainUrl, domain, problem],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM.SETTINGS',
    });
  }, [breads]);

  return (
    <ShadowCard
      extra={
        access.canCreateProblem ? (
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(`/domain/${domainUrl}/create-problem`);
            }}
            type="primary"
          >
            {intl.formatMessage({ id: 'PROBLEM.CREATE.TITLE' })}
          </Button>
        ) : null
      }
    >
      111
    </ShadowCard>
  );
};

export default Index;
