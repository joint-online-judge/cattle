import { TeamOutlined } from '@ant-design/icons'
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-form'
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import type React from 'react'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { DomainRole, DomainRoleCreate } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

interface IProps extends ModalFormProps {
	domainUrl: string
	roles: DomainRole[] | undefined
	onSuccess: () => void
}

interface RoleFormValue {
	role: string
	template?: string
}

const Index: React.FC<IProps> = ({ domainUrl, onSuccess, roles }) => {
	const { t } = useTranslation()
	const formRef = useRef<ProFormInstance>()

	const { runAsync: createRole } = useRequest(
		async (values: DomainRoleCreate) => {
			const response = await Horse.domain.v1CreateDomainRole(domainUrl, values)
			return response.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.DomainRoleNotUniqueError) {
					message.error('role name not unique')
				} else {
					message.success('add user success')
				}

				onSuccess()
			},
			onError: () => {
				message.error('add domain user failed')
			}
		}
	)

	const onFinish = async (values: RoleFormValue): Promise<boolean> => {
		if (values.template) {
			const templateRole = roles?.find(r => r.role === values.template)
			if (templateRole) {
				await createRole({
					role: values.role,
					permission: templateRole.permission
				})
				return true
			}
		}

		await createRole({
			role: values.role,
			permission: {}
		})
		return true
	}

	const options = useMemo(
		() =>
			(roles ?? []).map(role => ({
				label: role.role,
				value: role.role
			})),
		[roles]
	)

	return (
		<ModalForm<RoleFormValue>
			title='创建角色'
			width={520}
			formRef={formRef}
			trigger={
				<Button type='primary' key='create' icon={<TeamOutlined />}>
					创建角色
				</Button>
			}
			isKeyPressSubmit
			onFinish={onFinish}
			modalProps={{
				afterClose: (): void => {
					formRef.current?.resetFields()
				}
			}}
			dateFormatter='number'
		>
			<ProFormText
				name='role'
				label={t('DomainSettings.roleName')}
				rules={[
					{
						required: true
					}
				]}
			/>
			<ProFormSelect
				name='template'
				label={t('DomainSettings.roleTemplate')}
				options={options}
				placeholder='Select a current role as template'
				help={'Permissions of "user" will be applied by default'}
			/>
		</ModalForm>
	)
}

export default Index
