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
import { Horse } from '@/utils/service';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import Gravatar from '@/components/Gravatar';
import Detail from './Detail';
import Submit from './Submit';
import Edit from './Edit';
import Settings from './Settings';

const Index: React.FC<IRouteComponentProps> = ({ route }) => {
  const intl = useIntl();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>();

  const { data: problemResp, refresh: refreshProblem } = useRequest(
    async () =>
      Horse.problem.getProblemApiV1DomainsDomainProblemsProblemGet(
        domainUrl,
        problemId,
      ),
    {
      refreshDeps: [domainUrl, problemId],
      onError: (res) => {
        console.log('get problem fail', res);
      },
    },
  );

  const { data: owner } = useRequest(
    async () => {
      const res = await Horse.user.getUserApiV1UsersUidGet(
        problemResp?.data.data?.ownerId ?? '',
      );
      return res.data.data;
    },
    {
      ready: !!problemResp?.data.data?.ownerId,
      onError: () => {
        message.error('get owner failed');
      },
    },
  );

  const breads = useMemo(
    () => [
      {
        path: domainUrl,
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
      title: problemResp?.data.data?.title ?? 'Problem',
    });
  }, [breads, problemResp]);

  return (
    <>
      <SideMenuPage
        defaultTab="detail"
        route={route}
        routerMode="param"
        matchMode="children"
        menu={
          <Menu mode="inline">
            <Menu.Item
              key="detail"
              icon={<ReadOutlined />}
              style={{ margin: 0 }}
            >
              {intl.formatMessage({ id: 'PROBLEM.HOME' })}
            </Menu.Item>
            <Menu.Item
              key="submit"
              icon={<CodeOutlined />}
              style={{ margin: 0 }}
            >
              {intl.formatMessage({ id: 'PROBLEM.SUBMIT_CODE' })}
            </Menu.Item>
            <Menu.Item key="edit" icon={<EditOutlined />} style={{ margin: 0 }}>
              {intl.formatMessage({ id: 'PROBLEM.EDIT' })}
            </Menu.Item>
            <Menu.Item
              key="settings"
              icon={<SettingOutlined />}
              style={{ margin: 0 }}
            >
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
        <PageContent menuKey="detail" i18nKey="PROBLEM.SUBMIT_CODE">
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
        </PageContent>
        <PageContent menuKey="settings" i18nKey="PROBLEM.SETTINGS">
          <Settings problem={problemResp?.data?.data} />
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
