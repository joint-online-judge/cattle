import {
  LockOutlined,
  ProfileOutlined,
  SolutionOutlined,
  TeamOutlined
} from '@ant-design/icons'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import type { MenuItemsWithPermission } from 'types'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { domainUrl } = useParams<{ domainUrl: string }>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  const menuItems: MenuItemsWithPermission = useMemo(
    () => [
      {
        key: 'profile',
        icon: <ProfileOutlined />,
        label: t('DomainSettings.menu.profile')
      },
      {
        key: 'invitation',
        icon: <SolutionOutlined />,
        label: t('DomainSettings.menu.invitation')
      },
      {
        key: 'member',
        icon: <TeamOutlined />,
        label: t('DomainSettings.menu.member')
      },
      {
        key: 'permission',
        icon: <LockOutlined />,
        label: t('DomainSettings.menu.permission'),
        children: [
          {
            key: 'config',
            label: t('DomainSettings.menu.permissionConfig')
          },
          {
            key: 'role',
            label: t('DomainSettings.menu.permissionRole')
          }
        ]
      }
    ],
    [t]
  )

  return (
    <SideMenuPage
      defaultTab='profile'
      menuItems={menuItems}
      defaultOpenKeys={['permission']}
    >
      <Outlet />
    </SideMenuPage>
  )
}

export default Index
