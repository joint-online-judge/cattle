import React, { useMemo, useEffect, useState } from 'react';
import { message, Typography, Spin, Button, Row, Col, Progress } from 'antd';
import mm from 'moment';
import {
  useParams,
  useIntl,
  useModel,
  useAccess,
  Access,
  history,
  IRouteComponentProps,
} from 'umi';
import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import ProblemList from './ProblemList';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import { ErrorCode, Horse } from '@/utils/service';
import { VERTICAL_GUTTER } from '@/constants';
import ShadowCard from '@/components/ShadowCard';
import SideMenuPage from '@/components/SideMenuPage';
import MarkdownRender from '@/components/MarkdownRender';
import style from './style.less';

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  const intl = useIntl();
  const access = useAccess();
  const { setHeader } = useModel('pageHeader');
  const { domain } = useModel('domain');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();
  const [beforeAvailable, setBeforeAvailable] = useState<boolean>(false);
  const [afterDue, setAfterDue] = useState<boolean>(false);

  const { data: problemSet, loading } = useRequest(
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
      <Row gutter={VERTICAL_GUTTER}>
        {problemSet?.content ? (
          <Col span={24}>
            <ShadowCard
              title={intl.formatMessage({ id: 'PROBLEM_SET.INTRODUCTION' })}
            >
              <Spin spinning={!problemSet}>
                {problemSet ? (
                  <Typography>
                    <MarkdownRender>{problemSet.content ?? ''}</MarkdownRender>
                  </Typography>
                ) : null}
              </Spin>
            </ShadowCard>
          </Col>
        ) : null}

        <Col span={24}>
          <ShadowCard
            loading={loading}
            title={intl.formatMessage({ id: 'PROBLEM' })}
            bodyStyle={
              problemSet?.problems && problemSet.problems.length > 0
                ? {
                    padding: 0,
                  }
                : undefined
            }
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
            <ProblemList problems={problemSet?.problems} />
          </ShadowCard>
        </Col>
      </Row>
    </SideMenuPage>
  );
};

export default Index;
