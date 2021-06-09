import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';
import SideBar from './SideBar';
import Home from './Home';
import Submit from './Submit';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';

const Index: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();

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
      <SideMenuPage>
        <PageContent menuKey="PROBLEM.HOME" text="123">
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
