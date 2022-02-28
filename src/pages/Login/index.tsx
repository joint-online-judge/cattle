import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Tabs,
  Form,
  Input,
  Divider,
  Button,
  Spin,
  message,
} from 'antd';
import { useLocation, useModel, history } from 'umi';
import { useRequest } from 'ahooks';
import { isArray, pick } from 'lodash';
import Horse, {
  UserCreate,
  OAuth2PasswordRequestForm,
  ErrorCode,
} from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';
import Logo from '@/assets/logo.svg';
import style from './style.less';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

type OperationType = 'login' | 'register';

const Index: React.FC = () => {
  const [opType, setOpType] = useState<OperationType>('login');
  const query = useQuery();
  const { refresh } = useModel('@@initialState');

  const { data: oauths, loading: discovering } = useRequest(async () => {
    const res = await Horse.auth.v1ListOauth2();
    return res.data?.data?.results ?? [];
  });

  const { run: register, loading: registering } = useRequest(
    async (registerInfo: UserCreate) =>
      Horse.auth.v1Register({ responseType: 'json' }, registerInfo),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.errorCode === ErrorCode.Success) {
          message.success('register success');
          refresh().then(() => {
            history.replace(query.get('from') ?? '/');
          });
        } else if (res?.data?.errorCode === ErrorCode.UserRegisterError) {
          message.error('incomplete info');
        } else if (res?.data?.errorCode === ErrorCode.IntegrityError) {
          message.error('username/email already used');
        } else {
          message.error('register failed');
        }
      },
      onError: () => {
        message.error('register failed');
      },
    },
  );

  const { run: simpleLogin, loading: simpleLogining } = useRequest(
    async (values: OAuth2PasswordRequestForm) => {
      // https://github.com/axios/axios/blob/master/dist/axios.js#L1283
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(values)) {
        params.append(key, value);
      }
      // @Chujie: pass URLSearchParams to axios; otherwise data will be stringified directly.
      return Horse.auth.v1Login({ responseType: 'json' }, params as any);
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.errorCode === ErrorCode.Success) {
          message.success('login success');
          refresh().then(() => {
            history.replace(query.get('from') ?? '/');
          });
        } else if (res?.data?.errorCode === ErrorCode.UsernamePasswordError) {
          message.error('wrong username or password');
        } else {
          message.error('login failed');
        }
      },
      onError: () => {
        message.error('login failed');
      },
    },
  );

  const { run: oauthLogin, loading: oauthLogining } = useRequest(
    async (oauthName) => {
      const from = query.get('from') ?? '/';
      return Horse.auth.v1OauthAuthorize(oauthName, {
        responseType: 'redirect',
        redirectUrl: `${DOMAIN_HOST}${from}`,
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.data?.redirectUrl) {
          message.loading('Redirecting...', 10);
          window.location.href = res.data.data?.redirectUrl;
        } else {
          message.error('failed to intialize oauth');
        }
      },
      onError: (err) => {
        console.error(err);
      },
    },
  );

  const loading = registering || simpleLogining || oauthLogining;

  const renderOAuthButtons = useCallback(() => {
    if (discovering) {
      return null;
    }

    if (isArray(oauths) && oauths.length > 0) {
      const buttons = oauths.map((o) => {
        return (
          <Button
            key={o.oauthName}
            className="mb-4"
            type="default"
            block
            icon={<img src={o.icon} className={style.oauthImg} />}
            loading={oauthLogining}
            onClick={async () => oauthLogin(o.oauthName)}
          >
            Sign in with {o.displayName}
          </Button>
        );
      });

      return (
        <>
          <Divider>Third Party Auth</Divider>
          {buttons}
        </>
      );
    }

    return null;
  }, [discovering, oauths, loading]);

  return (
    <Row justify="center" style={{ height: '100vh' }}>
      <Col xxl={5} xl={6} lg={8} md={12} sm={18} xs={20}>
        <div className={style.loginLogoWrap}>
          <img src={Logo} alt="logo" className={style.loginLogo} />
        </div>
        <h1 className={style.loginTitle}>Sign in to JOJ</h1>
        <h2 className={style.loginSubtitle}>New generation of Online Judge</h2>
        <Form
          layout="vertical"
          onFinish={(values) => {
            if (opType === 'login') {
              simpleLogin(pick(values, ['username', 'password']));
            } else if (opType === 'register') {
              register(pick(values, ['username', 'password', 'email']));
            }
          }}
        >
          <Tabs
            centered
            activeKey={opType}
            onChange={(activeKey) => {
              setOpType(activeKey as OperationType);
            }}
          >
            <Tabs.TabPane key={'login'} tab={'登录'} />
            <Tabs.TabPane key={'register'} tab={'注册'} />
          </Tabs>
          {opType === 'login' && (
            <>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input placeholder={'用户名'} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input.Password placeholder={'密码'} />
              </Form.Item>
              <Row justify="end" style={{ marginBottom: '12px' }}>
                <Col>
                  <a style={{ float: 'right' }} href="">
                    Forgot password
                  </a>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Sign in
                </Button>
              </Form.Item>
            </>
          )}
          {opType === 'register' && (
            <>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input placeholder={'用户名: admin or user'} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input.Password placeholder={'密码'} />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
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
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Register now
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <Spin spinning={discovering}>{renderOAuthButtons()}</Spin>
      </Col>
    </Row>
  );
};

export default Index;
