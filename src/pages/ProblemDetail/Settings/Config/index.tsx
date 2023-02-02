import Editor from '@monaco-editor/react'
import { useRequest } from 'ahooks'
import type { Result } from 'ahooks/lib/useRequest/src/types'
import { Button, Form, message, Segmented } from 'antd'
import type React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type {
  ProblemConfigDataDetailResp,
  ProblemConfigJson
} from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

interface FormValues {
  config: string
}

interface IProps {
  refresh: () => void
  configRequest: Result<ProblemConfigDataDetailResp, []>
}

const Index: React.FC<IProps> = ({ refresh, configRequest }) => {
  // const { t } = useTranslation()
  const [form] = Form.useForm()
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>()
  // const msg = useMessage()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemId) {
    throw new NoProblemIdError()
  }

  useEffect(() => {
    form.setFieldsValue({
      config: JSON.stringify(configRequest.data?.data?.data, null, 2)
    })
  }, [form, configRequest.data])

  const { runAsync: updateConfig } = useRequest(
    async (values: ProblemConfigJson) => {
      const res = await Horse.problemConfig.v1UpdateProblemConfigJson(
        problemId,
        domainUrl,
        values
      )
      return res.data
    },
    {
      manual: true,
      onSuccess: res => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('update success')
        } else {
          message.error('update failed')
        }
        refresh()
      },
      onError: () => {
        message.error('update failed')
      }
    }
  )

  const onFinish = (values: FormValues) => {
    updateConfig(JSON.parse(values.config) as ProblemConfigJson)
  }

  return (
    <div>
      <div className='mb-4'>
        {/* @ts-expect-error lib types bug */}
        <Segmented options={['Form', 'JSON']} />
      </div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='config'>
          <Editor
            height='40vh'
            defaultLanguage='json'
            defaultValue={'{\n\n}'}
            options={{
              fontSize: 14
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Index
