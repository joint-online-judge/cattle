import { ReadOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const Index: React.FC = () => {
	const { t } = useTranslation()

	return (
		<SideMenuPage
			defaultTab='domain'
			menu={
				<Menu mode='inline'>
					<Menu.Item key='domain' icon={<ReadOutlined />}>
						{t('SiteAdmin.menu.domain')}
					</Menu.Item>
				</Menu>
			}
		>
			<Outlet />
		</SideMenuPage>
	)
}

export default Index
