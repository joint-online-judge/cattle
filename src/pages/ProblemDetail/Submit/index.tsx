import { InboxOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select, Upload } from 'antd'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type { ProblemSolutionSubmit } from 'utils/service'
import { Horse } from 'utils/service'

const languages = ['C++', 'Java']

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { domainUrl, problemId, problemSetId } = useParams<{
		domainUrl: string
		problemId: string
		problemSetId?: string
	}>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemId) {
		throw new NoProblemIdError()
	}

	const onFinish = useCallback(
		(values: ProblemSolutionSubmit) => {
			if (problemSetId) {
				Horse.problemSet.v1SubmitSolutionToProblemSet(
					domainUrl,
					problemSetId,
					problemId,
					values
				)
			} else {
				Horse.problem.v1SubmitSolutionToProblem(domainUrl, problemId, values)
			}
		},
		[domainUrl, problemId, problemSetId]
	)

	const languageOptions = useMemo(
		() =>
			languages.map(lang => (
				<Select.Option value={lang} key={lang}>
					{lang}
				</Select.Option>
			)),
		[]
	)

	const submitFileForm = useMemo(
		() => (
			<Row>
				<Col span={10}>
					<Form layout='vertical' onFinish={onFinish}>
						<Form.Item
							label={t('PROBLEM.LANGUAGES')}
							name='language'
							required
							rules={[
								{
									required: true
								}
							]}
						>
							<Select placeholder={t('form.placeholder.select')}>
								{languageOptions}
							</Select>
						</Form.Item>
						<Form.Item
							label={t('ProblemDetail.Submit.uploadFile')}
							getValueFromEvent={({ file }: { file: File }) => file}
							name='file'
							rules={[
								{
									required: true,
									message: t('ProblemDetail.Submit.fileMissing')
								}
							]}
						>
							<Upload.Dragger
								maxCount={1}
								beforeUpload={() => false}
								accept='text/*,.zip,.rar,.tar'
							>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									{t('ProblemDetail.Submit.uploadHelpClick')}
								</p>
								<p className='ant-upload-hint'>
									{t('ProblemDetail.Submit.uploadHelpDrag')}
								</p>
							</Upload.Dragger>
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								{t('ProblemDetail.Submit.submit')}
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		),
		[languageOptions, onFinish, t]
	)

	// const submitTextForm = useMemo(
	// 	() => (
	// 		<Row>
	// 			<Col span={24}>
	// 				<Form layout='vertical' onFinish={onFinish}>
	// 					<input name='codeType' value={RecordCodeType.Text} hidden />
	// 					<Form.Item
	// 						label={t('PROBLEM.LANGUAGES')}
	// 						name='language'
	// 						className='w-1/2'
	// 						required
	// 						rules={[
	// 							{
	// 								required: true
	// 							}
	// 						]}
	// 					>
	// 						<Select placeholder={t('form.placeholder.select')}>
	// 							{languageOptions}
	// 						</Select>
	// 					</Form.Item>
	// 					<Form.Item
	// 						label={t('ProblemDetail.Submit.uploadFile')}
	// 						name='code'
	// 						rules={[
	// 							{
	// 								required: true,
	// 								message: t('ProblemDetail.Submit.textMissing')
	// 							}
	// 						]}
	// 					>
	// 						<Editor
	// 							height='40vh'
	// 							defaultLanguage='javascript'
	// 							defaultValue={'function sum(a, b) {\n  return a + b;\n}'}
	// 							options={{
	// 								fontSize: '14px'
	// 							}}
	// 						/>
	// 					</Form.Item>
	// 					<Form.Item>
	// 						<Button type='primary' htmlType='submit'>
	// 							{t('ProblemDetail.Submit.submit')}
	// 						</Button>
	// 					</Form.Item>
	// 				</Form>
	// 			</Col>
	// 		</Row>
	// 	),
	// 	[languageOptions, onFinish, t]
	// )

	// const renderForm = () => {
	// 	if (activeTabKey === RecordCodeType.Text) {
	// 		return submitTextForm
	// 	}
	// 	return submitFileForm
	// }

	return <ShadowCard>{submitFileForm}</ShadowCard>
}

export default Index
