import {
  CodeOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Menu, Progress } from 'antd';
import mm from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { IRouteComponentProps, useIntl, useModel, useParams } from 'umi';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import style from './style.less';
import SideMenuPage from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC<IRouteComponentProps> = ({ route, children }) => {
  const intl = useIntl();
  const { setHeader } = useModel('pageHeader');
  const { domain } = useModel('domain');
  const { problemSet, fetchProblemSet, loading } = useModel('problemSet');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();
  const [status, setStatus] = useState<
    'NOT_STARTED' | 'LOCKED' | 'OVERDUE' | 'ONGOING'
  >('ONGOING');

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
    [domainUrl, domain?.name, problemSetId],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      title: problemSet?.title,
    });
  }, [breads, setHeader, problemSet?.title]);

  useEffect(() => {
    fetchProblemSet(domainUrl, problemSetId);
    return () => {
      fetchProblemSet(null, null);
    };
  }, [domainUrl, problemSetId, fetchProblemSet]);

  useEffect(() => {
    const now = mm();
    if (problemSet?.unlockAt) {
      const unlockTime = mm(problemSet?.unlockAt);
      if (now.isBefore(unlockTime)) {
        setStatus('NOT_STARTED');
        return;
      }
    }

    if (problemSet?.lockAt) {
      const lockTime = mm(problemSet?.lockAt);
      if (now.isAfter(lockTime)) {
        setStatus('LOCKED');
        return;
      }
    }

    if (problemSet?.dueAt) {
      const dueTime = mm(problemSet?.dueAt);
      if (now.isAfter(dueTime)) {
        setStatus('OVERDUE');
        return;
      }
    }

    setStatus('ONGOING');
  }, [problemSet]);

  if (status === 'NOT_STARTED') {
    return <BeforeAvailable />;
  }

  if (status === 'LOCKED') {
    return <AfterDue />;
  }

  if (status === 'OVERDUE') {
    return <AfterDue />;
  }

  return (
    <SideMenuPage
      route={route}
      shadowCard={false}
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
      {children}
    </SideMenuPage>
  );
};

export default Index;
