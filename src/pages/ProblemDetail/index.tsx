import React, { useEffect, useMemo } from 'react';
import { message, Descriptions, Menu } from 'antd';
import { useIntl, useParams, IRouteComponentProps, useModel } from 'umi';
import { useRequest } from 'ahooks';
import {
  CheckOutlined,
  SettingOutlined,
  CodeOutlined,
  ReadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ProblemContext from './context';
import Horse, { ErrorCode } from '@/utils/service';
import SideMenuPage from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import Gravatar from '@/components/Gravatar';

const Index: React.FC<IRouteComponentProps> = ({ route, children }) => {
  const intl = useIntl();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>();

  const {
    data: problemResp,
    refresh,
    loading: fetchingProblem,
  } = useRequest(
    async () => {
      const res = await Horse.problem.v1GetProblem(domainUrl, problemId);
      return res.data;
    },
    {
      refreshDeps: [domainUrl, problemId],
      onSuccess: (res) => {
        if (res.errorCode !== ErrorCode.Success) {
          message.error('get problem fail');
        }
      },
      onError: () => {
        message.error('get problem fail');
      },
    },
  );

  const { data: owner } = useRequest(
    async () => {
      const res = await Horse.user.v1GetUser(problemResp?.data?.ownerId ?? '');
      return res.data.data;
    },
    {
      ready: Boolean(problemResp?.data?.ownerId),
      onError: () => {
        message.error('get owner failed');
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
        path: 'problem',
        breadcrumbI18nKey: 'problem.problems',
      },
      {
        path: 'null',
      },
    ],
    [domainUrl, domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      title: problemResp?.data?.title,
    });
  }, [breads, problemResp]);

  return (
    <ProblemContext.Provider
      value={{
        problem: problemResp?.data,
        loading: fetchingProblem,
        refresh,
      }}
    >
      <SideMenuPage
        defaultTab="detail"
        route={route}
        shadowCard={false}
        menu={
          <Menu mode="inline">
            <Menu.Item key="detail" icon={<ReadOutlined />}>
              {intl.formatMessage({ id: 'PROBLEM.HOME' })}
            </Menu.Item>
            <Menu.Item key="submit" icon={<CodeOutlined />}>
              {intl.formatMessage({ id: 'PROBLEM.SUBMIT_CODE' })}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="edit" icon={<EditOutlined />}>
              {intl.formatMessage({ id: 'PROBLEM.EDIT' })}
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              {intl.formatMessage({ id: 'PROBLEM.SETTINGS' })}
            </Menu.Item>
          </Menu>
        }
        extra={
          <ShadowCard>
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
                <Gravatar size={20} gravatar={owner?.gravatar} />
                {owner?.realName ?? owner?.username}
              </Descriptions.Item>
            </Descriptions>
          </ShadowCard>
        }
      >
        {/* <PageContent menuKey="detail" i18nKey="PROBLEM.SUBMIT_CODE">
          <Detail problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent
          menuKey="submit"
          i18nKey="PROBLEM.SUBMIT_CODE"
          shadowCard={false}
        >
          <Submit problem={problemResp?.data?.data} />
        </PageContent>
        <PageContent
          menuKey="edit"
          i18nKey="PROBLEM.EDIT"
          cardProps={{ title: intl.formatMessage({ id: 'PROBLEM.EDIT' }) }}
        >
          <Edit
            problem={problemResp?.data?.data}
            onUpdateSuccess={refreshProblem}
          />
        </PageContent> */}
        {children}
      </SideMenuPage>
    </ProblemContext.Provider>
  );
};

export default Index;
