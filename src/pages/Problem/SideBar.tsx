import React from 'react';
import { Card, Col, Descriptions, Menu, Row } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import { User, UserBase } from '@/client';
import { SettingsSideBarProps } from '@/components/Settings/typings';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';

interface SideBarProps extends SettingsSideBarProps {
  user: UserBase | User | undefined;
}

const Index: React.FC<SideBarProps> = (props) => {
  const { user, items, onChange, selectedKeys } = props;
  // todo： try to use components
  return (
    <>
      <Row>
        <Col span={24}>
          <SettingsSideBar
            items={items}
            selectedKeys={selectedKeys}
            onChange={onChange}
          />
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Card>
          <Descriptions column={1}>
            <Descriptions.Item label="Record">
              <CheckOutlined /> Accepted
            </Descriptions.Item>
            <Descriptions.Item label="Problem Group">
              不知道
            </Descriptions.Item>
            <Descriptions.Item label="Upload">
              <Gravatar
                size={20}
                user={user}
              />
              {user?.real_name || ''}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Row>
    </>
  );
};
export default Index;
