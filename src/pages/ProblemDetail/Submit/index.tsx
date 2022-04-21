import { InboxOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Col, Form, message, Row, Select, Table, Upload } from 'antd'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { VERTICAL_GUTTER } from 'utils/constants'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type { ProblemSolutionSubmit } from 'utils/service'
import { Horse, RecordCodeType } from 'utils/service'

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

	const { data } = useRequest(
		async () => {
			const res = await Horse.record.v1ListRecordsInDomain(domainUrl, {
				problem: problemId,
				problemSet: problemSetId
			})
			return res.data.data?.results
		},
		{
			onError: () => {
				message.error('fetch submissions failed')
			}
		}
	)

	const columns = [
		{
			title: t('PROBLEM.STATUS'),
			dataIndex: 'status',
			key: 'status'
		},
		{
			title: t('PROBLEM.MEMORY_KB'),
			dataIndex: 'memory_kb',
			key: 'memory_kb'
		},
		{
			title: t('PROBLEM.TIME_MS'),
			dataIndex: 'time_ms',
			key: 'time_ms'
		},
		{
			title: t('PROBLEM.SUBMIT_AT'),
			dataIndex: 'submit_at',
			key: 'submit_at'
		}
	]

	const onFinish = (values: ProblemSolutionSubmit) => {
		Horse.problem.v1SubmitSolutionToProblem(domainUrl, problemId, values)
	}

	// Const languageOptions = useMemo(() => {
	//   return isArray(problem?.languages)
	//     ? problem?.languages.map((lang) => (
	//       <Select.Option value={lang} key={lang}>
	//         {lang}
	//       </Select.Option>
	//     ))
	//     : null;
	// }, [problem]);

	return (
		<Row gutter={VERTICAL_GUTTER}>
			<Col span={24}>
				<ShadowCard
					title={t('PROBLEM.RECENT_RECORD')}
					bodyStyle={{
						padding: 0
					}}
				>
					<Table
						rowKey='id'
						columns={columns}
						dataSource={data}
						pagination={false}
					/>
				</ShadowCard>
			</Col>
			<Col span={24}>
				<ShadowCard title={t('PROBLEM.SUBMIT')}>
					<Row>
						<Col span={10}>
							<Form layout='vertical' onFinish={onFinish}>
								{/* <Form.Item
                  label={t('PROBLEM.LANGUAGES')}
                  name="language"
                  required={true}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={intl.formatMessage(
                      { id: 'FORM.SELECT_PLACEHOLDER' },
                      { field: t('PROBLEM.LANGUAGES') },
                    )}
                  >
                    {languageOptions}
                  </Select>
                </Form.Item> */}
								<Form.Item
									label={t('CodeType')}
									name='codeType'
									required
									rules={[
										{
											required: true
										}
									]}
								>
									<Select>
										<Select.Option value={RecordCodeType.Archive}>
											Archive
										</Select.Option>
										<Select.Option value={RecordCodeType.Text}>
											Text
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									label={t('PROBLEM.UPLOAD_FILE')}
									getValueFromEvent={({ file }: { file: File }) => file}
									name='file'
									rules={[
										{
											required: true,
											message: t('PROBLEM.UPLOAD_FILE.MISSING')
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
											{t('PROBLEM.UPLOAD_HELP_CLICK')}
										</p>
										<p className='ant-upload-hint'>
											{t('PROBLEM.UPLOAD_HELP_DRAG')}
										</p>
									</Upload.Dragger>
								</Form.Item>
								<Form.Item>
									<Button type='primary' htmlType='submit'>
										{t('PROBLEM.SUBMIT')}
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</ShadowCard>
			</Col>
		</Row>
	)
}

export default Index
