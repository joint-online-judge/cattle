import React, { useEffect, useState } from 'react';
import { useParams, useModel } from 'umi';
import { Card, Col, Divider, PageHeader, Row, Spin } from 'antd';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import UpdateDomain from './UpdateDomain';
import { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';
import { gravatarImageUrl } from '@/utils';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';
import style from './style.css';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const { data, refresh } = useRequest(async () => {
    const res = await Horse.domain.getDomainApiV1DomainsDomainGet(domainUrl);
    return res.data.data;
  });

  const routes = [
    {
      path: 'domain',
      breadcrumbI18nKey: 'DOMAIN.DOMAINS',
    },
    {
      path: domainUrl,
      breadcrumbName: domain?.name || 'unknown',
    },
    {
      path: 'settings',
      breadcrumbI18nKey: 'SETTINGS.DOMAIN',
    },
  ];

  const menuItems: SettingsMenuItem[] = [
    {
      menuKey: 'SETTINGS.DOMAIN.PROFILE',
      path: '/profile',
      component: <UpdateDomain refresh={refresh} />,
    },
    {
      menuKey: 'SETTINGS.DOMAIN.INVITATION',
      component: <UpdateDomain refresh={refresh} />,
      path: '/invitation',
    },
    {
      menuKey: 'SETTINGS.DOMAIN.MEMBERS',
      component: <UpdateDomain refresh={refresh} />,
      path: '/members',
    },
  ];

  useEffect(() => {
    setHeader({
      routes,
      titleI18nKey: 'SETTINGS.DOMAIN',
    });
  }, []);

  return (
    <>
      <ShadowCard style={{ marginBottom: 24 }}>
        <PageHeader
          title={data?.name || ''}
          subTitle={data?.url || ''}
          style={{ padding: 0 }}
          avatar={{ src: gravatarImageUrl(data?.gravatar || '') }}
        />

        {data &&
        typeof data.bulletin === 'string' &&
        data.bulletin.length > 0 ? (
          <>
            <Divider />
            <MarkdownRender children={data?.bulletin || ''} />
          </>
        ) : null}
      </ShadowCard>
      <SideMenuPage>
        <PageContent menuKey="SETTINGS.DOMAIN.PROFILE">
          <UpdateDomain refresh={refresh} />
        </PageContent>
        <PageContent menuKey="SETTINGS.DOMAIN.INVITATION">
          <UpdateDomain refresh={refresh} />
        </PageContent>
        <PageContent menuKey="SETTINGS.DOMAIN.MEMBERS">
          <UpdateDomain refresh={refresh} />
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
