import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useModel } from 'umi';
import { message, Row, Col } from 'antd';
import { useRequest } from 'ahooks';
import ProCard from '@ant-design/pro-card';
import DraggableProblemTable from './DraggableProblemTable';
import AddExistProblem from './AddExistProblem';
import Horse from '@/utils/service';
import { transPagination } from '@/utils';
import { VERTICAL_GUTTER } from '@/constants';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const [tab, setTab] = useState('tab1');
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();

  const {
    data: problemSet,
    refresh: refreshProblemSet,
    loading: fetchingProblemSet,
  } = useRequest(
    async () => {
      const res = await Horse.problemSet.v1GetProblemSet(
        domainUrl,
        problemSetId,
      );
      return res.data.data;
    },
    {
      onError: () => {
        message.error('failed to fetch domain info');
      },
    },
  );

  const {
    run: fetchProblems,
    refresh: refreshProblems,
    loading: fetchingProblems,
  } = useRequest(
    async (parameters: ProTablePagination) => {
      const res = await Horse.problem.v1ListProblems(domainUrl, {
        ...transPagination(parameters),
        ordering: '-created_at',
      });
      return res.data.data ?? { count: 0, results: [] };
    },
    {
      manual: true,
    },
  );

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'problem-set',
        breadcrumbI18nKey: 'PROBLEM_SET.PROBLEM_SET',
      },
      {
        path: problemSetId,
        breadcrumbName: problemSet?.title ?? 'unknown',
      },
      {
        path: 'settings',
      },
    ],
    [domainUrl, domain?.name, problemSetId, problemSet?.title],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'problem_set.side_menu.settings',
    });
  }, [breads, setHeader]);

  return (
    <Row gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <ShadowCard bodyStyle={{ padding: 0 }}>
          <ProCard split="vertical">
            <ProCard
              title="Problem List"
              colSpan="30%"
              bodyStyle={{ padding: 16 }}
            >
              <DraggableProblemTable
                problems={problemSet?.problems ?? []}
                loading={fetchingProblemSet}
                onDeleteSuccess={() => {
                  refreshProblemSet();
                  refreshProblems();
                }}
                onUpdateFinish={async () => refreshProblemSet()}
              />
            </ProCard>
            <ProCard
              tabs={{
                activeKey: tab,
                onChange: setTab,
                animated: { inkBar: true, tabPane: true },
              }}
            >
              <ProCard.TabPane key="tab1" tab="Add Existed">
                <AddExistProblem
                  fetchingProblems={fetchingProblems}
                  onAddSuccess={refreshProblemSet}
                  fetchProblems={fetchProblems}
                  problemIdList={problemSet?.problems?.map((p) => p.id) ?? []}
                />
              </ProCard.TabPane>
              <ProCard.TabPane key="tab2" tab="Clone">
                TODO: Clone
              </ProCard.TabPane>
            </ProCard>
          </ProCard>
        </ShadowCard>
      </Col>
    </Row>
  );
};

export default Index;
