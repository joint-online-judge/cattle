import React, { useMemo, useEffect, useState } from 'react';
import { message, Typography, Spin, Button, Row, Col } from 'antd';
import {
  useParams,
  useIntl,
  useModel,
  useAccess,
  history,
  IRouteComponentProps,
} from 'umi';
import { useRequest } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import ProblemList from './ProblemList';
import AfterDue from './AfterDue';
import BeforeAvailable from './BeforeAvailable';
import { ErrorCode, Horse } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';
import SideMenuPage from '@/components/SideMenuPage';
import MarkdownRender from '@/components/MarkdownRender';

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  const intl = useIntl();
  const access = useAccess();
  const { setHeader } = useModel('pageHeader');
  const { domain } = useModel('domain');
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>();
  const [beforeAvailable, setBeforeAvailable] = useState<boolean>(false);
  const [afterDue, setAfterDue] = useState<boolean>(false);

  const { data: problemSet } = useRequest(
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
      title: problemSet?.title ?? 'unknown',
    });
  }, [breads]);

  return afterDue ? (
    <AfterDue />
  ) : beforeAvailable ? (
    <BeforeAvailable />
  ) : (
    <SideMenuPage route={route} shadowCard={false}>
      <Row gutter={[0, 24]}>
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
            title={intl.formatMessage({ id: 'PROBLEM' })}
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
            <ProblemList problems={problemSet?.problems} />
          </ShadowCard>
        </Col>
      </Row>
    </SideMenuPage>
  );
};

export default Index;
