import type { Result } from 'ahooks/lib/useRequest/src/types'
import { Alert, Button, Descriptions, Segmented, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type {
  ProblemConfigDataDetail,
  ProblemConfigDataDetailResp,
  ProblemConfigDetail,
  ProblemConfigDetailListResp
} from 'client'
import { ErrorCode } from 'client'
import ShadowCard from 'components/ShadowCard'
import mm from 'moment'
import { useEffect, useMemo, useState } from 'react'
import Horse from 'utils/service'

interface IProps {
  domainUrl: string
  problemId: string
  configRequest: Result<ProblemConfigDataDetailResp, []>
  historyRequest: Result<ProblemConfigDetailListResp, []>
}

export enum ProblemConfigStatus {
  NoData,
  NoConfig,
  Done
}

const Index: React.FC<IProps> = ({
  domainUrl,
  problemId,
  configRequest,
  historyRequest
}: IProps) => {
  // const { t } = useTranslation()
  const { loading: fetchingConfig, data: configResp } = configRequest
  const { loading: fetchingHistory, data: historyResp } = historyRequest
  const [configStatus, setConfigStatus] = useState<ProblemConfigStatus>(
    ProblemConfigStatus.NoData
  )
  const [config, setConfig] = useState<ProblemConfigDataDetail>()
  const [category, setCategory] = useState<number | string>('current')

  useEffect(() => {
    setConfig(configResp?.data)
    switch (configResp?.errorCode) {
      case ErrorCode.Success: {
        setConfigStatus(ProblemConfigStatus.Done)
        break
      }
      case ErrorCode.ProblemConfigNotFoundError: {
        setConfigStatus(ProblemConfigStatus.NoData)

        break
      }
      case ErrorCode.ProblemConfigJsonNotFoundError: {
        setConfigStatus(ProblemConfigStatus.NoConfig)

        break
      }
      default:
        if (configResp?.data === undefined)
          setConfigStatus(ProblemConfigStatus.NoConfig)
        else setConfigStatus(ProblemConfigStatus.Done)
    }
  }, [configResp])

  const columns: ColumnsType<ProblemConfigDetail> = useMemo(
    () => [
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: text =>
          typeof text === 'string'
            ? mm(text).format('YYYY-MM-DD HH:mm:ss')
            : '-'
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        render: text =>
          typeof text === 'string'
            ? mm(text).format('YYYY-MM-DD HH:mm:ss')
            : '-'
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <a
            href={`${
              Horse.instance.defaults.baseURL ?? ''
            }/domains/${domainUrl}/problems/${problemId}/configs/${record.id}`}
          >
            Download
          </a>
        )
      }
    ],
    [domainUrl, problemId]
  )

  const overview = useMemo(() => {
    if (configStatus === ProblemConfigStatus.NoData)
      return (
        <Alert
          message='No Data Found'
          description='Please upload a dataset first'
          type='warning'
          showIcon
        />
      )

    if (configStatus === ProblemConfigStatus.NoConfig)
      return (
        <Alert
          message='No Config Found'
          description='Please configure the languages'
          type='warning'
          showIcon
        />
      )

    return (
      <div>
        {config ? (
          <Descriptions>
            <Descriptions.Item label='Config ID' span={3}>
              {config.id}
            </Descriptions.Item>
            <Descriptions.Item label='Created At' span={3}>
              {config.createdAt
                ? mm(config.createdAt).format('YYYY-MM-DD HH:mm:ss')
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item label='Updated At' span={3}>
              {config.updatedAt
                ? mm(config.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                : '-'}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
        <Button
          block
          className='mt-4'
          href={`${
            Horse.instance.defaults.baseURL ?? ''
          }/domains/${domainUrl}/problems/${problemId}/configs/latest`}
        >
          Download Dataset
        </Button>
      </div>
    )
  }, [configStatus, domainUrl, problemId, config])

  const history = useMemo(() => {
    const configList = historyResp?.data
    if (!configList || configList.results?.length === 0) return null
    return (
      <div>
        <p className='text-base font-semibold'>Recent 5 versions</p>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={configList.results}
          size='small'
          pagination={false}
        />
      </div>
    )
  }, [historyResp?.data, columns])

  return (
    <ShadowCard
      title='Overview'
      extra={
        <Segmented
          options={['current', 'history']}
          value={category}
          onChange={setCategory}
        />
      }
      loading={fetchingConfig || fetchingHistory}
    >
      {category === 'history' ? history : overview}
    </ShadowCard>
  )
}

export default Index
