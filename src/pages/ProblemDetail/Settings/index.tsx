import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormUploadButton } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import ShadowCard from 'components/ShadowCard'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type { FileUpload } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'
import { useProblem } from '../context'

interface FormValues {
	file: UploadFile[]
}

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()
	const { domainUrl, problemId } =
		useParams<{ domainUrl: string; problemId: string }>()
	const formRef = useRef<ProFormInstance<FormValues>>()
	const problemContext = useProblem()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemId) {
		throw new NoProblemIdError()
	}

	const { run: downloadConfig } = useRequest(
		async () =>
			Horse.problemConfig.v1DownloadProblemConfigArchive(
				domainUrl,
				problemId,
				'latest'
			),
		{
			manual: true,
			onError: () => {
				message.error('download failed')
			}
		}
	)

	const { runAsync: uploadConfig } = useRequest(
		async (values: FileUpload) => {
			const res = await Horse.problemConfig.v1UpdateProblemConfigByArchive(
				problemId,
				domainUrl,
				values
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode !== ErrorCode.Success) {
					message.error('upload failed')
				}
			},
			onError: () => {
				message.error('upload failed')
			}
		}
	)

	const { run: commit } = useRequest(
		async () => {
			const res = await Horse.problemConfig.v1CommitProblemConfig(
				problemId,
				domainUrl,
				{}
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode !== ErrorCode.Success) {
					message.error('commit failed')
				}
			},
			onError: () => {
				message.error('commit failed')
			}
		}
	)

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'problem',
				breadcrumbI18nKey: 'problem.problems'
			},
			{
				path: problemContext.problem?.title ?? 'null',
				breadcrumbName: problemContext.problem?.title
			}
		],
		[domainUrl, domain, problemContext.problem]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			titleI18nKey: 'PROBLEM.SETTINGS'
		})
	}, [breads, setHeader])

	const onFinish = async (values: FormValues) => {
		if (values.file[0]?.originFileObj) {
			await uploadConfig({
				file: values.file[0].originFileObj
			})
		}
	}

	return (
		<ShadowCard>
			<ProForm<FormValues>
				formRef={formRef}
				layout='vertical'
				onFinish={onFinish}
				dateFormatter='number'
				omitNil
			>
				<ProFormUploadButton
					width='md'
					name='file'
					label={t('PROBLEM.UPLOAD_FILE')}
					max={1}
					fieldProps={{
						beforeUpload: () => false,
						accept: '.zip,.rar,.tar'
					}}
					rules={[
						{
							required: true
						}
					]}
				/>
			</ProForm>
			<Button onClick={commit}>Commit</Button>
			<Button onClick={downloadConfig}>Download</Button>
		</ShadowCard>
	)
}

export default Index
