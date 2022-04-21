import ProForm, {
	ProFormDateTimePicker,
	ProFormSwitch,
	ProFormText
} from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Col, Form, Row } from 'antd'
import MarkdownEditor from 'components/MarkdownEditor'
import { useMessage } from 'hooks'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type {
	ProblemSet,
	ProblemSetCreate,
	ProblemSetEdit
} from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

export interface IProps {
	initialValues?: Partial<ProblemSet>
	domainUrl: string
	onUpdateSuccess?: () => void
}

const UpsertProblemSetForm: React.FC<IProps> = props => {
	const { domainUrl, initialValues, onUpdateSuccess } = props
	const { t } = useTranslation()
	const navigate = useNavigate()
	const msg = useMessage()

	const { run: createProblemSet } = useRequest(
		async (problemSet: ProblemSetCreate) =>
			Horse.problemSet.v1CreateProblemSet(domainUrl, problemSet),
		{
			manual: true,
			onSuccess: res => {
				if (res.data.errorCode === ErrorCode.Success && res.data.data?.id) {
					msg.success.create()
					navigate(
						`/domain/${domainUrl}/problem-set/${
							res.data.data.url ?? res.data.data.id
						}`
					)
				} else {
					msg.error.create()
				}
			}
		}
	)

	const { run: updateProblemSet } = useRequest(
		async (id: string, problemSet: ProblemSetEdit) =>
			Horse.problemSet.v1UpdateProblemSet(domainUrl, id, problemSet),
		{
			manual: true,
			onSuccess: res => {
				// Todo: add errCode
				if (res.data.errorCode === ErrorCode.Success) {
					msg.success.update()
					onUpdateSuccess?.()
				} else {
					msg.error.update()
				}
			}
		}
	)

	function filterChanged(
		problemSet: ProblemSetEdit,
		initial: Partial<ProblemSet>
	): ProblemSetEdit {
		return Object.fromEntries(
			Object.entries(problemSet).filter(
				([key, value]) =>
					key in initial && initial[key as keyof ProblemSetEdit] !== value
			)
		)
	}

	const onFinish = async (
		values: ProblemSetCreate | ProblemSetEdit
	): Promise<void> =>
		initialValues?.id
			? updateProblemSet(initialValues.id, filterChanged(values, initialValues))
			: createProblemSet(values as ProblemSetCreate)

	return (
		<ProForm<ProblemSetCreate | ProblemSetEdit>
			layout='vertical'
			onFinish={onFinish}
			initialValues={initialValues}
			dateFormatter='number'
			omitNil
		>
			<ProFormText
				width='lg'
				name='title'
				label={t('UpsertProblemSetForm.title')}
				rules={[{ required: true }]}
			/>
			<ProFormText
				width='lg'
				name='url'
				label={t('UpsertProblemSetForm.url')}
				tooltip='The url of a problem set must be unique within a domain.'
			/>

			<ProForm.Group>
				<ProFormDateTimePicker
					width='sm'
					name='unlockAt'
					label={t('UpsertProblemSetForm.unlockAt')}
					rules={[{ required: true }]}
				/>
				<ProFormDateTimePicker
					width='sm'
					name='dueAt'
					label={t('UpsertProblemSetForm.dueAt')}
					rules={[{ required: true }]}
				/>
				<ProFormDateTimePicker
					width='sm'
					name='lockAt'
					label={t('UpsertProblemSetForm.lockAt')}
					rules={[{ required: true }]}
				/>
			</ProForm.Group>

			<Row>
				<Col span={12}>
					<ProFormSwitch
						name='hidden'
						valuePropName='checked'
						label={t('UpsertProblemSetForm.hidden')}
						rules={[{ required: true }]}
					/>
				</Col>
				<Col span={12}>
					<ProFormSwitch
						name='scoreboardHidden'
						valuePropName='checked'
						label={t('UpsertProblemSetForm.scoreboardHidden')}
						rules={[{ required: true }]}
					/>
				</Col>
			</Row>

			<Form.Item name='content' label={t('UpsertProblemSetForm.content')}>
				<MarkdownEditor />
			</Form.Item>
		</ProForm>
	)
}

export { UpsertProblemSetForm }
