import {
	LockOutlined,
	ProfileOutlined,
	SolutionOutlined,
	TeamOutlined
} from '@ant-design/icons'
import { Divider, Menu, PageHeader } from 'antd'
import MarkdownRender from 'components/MarkdownRender'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { gravatarImageUrl } from 'utils/gravatar'
import style from './style.module.css'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'settings'
			}
		],
		[domainUrl, domain]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			titleI18nKey: 'SETTINGS.DOMAIN'
		})
	}, [breads, setHeader])

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
				shadowCard={false}
				defaultTab='profile'
				menu={
					<Menu mode='inline' defaultOpenKeys={['permission']}>
						<Menu.Item key='profile' icon={<ProfileOutlined />}>
							{t('DomainSettings.menu.profile')}
						</Menu.Item>
						<Menu.Item key='invitation' icon={<SolutionOutlined />}>
							{t('DomainSettings.menu.invitation')}
						</Menu.Item>
						<Menu.Item key='member' icon={<TeamOutlined />}>
							{t('DomainSettings.menu.member')}
						</Menu.Item>
						<Menu.SubMenu
							key='permission'
							icon={<LockOutlined />}
							title={t('DomainSettings.menu.permission')}
						>
							<Menu.Item key='config'>
								{t('DomainSettings.menu.permission.config')}
							</Menu.Item>
							<Menu.Item key='role'>
								{t('DomainSettings.menu.permission.role')}
							</Menu.Item>
						</Menu.SubMenu>
					</Menu>
				}
			>
				<Outlet />
			</SideMenuPage>
		</>
	)
}

export default Index
