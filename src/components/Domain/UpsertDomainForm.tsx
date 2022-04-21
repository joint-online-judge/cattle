import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import MarkdownEditor from 'components/MarkdownEditor'
import { useMessage } from 'hooks'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { Domain, DomainCreate, DomainEdit } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

interface IProperties {
	initialValues?: Partial<Domain>
	onUpdateSuccess?: (domain?: Domain) => void
	onCreateSuccess?: (domain?: Domain) => void
}

const Index: React.FC<IProperties> = props => {
	const { initialValues, onUpdateSuccess, onCreateSuccess } = props
	const { t } = useTranslation()
	const navigate = useNavigate()
	const msg = useMessage()

	const formReference = useRef<ProFormInstance<DomainCreate | DomainEdit>>()

	const { run: createDomain } = useRequest(
		async (domain: DomainCreate) => Horse.domain.v1CreateDomain(domain),
		{
			manual: true,
			onSuccess: response => {
				if (response.data.errorCode === ErrorCode.Success) {
					msg.success.create()
					onCreateSuccess?.(response.data.data)
					if (response.data.data?.url) {
						navigate(`/domain/${response.data.data.url}`)
					}
				} else if (response.data.errorCode === ErrorCode.InvalidUrlError) {
					msg.errorCode(ErrorCode.InvalidUrlError)
				} else {
					msg.error.create()
				}
			},
			onError: () => {
				msg.error.create()
			}
		}
	)

	const { run: updateDomain } = useRequest(
		async (url: string, domain: DomainEdit) =>
			Horse.domain.v1UpdateDomain(url, domain),
		{
			manual: true,
			onSuccess: response => {
				if (response.data.errorCode === ErrorCode.Success) {
					msg.success.update()
					onUpdateSuccess?.(response.data.data)
				} else {
					msg.errorCode(response.data.errorCode)
				}
			},
			onError: () => {
				msg.error.update()
			}
		}
	)

	const onFinish = async (values: DomainCreate | DomainEdit): Promise<void> =>
		initialValues?.url
			? updateDomain(initialValues.url, values)
			: createDomain(values as DomainCreate)

	useEffect(() => {
		formReference.current?.setFieldsValue(initialValues ?? {})
	}, [formReference, initialValues])

	return (
		<ProForm<DomainCreate | DomainEdit>
			formRef={formReference}
			layout='vertical'
			onFinish={onFinish}
			initialValues={initialValues}
			dateFormatter='number'
			omitNil
		>
			<ProFormText
				width='lg'
				name='name'
				label={t('UpsertDomainForm.name')}
				rules={[
					{
						required: true
					}
				]}
			/>

			<ProFormText
				width='lg'
				name='url'
				label={t('UpsertDomainForm.url')}
				tooltip='This will be displayed in the url of this domain.'
			/>

			<ProFormText
				width='lg'
				name='gravatar'
				label={t('UpsertDomainForm.gravatar')}
			/>

			<ProFormText
				width='lg'
				name='tag'
				label={t('UpsertDomainForm.tag')}
				tooltip='This field categorizes domains into groups. Admins can clone problems or manage problem groups within one domain group.'
			/>

			<Form.Item name='bulletin' label={t('UpsertDomainForm.bulletin')}>
				<MarkdownEditor />
			</Form.Item>
		</ProForm>
	)
}

export default Index
