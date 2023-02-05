import { ReadOutlined } from '@ant-design/icons'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import type { MenuItemsWithPermission } from 'types'

const Index: React.FC = () => {
  const { t } = useTranslation()

  const menuItems: MenuItemsWithPermission = useMemo(
    () => [
      {
        key: 'domain',
        icon: <ReadOutlined />,
        label: t('SiteAdmin.menu.domain')
      }
    ],
    [t]
  )

  return (
    <SideMenuPage defaultTab='domain' menuItems={menuItems}>
      <Outlet />
    </SideMenuPage>
  )
}

export default Index
