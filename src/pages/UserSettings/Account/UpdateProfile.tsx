import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl, useModel } from 'umi';
import AvatarUpload from './AvatarUpload';
import { VERTICAL_GUTTER } from '@/constants';

const Index: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  return (
    <>
      <h3 className="text-2xl font-semibold">
        {intl.formatMessage(
          { id: 'settings.account.profile.header' })}
      </h3>

      <Row gutter={VERTICAL_GUTTER}>
        <Col span={12}>
          <Form
            layout="vertical"
            initialValues={initialState?.user}
          >
            <Form.Item
              name="username"
              label={intl.formatMessage(
                { id: 'settings.account.profile.username' })}
              rules={[
                { required: true, message: 'Please input the username' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label={intl.formatMessage(
                { id: 'settings.account.profile.email' })}
              rules={[
                { required: true, message: 'Please input the email' },
                { type: 'email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage(
                  { id: 'settings.account.profile.updateProfile' })}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        
        <Col span={12}>
          <AvatarUpload />
        </Col>
      </Row>
    </>
  );
};

export default Index;
