import ShadowCard from '@/components/ShadowCard';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import { Horse } from '@/utils/service';
import {
  CodeOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Menu, message, Progress } from 'antd';
import mm from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { IRouteComponentProps, useIntl, useModel, useParams } from 'umi';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import EditDetail from './EditDetail';
import style from './style.less';
import ViewDetail from './ViewDetail';

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  const intl = useIntl();
  const { setHeader } = useModel('pageHeader');
  const { domain } = useModel('domain');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();
  const [beforeAvailable, setBeforeAvailable] = useState<boolean>(false);
  const [afterDue, setAfterDue] = useState<boolean>(false);

  const {
    data: problemSet,
    loading,
    refresh: refreshProblemSet,
  } = useRequest(
    async () => {
      const res = await Horse.problemSet.v1GetProblemSet(
        domainUrl,
        problemSetId,
      );
      // if (res.data.errorCode === ErrorCode.ProblemSetAfterDueError) {
      //   setAfterDue(true);
      // } else if (
      //   res.data.errorCode === ErrorCode.ProblemSetBeforeAvailableError
      // ) {
      //   setBeforeAvailable(true);
      // }

      return res.data.data;
    },
    {
      onError: () => {
        message.error('failed to problem set info');
      },
    },
  );

  const acRate: number = useMemo(() => {
    if (
      typeof problemSet?.numSubmit === 'number' &&
      typeof problemSet?.numAccept === 'number' &&
      problemSet.numSubmit > 0
    ) {
      return Math.ceil(problemSet.numAccept / problemSet.numSubmit);
    }
    return 0;
  }, [problemSet]);

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
      },
    ],
    [domain, problemSet],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      title: problemSet?.title,
    });
  }, [breads]);

  return afterDue ? (
    <AfterDue />
  ) : beforeAvailable ? (
    <BeforeAvailable />
  ) : (
    <SideMenuPage
      route={route}
      shadowCard={false}
      matchMode="children"
      defaultTab="detail"
      menu={
        <Menu mode="inline">
          <Menu.Item key="detail" icon={<EyeOutlined />}>
            {intl.formatMessage({ id: 'problem_set.side_menu.detail' })}
          </Menu.Item>
          <Menu.Item key="scoreboard" icon={<TrophyOutlined />}>
            {intl.formatMessage({ id: 'problem_set.side_menu.scoreboard' })}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="system-test" icon={<CodeOutlined />}>
            {intl.formatMessage({ id: 'problem_set.side_menu.system_test' })}
          </Menu.Item>
          <Menu.Item key="edit" icon={<EditOutlined />}>
            {intl.formatMessage({ id: 'problem_set.side_menu.edit' })}
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            {intl.formatMessage({ id: 'problem_set.side_menu.settings' })}
          </Menu.Item>
        </Menu>
      }
      extra={
        <ShadowCard loading={loading}>
          <dl className={style.infoCard}>
            <dt>Status</dt>
            <dd>Finished</dd>
            <dt>Due At</dt>
            <dd>
              {problemSet?.dueAt
                ? mm(problemSet.dueAt).format('YYYY-MM-DD HH:mm:ss')
                : 'Never'}
            </dd>
            <dt>Lock At</dt>
            <dd>
              {problemSet?.lockAt
                ? mm(problemSet.lockAt).format('YYYY-MM-DD HH:mm:ss')
                : 'Never'}
            </dd>
            <dt>Accept Rate</dt>
            <dd>
              <Progress
                type="dashboard"
                width={80}
                success={{ percent: acRate }}
                format={() => `${acRate}%`}
                style={{ marginTop: 12 }}
              />
            </dd>
          </dl>
        </ShadowCard>
      }
    >
      <PageContent menuKey="detail" shadowCard={false}>
        <ViewDetail problemSet={problemSet} loading={loading} />
      </PageContent>
      <PageContent menuKey="edit" shadowCard={false}>
        <EditDetail
          problemSet={problemSet}
          loading={loading}
          onUpdateSuccess={() => {
            refreshProblemSet();
          }}
        />
      </PageContent>
    </SideMenuPage>
  );
};

export default Index;
