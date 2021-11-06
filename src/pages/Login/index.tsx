import React, { useState } from 'react';
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
import { isNil, isArray } from 'lodash';
import style from './style.less';
import { Horse, UserCreate } from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';
import Logo from '@/assets/logo.svg';
import { useCallback } from 'react';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

type OperationType = 'login' | 'register';

const Index: React.FC = () => {
  const [opType, setOpType] = useState<OperationType>('login');
  const { initialState } = useModel('@@initialState');
  const query = useQuery();

  const { data: oauths, loading: discovering } = useRequest(
    async () => {
      const res = await Horse.auth.listOauth2ApiV1AuthOauth2Get();
      return res.data?.data?.results ?? [];
    },
    {
      onError: (res) => {
        console.error(res);
      },
    },
  );

  const { loading: registering } = useRequest(
    async (registerInfo: UserCreate) => {
      return Horse.auth
        .registerApiV1AuthRegisterPost({ responseType: 'json' }, registerInfo)
        .then((res) => {
          console.log(res);
          // window.location.href = res.data.redirect_url;
        });
    },
    {
      manual: true,
      onError: (res) => {
        console.error(res);
      },
    },
  );

  const { loading: simpleLogining } = useRequest(
    async () => {
      if (!initialState?.user) {
        // const from = query.get('from') ?? '/';
        return Horse.auth
          .loginApiV1AuthLoginPost(
            { responseType: 'json' },
            {
              username: '',
              password: '',
            },
          )
          .then((res) => {
            console.log(res);
            // window.location.href = res.data.redirect_url;
          });
      }

      return Promise.resolve();
    },
    {
      manual: true,
      onError: (res) => {
        console.error(res);
      },
    },
  );

  const { run: oauthLogin, loading: oauthLogining } = useRequest(
    async (oauthName) => {
      const from = query.get('from') ?? '/';
      return Horse.auth.oauthAuthorizeApiV1AuthOauth2Oauth2AuthorizeGet(
        oauthName,
        {
          responseType: 'redirect',
          redirectUrl: `${DOMAIN_HOST}${from}`,
        },
      );
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.data?.redirectUrl) {
          message.loading('Redirecting...', 10);
          window.location.href = res.data.data?.redirectUrl;
        } else {
          message.error('Failed to intialize oauth');
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
      return oauths.map((o) => {
        return (
          <Button
            key={o.oauthName}
            className="mb-4"
            type="default"
            block
            // icon={
            //   <img
            //     src={require('@/assets/jaccount.png')}
            //     alt="jaccount"
            //     className={style.oauthImg}
            //   />
            // }
            loading={loading}
            onClick={async () => oauthLogin(o.oauthName)}
          >
            Sign in with {o.displayName}
          </Button>
        );
      });
    }

    return <h1>No OAuth Support</h1>;
  }, [discovering, oauths, loading]);

  return (
    <Row justify="center" style={{ height: '100vh' }}>
      <Col xxl={5} xl={6} lg={8} md={12} sm={18} xs={20}>
        <div className={style.loginLogoWrap}>
          <img src={Logo} alt="logo" className={style.loginLogo} />
        </div>
        <h1 className={style.loginTitle}>Sign in to JOJ</h1>
        <h2 className={style.loginSubtitle}>New generation of Online Judge</h2>
        <Form layout="vertical">
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
                <Input placeholder={'用户名: admin or user'} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input.Password placeholder={'密码: ant.design'} />
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
                <Input.Password placeholder={'密码: ant.design'} />
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
        <Divider plain>Third Party Auth</Divider>
        <Spin spinning={discovering}>{renderOAuthButtons()}</Spin>
      </Col>
    </Row>
  );
};

export default Index;
