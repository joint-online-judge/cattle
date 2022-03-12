import React from 'react';
import { Button, Card, Col, Form, Input, message, Spin } from 'antd';
import { pick } from 'lodash';
import { useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { ErrorCode, UserResetPassword } from '@/client';
import Horse from '@/utils/service';

const Index: React.FC = () => {
  const intl = useIntl();
  const { run, loading } = useRequest(
    async (passwordInfo: UserResetPassword) =>
      Horse.user.v1ChangePassword(passwordInfo),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.errorCode === ErrorCode.Success) {
          message.success('change password success');
        } else if (res?.data?.errorCode === ErrorCode.UsernamePasswordError) {
          message.error('current password does not match');
        } else {
          message.error(res?.data?.errorMsg);
        }
      },
      onError: () => {
        message.error('change password failed');
      },
    },
  );
  return (
    <Card title={<span className="text-2xl font-semibold">New Password</span>}>
      <Col span={12}>
        <Spin spinning={loading}>
          <Form
            layout="vertical"
            onFinish={async (value) => {
              await run(pick(value, ['newPassword', 'currentPassword']));
            }}
          >
            <Form.Item
              name="currentPassword"
              label={intl.formatMessage({
                id: 'SETTINGS.ACCOUNT.PASSWORD.CURRENT',
              })}
              rules={[
                {
                  required: true,
                  message: 'Please input the current password',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label={intl.formatMessage({
                id: 'SETTINGS.ACCOUNT.PASSWORD.NEW',
              })}
              rules={[
                { required: true, message: 'Please input the new password' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={intl.formatMessage({
                id: 'SETTINGS.ACCOUNT.PASSWORD.CONFIRM',
              })}
              rules={[
                { required: true, message: 'Please confirm the new password' },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Card>
  );
};

export default Index;
