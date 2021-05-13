import React from 'react';
import { Card, Col, Descriptions, Row } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import Gravatar from '@/components/Gravatar';
import { User, UserBase } from '@/client';
import { SettingsSideBarProps } from '@/components/Settings/typings';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';

interface SideBarProps extends SettingsSideBarProps {
  user: UserBase | User | undefined;
}

const Index: React.FC<SideBarProps> = (props) => {
  const { user, items, onChange, selectedKeys } = props;
  const intl = useIntl();
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
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.STATUS' })}
            >
              {/* todo: make status component */}
              <CheckOutlined /> Accepted
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.PROBLEM_GROUP' })}
            >
              不知道
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatHTMLMessage({ id: 'PROBLEM.OWNER' })}
            >
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
