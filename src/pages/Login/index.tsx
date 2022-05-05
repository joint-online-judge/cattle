import { useRequest } from 'ahooks'
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	message,
	Row,
	Spin,
	Tabs
} from 'antd'
import type { RuleObject } from 'antd/lib/form'
import Logo from 'assets/logo.svg'
import { isArray, pick } from 'lodash-es'
import { useAuth } from 'models'
import type React from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DOMAIN_HOST } from 'utils/constants'
import type { OAuth2PasswordRequestForm, UserCreate } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'
import style from './style.module.less'

// eslint-disable-next-line @typescript-eslint/no-type-alias
type OperationType = 'login' | 'register'

const Index: React.FC = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { refreshAsync } = useAuth()
	const [opType, setOpType] = useState<OperationType>('login')
	const { t } = useTranslation()

	const { data: oauths, loading: discovering } = useRequest(async () => {
		const res = await Horse.auth.v1ListOauth2()
		return res.data.data?.results ?? []
	})

	const { run: register, loading: registering } = useRequest(
		async (registerInfo: UserCreate) =>
			Horse.auth.v1Register({ responseType: 'json' }, registerInfo),
		{
			manual: true,
			onSuccess: res => {
				switch (res.data.errorCode) {
					case ErrorCode.Success: {
						message.success(t('Login.msg.registerSuccess'))
						refreshAsync?.().then(() => {
							navigate(searchParams.get('from') ?? '/', { replace: true })
						})

						break
					}

					case ErrorCode.UserRegisterError: {
						message.error(t('Login.msg.incompleteInfo'))

						break
					}

					case ErrorCode.IntegrityError: {
						message.error(t('Login.msg.usernameEmailUsed'))

						break
					}

					default: {
						message.error(t('Login.msg.registerFailed'))
					}
				}
			},
			onError: () => {
				message.error(t('Login.msg.registerFailed'))
			}
		}
	)

	const { run: simpleLogin, loading: simpleLogining } = useRequest(
		async (values: OAuth2PasswordRequestForm) => {
			// Here we expect content-type to be 'application/x-www-form-urlencoded'
			// https://github.com/axios/axios#browser
			const parameters = new URLSearchParams()
			const entries = Object.entries(values) as [string, string][]
			for (const [key, value] of entries) {
				parameters.append(key, value)
			}

			// @Chujie: pass URLSearchParams to axios; otherwise data will be stringified directly.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
			return Horse.auth.v1Login({ responseType: 'json' }, parameters as any)
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.data.errorCode === ErrorCode.Success) {
					message.success(t('Login.msg.loginSuccess'))
					refreshAsync?.().then(() => {
						navigate(searchParams.get('from') ?? '/', { replace: true })
					})
				} else if (res.data.errorCode === ErrorCode.UsernamePasswordError) {
					message.error(t('Login.msg.wrongUsernamePassword'))
				} else {
					message.error(t('Login.msg.loginFailed'))
				}
			},
			onError: () => {
				message.error(t('Login.msg.loginFailed'))
			}
		}
	)

	const { run: oauthLogin, loading: oauthLogining } = useRequest(
		async (oauthName: string) => {
			const from = searchParams.get('from') ?? '/'
			return Horse.auth.v1OauthAuthorize(oauthName, {
				responseType: 'redirect',
				redirectUrl: `${DOMAIN_HOST}${from}`
			})
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.data.data?.redirectUrl) {
					message.loading(t('Login.msg.redirecting'), 10)
					window.location.href = res.data.data.redirectUrl
				} else {
					message.error(t('Login.msg.oauthFailed'))
				}
			},
			onError: () => {
				message.error(t('Login.msg.oauthFailed'))
			}
		}
	)

	const loading = registering || simpleLogining || oauthLogining

	const oauthButtons = useMemo(() => {
		if (discovering) {
			return null
		}

		if (isArray(oauths) && oauths.length > 0) {
			const buttons = oauths.map(o => (
				<Button
					key={o.oauthName}
					className='mb-4'
					type='default'
					block
					icon={
						<img src={o.icon} className={style.oauthImg} alt={o.displayName} />
					}
					loading={oauthLogining}
					onClick={(): void => oauthLogin(o.oauthName)}
				>
					{t('Login.signInWith', { name: o.displayName })}
				</Button>
			))

			return (
				<>
					<Divider>{t('Login.thirdPartyAuth')}</Divider>
					{buttons}
				</>
			)
		}

		return null
	}, [discovering, oauths, oauthLogining, oauthLogin, t])

	return (
		<Row justify='center' style={{ height: '100vh' }}>
			<Col xxl={5} xl={6} lg={8} md={12} sm={18} xs={20}>
				<div className={style.loginLogoWrap}>
					<img src={Logo} alt='logo' className={style.loginLogo} />
				</div>
				<h1 className={style.loginTitle}>{t('Login.signInToJOJ')}</h1>
				<h2 className={style.loginSubtitle}>{t('Login.newGeneration')}</h2>
				<Form
					layout='vertical'
					onFinish={(values): void => {
						if (opType === 'login') {
							simpleLogin(pick(values, ['username', 'password']))
						}
						if (opType === 'register') {
							register(pick(values, ['username', 'password', 'email']))
						}
					}}
				>
					<Tabs
						centered
						activeKey={opType}
						onChange={(activeKey): void => {
							setOpType(activeKey as OperationType)
						}}
					>
						<Tabs.TabPane key='login' tab={t('Login.login')} />
						<Tabs.TabPane key='register' tab={t('Login.register')} />
					</Tabs>
					{opType === 'login' && (
						<>
							<Form.Item
								name='username'
								label={t('Login.username')}
								rules={[
									{
										required: true,
										message: t('Login.valid.username')
									}
								]}
							>
								<Input
									placeholder={t('Login.username')}
									data-test='login-username'
								/>
							</Form.Item>
							<Form.Item
								name='password'
								label={t('Login.password')}
								rules={[{ required: true, message: t('Login.valid.password') }]}
							>
								<Input.Password
									placeholder={t('Login.password')}
									data-test='login-password'
								/>
							</Form.Item>
							<Row justify='end' style={{ marginBottom: '12px' }}>
								<Col>
									<Button style={{ float: 'right' }} type='link'>
										{t('Login.forgotPassword')}
									</Button>
								</Col>
							</Row>
							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									loading={loading}
									data-test='login-submit'
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
								name='username'
								label={t('Login.username')}
								rules={[
									{
										required: true,
										message: t('Login.valid.username')
									}
								]}
							>
								<Input placeholder={t('Login.username')} />
							</Form.Item>
							<Form.Item
								name='password'
								label={t('Login.password')}
								rules={[{ required: true, message: t('Login.valid.password') }]}
							>
								<Input.Password placeholder={t('Login.password')} />
							</Form.Item>
							<Form.Item
								name='confirm'
								label={t('Login.confirmPassword')}
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: t('Login.valid.confirmPassword')
									},
									({ getFieldValue }): RuleObject => ({
										async validator(_, value): Promise<unknown> {
											if (!value || getFieldValue('password') === value) {
												return
											}

											throw new Error(t('Login.passwordNotMatch'))
										}
									})
								]}
							>
								<Input.Password placeholder={t('Login.typePasswordAgain')} />
							</Form.Item>
							<Form.Item
								name='email'
								label={t('Login.email')}
								rules={[{ required: true }, { type: 'email' }]}
							>
								<Input placeholder={t('Login.email')} />
							</Form.Item>
							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									loading={loading}
									block
								>
									{t('Login.registerNow')}
								</Button>
							</Form.Item>
						</>
					)}
				</Form>
				<Spin spinning={discovering}>{oauthButtons}</Spin>
			</Col>
		</Row>
	)
}

export default Index
