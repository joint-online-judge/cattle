import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-form'
import {
	ModalForm,
	ProFormDateTimePicker,
	ProFormText
} from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Form, message } from 'antd'
import DomainRoleSelect from 'components/DomainRoleSelect'
import type React from 'react'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type {
	DomainInvitation,
	DomainInvitationCreate,
	DomainInvitationEdit
} from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

interface IProps extends ModalFormProps {
	domainUrl: string
	onSuccess: () => void
	formRef:
		| MutableRefObject<ProFormInstance<DomainInvitation> | undefined>
		| undefined
	editingInvitation?: DomainInvitation
}

const Index: React.FC<IProps> = ({
	domainUrl,
	onSuccess,
	visible,
	onVisibleChange,
	formRef,
	editingInvitation
}) => {
	const { t } = useTranslation()

	const { run: createInvitation } = useRequest(
		async (values: DomainInvitationCreate) => {
			const response = await Horse.domain.v1CreateDomainInvitation(
				domainUrl,
				values
			)
			return response.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('create invitation success')
				} else if (
					res.errorCode === ErrorCode.DomainInvitationBadRequestError
				) {
					message.error('code already used')
				} else {
					message.error('create invitation failed')
				}

				onSuccess()
			},
			onError: () => {
				message.error('create invitation failed')
			}
		}
	)

	const { run: updateInvitation } = useRequest(
		async (invitationId: string, values: DomainInvitationEdit) => {
			const response = await Horse.domain.v1UpdateDomainInvitation(
				domainUrl,
				invitationId,
				values
			)
			return response.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('update invitation success')
				} else if (
					res.errorCode === ErrorCode.DomainInvitationBadRequestError
				) {
					message.error('code already used')
				} else {
					message.error('update invitation failed')
				}

				onSuccess()
			},
			onError: () => {
				message.error('update invitation failed')
			}
		}
	)

	useEffect(() => {
		if (editingInvitation) {
			formRef?.current?.setFieldsValue(editingInvitation)
		}
	}, [editingInvitation, formRef])

	return (
		<ModalForm<DomainInvitation>
			title={editingInvitation ? '修改邀请' : '创建邀请'}
			width={520}
			isKeyPressSubmit
			onFinish={async (values): Promise<void> =>
				editingInvitation
					? updateInvitation(editingInvitation.id, values)
					: createInvitation(values)
			}
			visible={visible}
			onVisibleChange={onVisibleChange}
			formRef={formRef}
			dateFormatter='number'
		>
			<Form.Item
				name='role'
				label={t('CreateInvitationModal.form.role')}
				rules={[
					{
						required: true
					}
				]}
			>
				{/* TODO: Ban root option */}
				<DomainRoleSelect domainUrl={domainUrl} />
			</Form.Item>
			<ProFormText
				name='code'
				label={t('CreateInvitationModal.form.code')}
				rules={[
					{
						required: true
					}
				]}
			/>
			<ProFormDateTimePicker
				name='expireAt'
				label={t('CreateInvitationModal.form.expireAt')}
				help='Empty means never expire'
			/>
		</ModalForm>
	)
}

export default Index
