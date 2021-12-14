import React, { useEffect, useMemo } from 'react';
import { useParams, useModel, IRouteComponentProps } from 'umi';
import { Divider, PageHeader } from 'antd';
import style from './style.css';
import { gravatarImageUrl } from '@/utils';
import SideMenuPage from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'settings',
      },
    ],
    [domainUrl, domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'SETTINGS.DOMAIN',
    });
  }, [breads]);

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
      <SideMenuPage route={route} shadowCard={false}>
        {children}
      </SideMenuPage>
    </>
  );
};

export default Index;
