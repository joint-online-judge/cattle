import React, { useEffect, useMemo } from 'react';
import { useParams, useModel } from 'umi';
import { Divider, PageHeader } from 'antd';
import UpdateDomain from './UpdateDomain';
import style from './style.css';
import { gravatarImageUrl } from '@/utils';
import SideMenuPage, { PageContent } from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain, refresh } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const routes = useMemo(
    () => [
      {
        path: 'domain',
        breadcrumbI18nKey: 'DOMAIN.DOMAINS',
      },
      {
        path: domainUrl,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'settings',
        breadcrumbI18nKey: 'SETTINGS.DOMAIN',
      },
    ],
    [domainUrl, domain],
  );

  useEffect(() => {
    setHeader({
      routes,
      titleI18nKey: 'SETTINGS.DOMAIN',
    });
  }, [routes, setHeader]);

  return (
    <>
      <ShadowCard style={{ marginBottom: 24 }}>
        <PageHeader
          title={domain?.name ?? ''}
          subTitle={domain?.url ?? ''}
          style={{ padding: 0 }}
          avatar={{ src: gravatarImageUrl(domain?.gravatar ?? '') }}
        />
        <Divider />
        <div className={style.domainSettingsBulletin}>
          <MarkdownRender>{domain?.bulletin ?? ''}</MarkdownRender>
        </div>
      </ShadowCard>
      <SideMenuPage>
        <PageContent menuKey="profile" i18nKey="SETTINGS.DOMAIN.PROFILE">
          <UpdateDomain refresh={refresh} />
        </PageContent>
        <PageContent menuKey="invitation" i18nKey="SETTINGS.DOMAIN.INVITATION">
          <h1>Invitation</h1>
        </PageContent>
        <PageContent menuKey="members" i18nKey="SETTINGS.DOMAIN.MEMBERS">
          <h1>Members</h1>
        </PageContent>
      </SideMenuPage>
    </>
  );
};

export default Index;
