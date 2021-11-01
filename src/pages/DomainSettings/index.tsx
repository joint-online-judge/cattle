import React, { useEffect } from 'react';
import { useParams, useModel } from 'umi';
import { Divider, PageHeader } from 'antd';
import UpdateDomain from './UpdateDomain';
import { gravatarImageUrl } from '@/utils';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';
// import style from './style.css';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain, refresh } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

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
          title={domain?.name || ''}
          subTitle={domain?.url || ''}
          style={{ padding: 0 }}
          avatar={{ src: gravatarImageUrl(domain?.gravatar || '') }}
        />

        {domain &&
        typeof domain.bulletin === 'string' &&
        domain.bulletin.length > 0 ? (
          <>
            <Divider />
            <MarkdownRender children={domain?.bulletin || ''} />
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
