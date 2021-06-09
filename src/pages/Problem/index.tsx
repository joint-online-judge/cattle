import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { useIntl, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import Home from './Home';
import Submit from './Submit';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import { CheckOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';

const Index: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const intl = useIntl();

  const { data: ownerUserResp, run: getOwner } = useRequest(
    (uid: string) => Horse.user.getUserApiV1UsersUidGet(uid),
    {
      manual: true,
      onSuccess: (res) => {
        // todo: errCode
        console.info('get owner success');
      },
    },
  );

  const { data: problemResp, run: getProblem } = useRequest(
    (problem: string) =>
      Horse.problem.getProblemApiV1ProblemsProblemGet(problem),
    {
      manual: true,
      onSuccess: (res) => {
        // todo: errCode
        console.info('get problem success');
        getOwner(res?.data?.data?.owner as string);
      },
      onError: (res) => {
        console.error('get problem fail');
      },
    },
  );

  useEffect(() => {
    getProblem(problemId);
  }, [problemId]);

  return (
    <>
      <SideMenuPage extra={
        <ShadowCard style={{ marginTop: 16 }}>
          <Descriptions column={1}>
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.STATUS' })}
            >
              {/* todo: make status component */}
              <CheckOutlined /> Accepted
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.PROBLEM_GROUP' })}
            >
              不知道
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.OWNER' })}
            >
              <Gravatar size={20} user={ownerUserResp?.data?.data} />
              {ownerUserResp?.data?.data?.real_name || ''}
            </Descriptions.Item>
          </Descriptions>
        </ShadowCard>
      }>
        <PageContent menuKey="PROBLEM.HOME">
          <Home problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent menuKey="PROBLEM.SUBMIT_CODE">
          <Submit problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent menuKey="PROBLEM.SETTINGS">
          123
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
