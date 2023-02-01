import { LoadingOutlined } from '@ant-design/icons'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Col, message, Row, Spin } from 'antd'
import ShadowCard from 'components/ShadowCard'
import { useDomain } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'
import Horse, { ErrorCode } from 'utils/service'

interface FormValues {
  code: string
}

const Index: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { domainUrl } = useParams<{ domainUrl: string }>()
  const [searchParams] = useSearchParams()
  const { domain } = useDomain()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  const { run: joinDomain, loading: joining } = useRequest(
    async (code: string) => {
      const res = await Horse.domain.v1JoinDomainByInvitation(domainUrl, {
        invitationCode: code
      })
      return res.data
    },
    {
      manual: true,
      onSuccess: res => {
        switch (res.errorCode) {
          case ErrorCode.Success: {
            message.success('join success')
            navigate(`/domain/${domain?.url ?? domain?.id ?? ''}`)

            break
          }

          case ErrorCode.DomainInvitationBadRequestError: {
            // TODO: improve error info
            message.error('wrong invitation code/link expired')

            break
          }

          case ErrorCode.UserAlreadyInDomainBadRequestError: {
            message.error('you are already in domain')

            break
          }

          default: {
            message.error('join failed')
          }
        }
      },
      onError: () => {
        message.error('join failed')
      }
    }
  )

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      joinDomain(code)
    }
  }, [searchParams, joinDomain])

  const onFinish = async (values: FormValues): Promise<void> =>
    joinDomain(values.code)

  return (
    <Spin spinning={joining} indicator={<LoadingOutlined />} tip='Joining...'>
      <ShadowCard>
        <Row justify='center' className='py-12'>
          <Col xxl={10} xl={10} lg={10} md={14} sm={18} xs={22}>
            <h1 className='text-3xl'>{`Join ${domain?.name ?? ''}`}</h1>
            <p className='mb-6'>
              Fill in the invitation code to join <b>{domain?.name ?? ''}</b>
            </p>
            <ProForm<FormValues>
              layout='vertical'
              onFinish={onFinish}
              submitter={{
                searchConfig: {
                  submitText: t('JoinDomain.join')
                },
                submitButtonProps: {
                  block: true
                },
                resetButtonProps: false
              }}
              dateFormatter='number'
              omitNil
            >
              <ProFormText
                name='code'
                label={t('JoinDomain.code')}
                rules={[
                  {
                    required: true
                  }
                ]}
              />
            </ProForm>
          </Col>
        </Row>
      </ShadowCard>
    </Spin>
  )
}

export default Index
