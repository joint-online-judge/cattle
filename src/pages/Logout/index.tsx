import { useRequest } from 'ahooks'
import { message, Result, Spin } from 'antd'
import { useAuth } from 'models'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import Horse from 'utils/service'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { refreshAsync, user, accessToken } = useAuth()

	useRequest(
		async () => {
			if (accessToken) {
				return Horse.auth.v1Logout({
					responseType: 'json'
				})
			}

			return {}
		},
		{
			onSuccess: () => {
				message.success(t('Logout.msg.logoutSuccess'))
				refreshAsync?.().then(() => {
					navigate('/login', { replace: true })
				})
			},
			onError: () => {
				message.error(t('Logout.msg.logoutFailed'))
			}
		}
	)

	return user ? (
		<Result icon={<Spin size='large' />} title={t('Logout.msg.loggingOut')} />
	) : (
		<Navigate to='/login' replace />
	)
}

export default Index
