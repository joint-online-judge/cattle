import {
  ApartmentOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Dropdown, Modal, Space } from 'antd'
import Gravatar from 'components/Gravatar'
import LangSelect from 'components/LangSelect'
import { useAccess, useAuth } from 'models'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import type { MenuItemsWithPermission, MenuItemWithPermission } from 'types'

export const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const auth = useAuth()
  const { t } = useTranslation()
  const location = useLocation()
  const access = useAccess()

  const items: MenuItemsWithPermission = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <Link to={`/user/${auth.user?.username ?? ''}`}>
          {t('UserMenuItem.menu.profile')}
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'switchLang',
      icon: <TranslationOutlined />,
      onClick: () => setModalVisible(true),
      label: t('UserMenuItem.menu.switchLang')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link to='/preference'>{t('UserMenuItem.menu.settings')}</Link>
    },
    {
      type: 'divider'
    },
    {
      key: 'admin',
      icon: <ApartmentOutlined />,
      label: <Link to='/admin'>{t('UserMenuItem.menu.admin')}</Link>,
      access: access.isRoot
    },
    {
      type: 'divider',
      access: access.isRoot
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: <Link to='/logout'>{t('UserMenuItem.menu.logout')}</Link>
    }
  ]
  const filteredItems: MenuItemsWithPermission = items.filter(
    (item: MenuItemWithPermission) => item.access !== false
  )

  if (auth.user) {
    return (
      <div>
        <Dropdown
          trigger={['click']}
          menu={{ items: filteredItems }}
          placement='bottomRight'
          arrow
        >
          <Space>
            <Gravatar gravatar={auth.user.gravatar} size={32} />
            <DownOutlined className='text-xs' />
          </Space>
        </Dropdown>
        <Modal
          title={t('UserMenuItem.menu.switchLang')}
          open={modalVisible}
          onOk={(): void => {
            setModalVisible(false)
          }}
          onCancel={(): void => {
            setModalVisible(false)
          }}
        >
          <LangSelect style={{ width: '50%' }} />
        </Modal>
      </div>
    )
  }

  return (
    <div>
      <Button type='primary' ghost href={`/login?from=${location.pathname}`}>
        {t('UserMenuItem.menu.login')}
      </Button>
    </div>
  )
}

export default Index
