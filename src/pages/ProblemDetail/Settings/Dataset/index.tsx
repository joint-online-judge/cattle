import { UploadOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import type { Result } from 'ahooks/lib/useRequest/src/types'
import { Alert, Button, Col, Divider, message, Row, Select, Upload } from 'antd'
import type { RcFile } from 'antd/lib/upload/interface'
import CommittedFileTree from 'components/CommittedFileTree'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import type { ObjectStatsListResp } from 'utils/service'
import Horse, { ConfigMissing, ErrorCode } from 'utils/service'

interface IProps {
  refresh: () => void
  listObjectsRequest: Result<ObjectStatsListResp, []>
}

const Index: React.FC<IProps> = ({ refresh, listObjectsRequest }) => {
  const { t } = useTranslation()
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>()
  const [configMissing, setConfigMissing] = useState<ConfigMissing>(
    ConfigMissing.UseDefault
  )

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemId) {
    throw new NoProblemIdError()
  }

  const { runAsync: uploadConfig, loading: uploading } = useRequest(
    async (file: Blob | RcFile | string) => {
      const res = await Horse.problemConfig.v1UpdateProblemConfigByArchive(
        problemId,
        domainUrl,
        { file: file as File },
        { configJsonOnMissing: configMissing }
      )
      return res.data
    },
    {
      manual: true,
      onSuccess: res => {
        switch (res.errorCode) {
          case ErrorCode.Success: {
            message.success(t('msg.success.uploadFile'))

            break
          }
          case ErrorCode.FileUpdateError: {
            message.error(t('ProblemDetail.Settings.Dataset.msg.noOldConfig'))

            break
          }
          case ErrorCode.ProblemConfigJsonNotFoundError: {
            message.error(t('ProblemDetail.Settings.Dataset.msg.noConfig'))

            break
          }
          default: {
            message.error(t('msg.error.uploadFile'))
          }
        }
        refresh()
      },
      onError: () => {
        message.error(t('msg.error.uploadFile'))
      }
    }
  )

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col>
          <Select
            style={{ width: 240 }}
            value={configMissing}
            onChange={setConfigMissing}
          >
            <Select.Option value={ConfigMissing.UseDefault}>
              {t('ProblemDetail.Settings.Dataset.select.use_default')}
              {/* {t('ProblemDetail.Settings.Dataset.alert.use_default')} */}
            </Select.Option>
            <Select.Option value={ConfigMissing.RaiseError}>
              {t('ProblemDetail.Settings.Dataset.select.raise_error')}
              {/* {t('ProblemDetail.Settings.Dataset.alert.raise_error')} */}
            </Select.Option>
            <Select.Option value={ConfigMissing.UseOld}>
              {t('ProblemDetail.Settings.Dataset.select.use_old')}
              {/* {t('ProblemDetail.Settings.Dataset.alert.use_old')} */}
            </Select.Option>
          </Select>
        </Col>
        <Col>
          <Upload
            name='file'
            maxCount={1}
            accept='.zip,.rar,.tar'
            showUploadList={false}
            customRequest={({ file }) => {
              uploadConfig(file)
            }}
          >
            <Button
              icon={<UploadOutlined />}
              type='primary'
              loading={uploading}
            >
              {t('ProblemDetail.Settings.Dataset.uploadFile')}
            </Button>
          </Upload>
        </Col>
      </Row>

      <div className='mt-4'>
        <Alert
          message={t(`ProblemDetail.Settings.Dataset.select.${configMissing}`)}
          description={t(
            `ProblemDetail.Settings.Dataset.alert.${configMissing}`
          )}
          type='info'
          showIcon
        />
      </div>

      <Divider>{t('ProblemDetail.Settings.Dataset.filesPreview')}</Divider>

      <CommittedFileTree
        domainUrl={domainUrl}
        problemId={problemId}
        initObjList={listObjectsRequest.data?.data}
        initiating={listObjectsRequest.loading}
      />
    </div>
  )
}

export default Index
