import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { useIntl, useParams, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { CheckOutlined } from '@ant-design/icons';
import Home from './Home';
import Submit from './Submit';
import { Horse } from '@/utils/service';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import Gravatar from '@/components/Gravatar';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useModel('domain');
  const { problemId } = useParams<{ problemId: string }>();

  const { data: ownerUserResp, run: getOwner } = useRequest(
    async (uid: string) => Horse.user.v1GetUser(uid),
    {
      manual: true,
      onSuccess: (res) => {
        // Todo: errCode
        console.log(res);
      },
    },
  );

  const { data: problemResp, run: getProblem } = useRequest(
    async (problem: string) => {
      if (domainUrl) {
        return Horse.problem.v1GetProblem(domainUrl, problem);
      }
    },
    {
      manual: true,
      onSuccess: (res) => {
        // Todo: errCode
        console.info('get problem success');
        getOwner(res?.data?.data?.ownerId ?? '');
      },
      onError: (res) => {
        console.log('get problem fail', res);
      },
    },
  );

  useEffect(() => {
    getProblem(problemId);
  }, [problemId]);

  return (
    <>
      <SideMenuPage
        extra={
          <ShadowCard style={{ marginTop: 16 }}>
            <Descriptions column={1}>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'PROBLEM.STATUS' })}
              >
                {/* todo: make status component */}
                <CheckOutlined /> Accepted
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'PROBLEM.PROBLEM_GROUP' })}
              >
                不知道
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'PROBLEM.OWNER' })}
              >
                <Gravatar size={20} user={ownerUserResp?.data?.data} />
                {ownerUserResp?.data?.data?.real_name ?? ''}
              </Descriptions.Item>
            </Descriptions>
          </ShadowCard>
        }
      >
        <PageContent menuKey="home" i18nKey="PROBLEM.HOME">
          <Home problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent menuKey="submit" i18nKey="PROBLEM.SUBMIT_CODE">
          <Submit problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent menuKey="settings" i18nKey="PROBLEM.SETTINGS">
          123
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
