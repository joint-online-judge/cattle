import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

import { useModel } from '@@/plugin-model/useModel';

const Index: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  return (
    <>
      <Typography.Title level={3}>
        {intl.formatMessage(
          { id: 'settings.account.profile.header' })}
      </Typography.Title>

      <Row>
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
      </Row>
    </>
  );
};

export default Index;
