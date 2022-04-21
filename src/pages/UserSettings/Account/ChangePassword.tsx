import { useRequest } from 'ahooks'
import { Button, Card, Col, Form, Input, message, Spin } from 'antd'
import type { RuleObject } from 'antd/lib/form'
import { pick } from 'lodash-es'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import type { UserResetPassword } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { run, loading } = useRequest(
		async (passwordInfo: UserResetPassword) =>
			Horse.user.v1ChangePassword(passwordInfo),
		{
			manual: true,
			onSuccess: res => {
				if (res.data.errorCode === ErrorCode.Success) {
					message.success('change password success')
				} else if (res.data.errorCode === ErrorCode.UsernamePasswordError) {
					message.error('current password does not match')
				} else {
					message.error(res.data.errorMsg)
				}
			},
			onError: () => {
				message.error('change password failed')
			}
		}
	)
	return (
		<Card title={<span className='text-2xl font-semibold'>New Password</span>}>
			<Col span={12}>
				<Spin spinning={loading}>
					<Form
						layout='vertical'
						onFinish={(value): void => {
							run(pick(value, ['newPassword', 'currentPassword']))
						}}
					>
						<Form.Item
							name='currentPassword'
							label={t('UserSettings.ChangePassword.form.currentPassword')}
							rules={[
								{
									required: true,
									message: 'Please input the current password'
								}
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='newPassword'
							label={t('UserSettings.ChangePassword.form.newPassword')}
							rules={[
								{ required: true, message: 'Please input the new password' }
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='confirmPassword'
							label={t('UserSettings.ChangePassword.form.confirmPassword')}
							rules={[
								{ required: true, message: 'Please confirm the new password' },
								({ getFieldValue }): RuleObject => ({
									async validator(_, value): Promise<unknown> {
										if (!value || getFieldValue('newPassword') === value) {
											return
										}

										throw new Error('passwords do not match')
									}
								})
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit' loading={loading}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Col>
		</Card>
	)
}

export default Index
