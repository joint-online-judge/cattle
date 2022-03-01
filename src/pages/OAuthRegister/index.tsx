import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useLocation, useModel, history, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { omitBy, isNil } from 'lodash';
import style from './style.less';
import { Horse, UserCreate, ErrorCode } from '@/utils/service';
import Logo from '@/assets/logo.svg';

const useQuery = () => new URLSearchParams(useLocation().search);

const oauthLogoMap: Record<string, string> = {
  jaccount: 'http://pic.gerenjianli.com/xiaohui2046/b59.jpg',
  github:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png',
};

const Index: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [form] = Form.useForm();
  const query = useQuery();
  const intl = useIntl();

  const { run: register, loading: registering } = useRequest(
    async (registerInfo: UserCreate) =>
      Horse.auth.v1Register({ responseType: 'json' }, registerInfo),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.errorCode === ErrorCode.Success) {
          message.success('Registered!');
          refresh().then(() => {
            history.replace(query.get('from') ?? '/');
          });
        } else {
          message.error('BizError: oauth failed');
        }
      },
      onError: () => {
        message.error('InternalError: oauth failed');
      },
    },
  );

  const onFinish = (e: UserCreate) => {
    const { sub, oauthName } = initialState?.user ?? {};
    if (sub && oauthName) {
      register({
        ...omitBy(e, isNil),
        oauth_account_id: sub,
        oauth_name: oauthName,
      });
    } else {
      message.error('OAuth info missing');
    }
  };

  useEffect(() => {
    form.setFieldsValue(
      omitBy(
        {
          username: initialState?.user?.username,
          email: initialState?.user?.email,
        },
        isNil,
      ),
    );
  }, [initialState]);

  return (
    <Row justify="center" style={{ height: '100vh' }}>
      <Col xxl={5} xl={6} lg={8} md={12} sm={18} xs={20}>
        <div className="mb-6">
          <div className={style.loginLogoWrap}>
            <img src={Logo} alt="logo" className={style.loginLogo} />
            <HeartFilled style={{ color: '#eb2f96', fontSize: 28 }} />
            <img
              src={oauthLogoMap[initialState?.user?.oauthName ?? '']}
              alt="oauth-logo"
              className={style.loginLogo}
            />
          </div>
          <h1 className={style.loginTitle}>OAuth Registration</h1>
          <h2 className={style.loginSubtitle}>
            Fill in the following form to complete your registration at JOJ
          </h2>
        </div>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="username" label="Username">
            <Input
              placeholder={intl.formatMessage({ id: 'form.input_placeholder' })}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true },
              {
                type: 'email',
                message: 'This is not a valid email!',
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({ id: 'form.input_placeholder' })}
              disabled={Boolean(initialState?.user?.email)}
            />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password
              placeholder={intl.formatMessage({ id: 'form.input_placeholder' })}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={intl.formatMessage({ id: 'form.input_placeholder' })}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={registering}
              block
            >
              Register now
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Index;
