import { CodeOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
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
        key: 'general',
        icon: <ReadOutlined />,
        label: t('UserSettings.menu.general')
      },
      {
        key: 'account',
        icon: <CodeOutlined />,
        label: t('UserSettings.menu.account')
      },
      {
        key: 'domains',
        icon: <EditOutlined />,
        label: t('UserSettings.menu.domains')
      }
    ],
    [t]
  )

  return (
    <SideMenuPage defaultTab='general' menuItems={menuItems}>
      <Outlet />
    </SideMenuPage>
  )
}

export default Index
