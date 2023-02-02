import { HeartFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, message, Row, Spin } from 'antd'
import type { RuleObject } from 'antd/lib/form'
import Logo from 'assets/logo.svg'
import jwtDecode from 'jwt-decode'
import { isNil, omitBy } from 'lodash-es'
import { useAuth } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import type { JWTAccessToken, UserCreate } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'
import style from './style.module.css'

const Index: React.FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { refreshAsync, user } = useAuth()

  const { data: oauths, loading: discovering } = useRequest(async () => {
    const res = await Horse.auth.v1ListOauth2()
    return res.data.data?.results ?? []
  })

  const { data: decodedToken, loading: fetchingToken } = useRequest(
    async (): Promise<JWTAccessToken | undefined> => {
      const res = await Horse.auth.v1GetToken({ responseType: 'json' })
      const accessToken = res.data.data?.accessToken
      return accessToken ? jwtDecode<JWTAccessToken>(accessToken) : undefined
    }
  )

  const { run: register, loading: registering } = useRequest(
    async (registerInfo: UserCreate) =>
      Horse.auth.v1Register({ responseType: 'json' }, registerInfo),
    {
      manual: true,
      onSuccess: res => {
        if (res.data.errorCode === ErrorCode.Success) {
          message.success('Registered!')
          refreshAsync?.().then(() => {
            navigate(searchParams.get('from') ?? '/', { replace: true })
          })
        } else {
          message.error('BizError: oauth failed')
        }
      },
      onError: () => {
        message.error('InternalError: oauth failed')
      }
    }
  )

  const onFinish = (e: UserCreate): void => {
    const { sub, oauthName } = decodedToken ?? {}
    if (sub && oauthName) {
      register({
        ...omitBy(e, isNil),
        oauth_account_id: sub,
        oauth_name: oauthName
      })
    } else {
      message.error('OAuth info missing')
    }
  }

  useEffect(() => {
    form.setFieldsValue(
      omitBy(
        {
          username: user?.username,
          email: user?.email
        },
        isNil
      )
    )
  }, [user, form])

  if (isNil(decodedToken?.oauthName)) {
    return <Navigate to='/login' replace />
  }

  return (
    <Row justify='center' style={{ height: '100vh' }}>
      <Col xxl={5} xl={6} lg={8} md={12} sm={18} xs={20}>
        <div className='mb-6'>
          <div className={style.loginLogoWrap}>
            <img src={Logo} alt='logo' className={style.loginLogo} />
            <HeartFilled style={{ color: '#eb2f96', fontSize: 28 }} />
            <Spin wrapperClassName='m-auto' spinning={discovering}>
              <img
                src={
                  oauths?.find(o => o.oauthName === decodedToken?.oauthName)
                    ?.icon
                }
                alt={decodedToken?.oauthName}
                className={style.loginLogo}
              />
            </Spin>
          </div>
          <h1 className={style.loginTitle}>OAuth Registration</h1>
          <h2 className={style.loginSubtitle}>
            Fill in the following form to complete your registration at JOJ
          </h2>
        </div>

        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item name='username' label='Username'>
            <Input placeholder={t('form.placeholder.input')} />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true },
              {
                type: 'email',
                message: 'This is not a valid email!'
              }
            ]}
          >
            <Input
              placeholder={t('form.placeholder.input')}
              disabled={Boolean(user?.email)}
            />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input.Password placeholder={t('form.placeholder.input')} />
          </Form.Item>
          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              ({ getFieldValue }): RuleObject => ({
                async validator(_, value): Promise<unknown> {
                  if (!value || getFieldValue('password') === value) {
                    return
                  }

                  throw new Error(
                    'The two passwords that you entered do not match!'
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder={t('form.placeholder.input')} />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={registering || fetchingToken}
              block
            >
              Register now
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Index
