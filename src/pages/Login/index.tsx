import React, { useState } from 'react';
import { Row, Col, Tabs, Form, Input, Divider, Button, Spin } from 'antd';
import { useLocation, useModel, history } from 'umi';
import { useRequest } from 'ahooks';
import style from './style.less';
import { Horse, UserCreate } from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';
import Logo from '@/assets/logo.svg';

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
        .registerApiV1AuthRegisterPost({ response_type: 'json' }, registerInfo)
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
            { response_type: 'json' },
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

      history.replace('/');
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
      console.log(initialState?.user);
      if (!initialState?.user) {
        const from = query.get('from') ?? '/';
        return Horse.auth
          .oauthAuthorizeApiV1AuthOauth2OauthNameAuthorizeGet(oauthName, {
            response_type: 'redirect',
            redirect_url: `${DOMAIN_HOST}${from}`,
          })
          .then((res) => {
            if (res.data.data?.redirect_url) {
              window.location.href = res.data.data.redirect_url;
            }
          });
      }

      history.replace('/');
      return Promise.resolve();
    },
    {
      manual: true,
      onError: (res) => {
        console.error(res);
      },
    },
  );

  const loading = registering || simpleLogining || oauthLogining;

  // return  <Result icon={<Spin size="large" />} title={'Redirecting...'} />;

  // return initialState?.user ? (
  //   <Redirect to={query.get('from') || '/'} />
  // ) : (
  //   <Result icon={<Spin size="large" />} title={'Redirecting...'} />
  // );
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
        <Spin spinning={discovering}>
          {oauths ? (
            oauths.map((o) => {
              return (
                <Button
                  key={o.oauth_name}
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
                  onClick={async () => oauthLogin(o.oauth_name)}
                >
                  Sign in with {o.display_name}
                </Button>
              );
            })
          ) : (
            <h1>No OAuth Support</h1>
          )}
        </Spin>
      </Col>
    </Row>
  );
};

export default Index;
