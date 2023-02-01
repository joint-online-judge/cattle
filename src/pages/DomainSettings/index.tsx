import {
  LockOutlined,
  ProfileOutlined,
  SolutionOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { domainUrl } = useParams<{ domainUrl: string }>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  return (
    <SideMenuPage
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
              {t('DomainSettings.menu.permissionConfig')}
            </Menu.Item>
            <Menu.Item key='role'>
              {t('DomainSettings.menu.permissionRole')}
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      }
    >
      <Outlet />
    </SideMenuPage>
  )
}

export default Index
