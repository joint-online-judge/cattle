import { CodeOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const Index: React.FC = () => {
  const { t } = useTranslation()

  return (
    <SideMenuPage
      defaultTab='general'
      menu={
        <Menu mode='inline'>
          <Menu.Item key='general' icon={<ReadOutlined />}>
            {t('UserSettings.menu.general')}
          </Menu.Item>
          <Menu.Item key='account' icon={<CodeOutlined />}>
            {t('UserSettings.menu.account')}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='domains' icon={<EditOutlined />}>
            {t('UserSettings.menu.domains')}
          </Menu.Item>
        </Menu>
      }
    >
      <Outlet />
    </SideMenuPage>
  )
}

export default Index
