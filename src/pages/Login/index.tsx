import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
  const query = useQuery();
  const { refresh } = useModel('@@initialState');
  const [opType, setOpType] = useState<OperationType>('login');
  const { t } = useTranslation();

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
          message.success(t('Login.msg.registerSuccess'));
          refresh().then(() => {
            history.replace(query.get('from') ?? '/');
          });
        } else if (res?.data?.errorCode === ErrorCode.UserRegisterError) {
          message.error(t('Login.msg.incompleteInfo'));
        } else if (res?.data?.errorCode === ErrorCode.IntegrityError) {
          message.error(t('Login.msg.usernameEmailUsed'));
        } else {
          message.error(t('Login.msg.registerFailed'));
        }
      },
      onError: () => {
        message.error(t('Login.msg.registerFailed'));
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
          message.success(t('Login.msg.loginSuccess'));
          refresh().then(() => {
            history.replace(query.get('from') ?? '/');
          });
        } else if (res?.data?.errorCode === ErrorCode.UsernamePasswordError) {
          message.error(t('Login.msg.wrongUsernamePassword'));
        } else {
          message.error(t('Login.msg.loginFailed'));
        }
      },
      onError: () => {
        message.error(t('Login.msg.loginFailed'));
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
          message.loading(t('Login.msg.redirecting'), 10);
          window.location.href = res.data.data?.redirectUrl;
        } else {
          message.error(t('Login.msg.oauthFailed'));
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
            {t('Login.signInWith', { name: o.displayName })}
          </Button>
        );
      });

      return (
        <>
          <Divider>{t('Login.thirdPartyAuth')}</Divider>
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
        <h1 className={style.loginTitle}>{t('Login.signInToJOJ')}</h1>
        <h2 className={style.loginSubtitle}>{t('Login.newGeneration')}</h2>
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
            <Tabs.TabPane key={'login'} tab={t('Login.login')} />
            <Tabs.TabPane key={'register'} tab={t('Login.register')} />
          </Tabs>
          {opType === 'login' && (
            <>
              <Form.Item
                name="username"
                label={t('Login.username')}
                rules={[
                  {
                    required: true,
                    message: t('Login.valid.username'),
                  },
                ]}
              >
                <Input placeholder={t('Login.username')} />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('Login.password')}
                rules={[{ required: true, message: t('Login.valid.password') }]}
              >
                <Input.Password placeholder={t('Login.password')} />
              </Form.Item>
              <Row justify="end" style={{ marginBottom: '12px' }}>
                <Col>
                  <a style={{ float: 'right' }} href="">
                    {t('Login.forgotPassword')}
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
                  {t('Login.signIn')}
                </Button>
              </Form.Item>
            </>
          )}
          {opType === 'register' && (
            <>
              <Form.Item
                name="username"
                label={t('Login.username')}
                rules={[
                  {
                    required: true,
                    message: t('Login.valid.username'),
                  },
                ]}
              >
                <Input placeholder={t('Login.username')} />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('Login.password')}
                rules={[{ required: true, message: t('Login.valid.password') }]}
              >
                <Input.Password placeholder={t('Login.password')} />
              </Form.Item>
              <Form.Item
                name="confirm"
                label={t('Login.confirmPassword')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('Login.valid.confirmPassword'),
                  },
                  ({ getFieldValue }) => ({
                    async validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(t('Login.passwordNotMatch')),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t('Login.typePasswordAgain')} />
              </Form.Item>
              <Form.Item
                name="email"
                label={t('Login.email')}
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input placeholder={t('Login.email')} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  {t('Login.registerNow')}
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
