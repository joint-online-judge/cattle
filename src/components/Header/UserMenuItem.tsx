import React, { useState } from 'react';
import { Link, useAccess, useIntl, useLocation, useModel } from 'umi';
import { Col, Dropdown, Menu, Modal, Row } from 'antd';
import {
  ApartmentOutlined,
  LogoutOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
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
      <Menu.Item key="USER.PROFILE" icon={<UserOutlined />}>
        <Link to={`/user/${initialState?.user?.username ?? ''}`}>
          {intl.formatMessage({ id: 'USER.PROFILE' })}
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-2" />
      <Menu.Item
        key="SETTINGS.SWITCH_LANG"
        icon={<TranslationOutlined />}
        onClick={() => {
          setModalVisible(true);
        }}
      >
        {intl.formatMessage({ id: 'SETTINGS.SWITCH_LANG' })}
      </Menu.Item>
      <Menu.Item key="SETTINGS.SETTINGS" icon={<SettingOutlined />}>
        <Link to={'/settings'}>
          {intl.formatMessage({ id: 'SETTINGS.SETTINGS' })}
        </Link>
      </Menu.Item>
      <Menu.Divider key="divider-3" />
      {access.isRoot
        ? <>
          <Menu.Item key="menu.admin" icon={<ApartmentOutlined />}>
            <Link to="/admin">{intl.formatMessage({ id: 'menu.admin' })}</Link>
          </Menu.Item>
          <Menu.Divider key="divider-5" />
        </>
        : null}
      <Menu.Item key="USER.LOG_OUT" icon={<LogoutOutlined />} danger>
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
        <Row align="middle" gutter={8}>
          <Col>
            <Gravatar gravatar={initialState?.user?.gravatar} size={40} />
          </Col>
          {mini ? null :
            <Col>
                <span className="text-base">
                  {initialState?.user.realName || initialState?.user.username}
                </span>
            </Col>
          }
        </Row>
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
