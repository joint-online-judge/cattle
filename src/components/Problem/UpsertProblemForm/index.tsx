import ProForm, {
	ProFormSelect,
	ProFormSwitch,
	ProFormText
} from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Form, message } from 'antd'
import MarkdownEditor from 'components/MarkdownEditor'
import { useMessage } from 'hooks'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SUPPORT_PROGRAMMING_LANGUAGE } from 'utils/constants'
import type { Problem, ProblemCreate, ProblemEdit } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

export interface IProps {
	domainUrl: string
	initialValues?: Partial<Problem>
	onCreateSuccess?: (problem: Problem) => void
	onUpdateSuccess?: (problem: Problem) => void
}

export const UpsertProblemForm: React.FC<IProps> = props => {
	const { domainUrl, initialValues, onCreateSuccess, onUpdateSuccess } = props
	const { t } = useTranslation()
	const navigate = useNavigate()
	const msg = useMessage()

	const languageOptions = SUPPORT_PROGRAMMING_LANGUAGE.map(lang => ({
		label: lang,
		value: lang
	}))

	const { run: createProblem } = useRequest(
		async (problem: ProblemCreate) =>
			Horse.problem.v1CreateProblem(domainUrl, problem),
		{
			manual: true,
			onSuccess: res => {
				if (res.data.errorCode === ErrorCode.IntegrityError) {
					message.error(t('msg.errorMsg.problemUrlNotUnique'))
				} else if (res.data.data?.id) {
					msg.success.create()
					if (onCreateSuccess) onCreateSuccess(res.data.data)
					navigate(
						`/domain/${domainUrl}/problem/${
							res.data.data.url ?? res.data.data.id
						}`
					)
				}
			},
			onError: () => {
				msg.error.create()
			}
		}
	)

	const { run: updateProblem } = useRequest(
		async (id: string, problem: ProblemEdit) =>
			Horse.problem.v1UpdateProblem(domainUrl, id, problem),
		{
			manual: true,
			onSuccess: res => {
				if (res.data.errorCode === ErrorCode.IntegrityError) {
					message.error(t('msg.errorMsg.problemUrlNotUnique'))
				} else if (res.data.data) {
					msg.success.update()
					if (onUpdateSuccess) onUpdateSuccess(res.data.data)
				}
			},
			onError: () => {
				msg.error.update()
			}
		}
	)

	const onFinish = async (values: Partial<Problem>): Promise<void> =>
		initialValues?.id
			? updateProblem(initialValues.id, values)
			: createProblem(values as ProblemCreate)

	return (
		<ProForm<ProblemCreate | ProblemEdit>
			layout='vertical'
			onFinish={onFinish}
			initialValues={initialValues}
			dateFormatter='number'
			omitNil
		>
			<ProForm.Group>
				<ProFormText
					width='lg'
					name='title'
					label={t('UpsertProblemForm.title')}
					rules={[{ required: true }]}
				/>
				<ProFormSwitch
					name='hidden'
					label={t('UpsertProblemForm.hidden')}
					rules={[{ required: true }]}
				/>
			</ProForm.Group>

			<ProFormText
				width='lg'
				name='url'
				label={t('UpsertProblemForm.url')}
				tooltip='The url of a problem must be unique within a domain.'
			/>

			<ProFormSelect
				width='lg'
				name='languages'
				label={t('UpsertProblemForm.languages')}
				fieldProps={{
					showArrow: true,
					allowClear: true,
					mode: 'multiple',
					options: languageOptions
				}}
			/>

			<Form.Item name='content' label={t('UpsertProblemForm.content')}>
				<MarkdownEditor />
			</Form.Item>
		</ProForm>
	)
}
