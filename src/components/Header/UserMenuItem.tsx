import React, { useState } from 'react';
import { Link, useAccess, useIntl, useLocation, useModel } from 'umi';
import { Dropdown, Menu, Modal, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import LangSelect from '@/components/LangSelect';

interface IProps {
  mini?: boolean;
}

export const Index: React.FC<IProps> = ({ mini = false }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const location = useLocation();
  const access = useAccess();
  const subMenu = (
    <Menu>
      <Menu.Item key="username">
        <Link to={`/user/${initialState?.user?.username ?? ''}`}>
          <b>{initialState?.user?.username ?? ''}</b>
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-1" />
      <Menu.Item key="USER.PROFILE">
        <Link to={`/user/${initialState?.user?.username ?? ''}`}>
          {intl.formatMessage({ id: 'USER.PROFILE' })}
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-2" />
      <Menu.Item key="SETTINGS.SETTINGS">
        <Link to={'/settings'}>
          {intl.formatMessage({ id: 'SETTINGS.SETTINGS' })}
        </Link>
      </Menu.Item>
      <Menu.Item
        key="SETTINGS.SWITCH_LANG"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        {intl.formatMessage({ id: 'SETTINGS.SWITCH_LANG' })}
      </Menu.Item>
      <Menu.Divider key="divider-3" />
      {access.isRoot
        ? <>
          <Menu.Item
            key="menu.admin"
          >
            <Link to="/admin">{intl.formatMessage({ id: 'menu.admin' })}</Link>
          </Menu.Item>
          <Menu.Divider key="divider-5" />
        </>
        : null}
      <Menu.Item key="USER.LOG_OUT">
        <Link to={'/logout'}>{intl.formatMessage({ id: 'USER.LOG_OUT' })}</Link>
      </Menu.Item>
    </Menu>
  );

  return initialState?.user ? (
    <>
      <Dropdown
        trigger={['click']}
        overlay={subMenu}
        placement="bottomRight"
        arrow
      >
        <Space>
          <Gravatar gravatar={initialState.user?.gravatar} />
          {mini ? null : (
            <>
              <span>
                {initialState?.user.realName || initialState?.user.username}
              </span>
              <DownOutlined
                style={{
                  minWidth: '10px',
                  fontSize: '10px',
                }}
              />
            </>
          )}
        </Space>
      </Dropdown>
      <Modal
        title={intl.formatMessage({ id: 'SETTINGS.SWITCH_LANG' })}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <LangSelect style={{ width: '50%' }} />
      </Modal>
    </>
  ) : (
    <Link to={`/login?from=${location.pathname}`}>
      {intl.formatMessage({ id: 'USER.LOGIN.JACCOUNT_LOG_IN' })}
    </Link>
  );
};

export default Index;
