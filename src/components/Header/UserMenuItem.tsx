import {
  ApartmentOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Dropdown, Menu, Modal, Space } from 'antd'
import Gravatar from 'components/Gravatar'
import LangSelect from 'components/LangSelect'
import { useAccess, useAuth } from 'models'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

export const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const auth = useAuth()
  const { t } = useTranslation()
  const location = useLocation()
  const access = useAccess()

  const subMenu = (
    <Menu>
      <Menu.Item key='profile' icon={<UserOutlined />}>
        <Link to={`/user/${auth.user?.username ?? ''}`}>
          {t('UserMenuItem.menu.profile')}
        </Link>
      </Menu.Item>
      <Menu.Divider key='divider-1' />
      <Menu.Item
        key='switchLang'
        icon={<TranslationOutlined />}
        onClick={(): void => {
          setModalVisible(true)
        }}
      >
        {t('UserMenuItem.menu.switchLang')}
      </Menu.Item>
      <Menu.Item key='settings' icon={<SettingOutlined />}>
        <Link to='/preference'>{t('UserMenuItem.menu.settings')}</Link>
      </Menu.Item>
      <Menu.Divider key='divider-2' />
      {access.isRoot ? (
        <>
          <Menu.Item key='admin' icon={<ApartmentOutlined />}>
            <Link to='/admin'>{t('UserMenuItem.menu.admin')}</Link>
          </Menu.Item>
          <Menu.Divider key='divider-3' />
        </>
      ) : null}
      <Menu.Item key='logout' icon={<LogoutOutlined />} danger>
        <Link to='/logout'>{t('UserMenuItem.menu.logout')}</Link>
      </Menu.Item>
    </Menu>
  )

  if (auth.user) {
    return (
      <div>
        <Dropdown
          trigger={['click']}
          overlay={subMenu}
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
          visible={modalVisible}
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
    <Link to={`/login?from=${location.pathname}`}>
      {t('UserMenuItem.menu.login')}
    </Link>
  )
}

export default Index
