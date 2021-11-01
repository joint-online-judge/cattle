import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Form, Input, Divider, Button } from 'antd';
import { Redirect, useLocation, useModel, useRequest, history } from 'umi';
import { Horse } from '@/utils/service';
import { DOMAIN_HOST } from '@/constants';
import style from './style.less';
import Logo from '@/assets/logo.svg';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

type OperationType = 'login' | 'register';

const Index: React.FC = () => {
  const [opType, setOpType] = useState<OperationType>('login');
  const [loading, setLoading] = useState<OperationType>('login');
  const { initialState } = useModel('@@initialState');
  const query = useQuery();

  const { run: login } = useRequest(
    () => {
      if (!initialState?.user) {
        const from = query.get('from') || '/';
        return Horse.user
          .jaccountLoginApiV1UserJaccountLoginGet({
            redirect_url: `${DOMAIN_HOST}${from}`,
            redirect: false,
          })
          .then((res) => {
            window.location.href = res.data.redirect_url;
          });
      } else {
        history.replace('/');
        return Promise.resolve();
      }
    },
    {
      manual: true,
      onError: (res) => {
        console.error(res);
      },
    },
  );

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
            onChange={(activeKey) => setOpType(activeKey as OperationType)}
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
                <Button type="primary" htmlType="submit" block>
                  Log in
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
                    validator(_, value) {
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
                <Button type="primary" htmlType="submit" block>
                  Register now
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <Divider plain>Third Party Auth</Divider>
        <Button
          type="default"
          htmlType="submit"
          block
          icon={
            <img
              src={require('@/assets/jaccount.png')}
              alt="jaccount"
              className={style.oauthImg}
            />
          }
          onClick={login}
        >
          Log in with jAccount
        </Button>
      </Col>
    </Row>
  );
};

export default Index;
