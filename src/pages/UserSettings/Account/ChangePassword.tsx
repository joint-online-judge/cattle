import { Button, Form, Input, message, Spin, Typography } from 'antd';
import { pick } from 'lodash';
import React from 'react';
import { useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { ErrorCode, UserResetPassword } from '@/client';
import Horse from '@/utils/service';

export default function() {
  const intl = useIntl();
  const { run, loading } = useRequest(
    async (passwordInfo: UserResetPassword) => {
      return Horse.user.v1ChangePassword(passwordInfo);
    }, {
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
    });
  return (
    <>
      <Typography.Title level={3}>
        {intl.formatMessage(
          { id: 'SETTINGS.ACCOUNT.PASSWORD.HEADER' })}
      </Typography.Title>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          onFinish={async (value) => {
            await run(pick(value, ['newPassword', 'currentPassword']));
          }}
        >
          <Form.Item
            name="currentPassword"
            label={intl.formatMessage(
              { id: 'SETTINGS.ACCOUNT.PASSWORD.CURRENT' })}
            rules={[
              { required: true, message: 'Please input the current password' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label={intl.formatMessage({ id: 'SETTINGS.ACCOUNT.PASSWORD.NEW' })}
            rules={[
              { required: true, message: 'Please input the new password' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={intl.formatMessage(
              { id: 'SETTINGS.ACCOUNT.PASSWORD.CONFIRM' })}
            rules={[
              { required: true, message: 'Please confirm the new password' },
              ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'passwords do not match',
                      ),
                    );
                  },
                }
              ),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {intl.formatMessage(
                { id: 'SETTINGS.ACCOUNT.PASSWORD.UPDATE_PASSWORD' })}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
