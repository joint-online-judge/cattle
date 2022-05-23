import { InboxOutlined } from '@ant-design/icons'
import ProForm, { ProFormSelect } from '@ant-design/pro-form'
import { Form, Upload } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'
import ShadowCard from 'components/ShadowCard'
import { useProblem } from 'models'
import type React from 'react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type { ProblemSolutionSubmit } from 'utils/service'
import { Horse } from 'utils/service'

interface UploadEvent {
  file: RcFile
  fileList?: UploadFile[]
}

const normFile = (e: UploadEvent | UploadFile[]) => {
  if (Array.isArray(e)) {
    return e.map(f => f.originFileObj)
  }
  return e.fileList?.map(f => f.originFileObj)
}

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { domainUrl, problemId, problemSetId } = useParams<{
    domainUrl: string
    problemId: string
    problemSetId?: string
  }>()
  const { problem, loading: problemLoading } = useProblem()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemId) {
    throw new NoProblemIdError()
  }

  const onFinish = useCallback(
    async (values: ProblemSolutionSubmit) => {
      await (problemSetId
        ? Horse.problemSet.v1SubmitSolutionToProblemSet(
            domainUrl,
            problemSetId,
            problemId,
            values
          )
        : Horse.problem.v1SubmitSolutionToProblem(domainUrl, problemId, values))
    },
    [domainUrl, problemId, problemSetId]
  )

  const languageOptions = useMemo(
    () =>
      problem?.languages?.map(lang => ({
        label: lang,
        value: lang
      })) ?? [],
    [problem]
  )

  const submitFileForm = useMemo(
    () => (
      <ProForm
        onFinish={onFinish}
        submitter={{
          resetButtonProps: false
        }}
      >
        <ProFormSelect
          width='sm'
          name='language'
          request={async () => languageOptions}
          label={t('ProblemDetail.Submit.languages')}
          rules={[{ required: true }]}
        />
        <Form.Item
          label={t('ProblemDetail.Submit.uploadFile')}
          getValueFromEvent={normFile}
          name='files'
          rules={[
            {
              required: true,
              message: t('ProblemDetail.Submit.fileMissing')
            }
          ]}
        >
          <Upload.Dragger beforeUpload={() => false} multiple>
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
      </ProForm>
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
  // <Form.Item
  // 	label={t('ProblemDetail.Submit.uploadFile')}
  // 	name='code'
  // 	rules={[
  // 		{
  // 			required: true,
  // 			message: t('ProblemDetail.Submit.textMissing')
  // 		}
  // 	]}
  // >
  // 	<Editor
  // 		height='40vh'
  // 		defaultLanguage='javascript'
  // 		defaultValue={'function sum(a, b) {\n  return a + b;\n}'}
  // 		options={{
  // 			fontSize: '14px'
  // 		}}
  // 	/>
  // </Form.Item>
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

  return <ShadowCard loading={problemLoading}>{submitFileForm}</ShadowCard>
}

export default Index
