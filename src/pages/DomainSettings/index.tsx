import React, { useEffect, useMemo } from 'react';
import { useParams, useModel, IRouteComponentProps, useIntl } from 'umi';
import { Divider, PageHeader, Menu } from 'antd';
import {
  ProfileOutlined,
  SolutionOutlined,
  LockOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { gravatarImageUrl } from '@/utils';
import SideMenuPage from '@/components/SideMenuPage';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';
import style from './style.css';

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => {
  const intl = useIntl();
  const { domainUrl, tab } = useParams<{ domainUrl: string; tab: string }>();
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
      <SideMenuPage
        route={route}
        shadowCard={false}
        menu={
          <Menu
            mode="inline"
            defaultOpenKeys={tab === 'permission' ? ['permission'] : undefined}
          >
            <Menu.Item key="profile" icon={<ProfileOutlined />}>
              {intl.formatMessage({ id: 'SETTINGS.DOMAIN.PROFILE' })}
            </Menu.Item>
            <Menu.Item key="invitation" icon={<SolutionOutlined />}>
              {intl.formatMessage({ id: 'SETTINGS.DOMAIN.INVITATION' })}
            </Menu.Item>
            <Menu.Item key="member" icon={<TeamOutlined />}>
              {intl.formatMessage({ id: 'SETTINGS.DOMAIN.MEMBERS' })}
            </Menu.Item>
            <Menu.SubMenu
              key="permission"
              icon={<LockOutlined />}
              title={intl.formatMessage({ id: 'SETTINGS.DOMAIN.PERMISSION' })}
            >
              <Menu.Item key="config">
                {intl.formatMessage({
                  id: 'settings.domain.permission.config',
                })}
              </Menu.Item>
              <Menu.Item key="role">
                {intl.formatMessage({ id: 'settings.domain.permission.role' })}
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        }
      >
        {children}
      </SideMenuPage>
    </>
  );
};

export default Index;
