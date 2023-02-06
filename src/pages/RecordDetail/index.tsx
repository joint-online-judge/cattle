import { useRequest } from 'ahooks'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Head from 'components/Head'
import RecordCaseStatus from 'components/RecordCaseStatus'
import SidePage from 'components/SidePage'
import { useMessage } from 'hooks'
import { isNumber } from 'lodash-es'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { memoryKb2String, timeMs2String } from 'utils'
import { NoDomainUrlError, NoRecordIdError } from 'utils/exception'
import type { RecordCase } from 'utils/service'
import Horse, { RecordCaseResult } from 'utils/service'

const mockCases: RecordCase[] = [
  {
    state: RecordCaseResult.Accepted,
    score: 10,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.Canceled
  },
  {
    state: RecordCaseResult.MemoryLimitExceeded,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.OutputLimitExceeded,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.RuntimeError,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.SystemError,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.TimeLimitExceeded,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.WrongAnswer,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  },
  {
    state: RecordCaseResult.Etc,
    score: 0,
    timeMs: Math.floor(Math.random() * 10_000),
    memoryKb: Math.floor(Math.random() * 10_000)
  }
]

const Index: React.FC = () => {
  const { t } = useTranslation()
  const msg = useMessage()
  const { domainUrl, recordId } =
    useParams<{ domainUrl: string; recordId: string }>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!recordId) {
    throw new NoRecordIdError()
  }

  const columns: ColumnsType<RecordCase> = [
    {
      title: '#',
      render: (_text, _record, index) => <span>#{index + 1}</span>,
      width: 70
    },
    {
      title: t('RecordDetail.state'),
      dataIndex: 'state',
      key: 'state',
      render: (_value, record) => <RecordCaseStatus caseResult={record.state} />
    },
    {
      title: t('RecordDetail.time'),
      dataIndex: 'timeMs',
      key: 'timeMs',
      width: 100,
      render: value => (isNumber(value) ? timeMs2String(value) : 'N/A')
    },
    {
      title: t('RecordDetail.memory'),
      dataIndex: 'memoryKb',
      key: 'memoryKb',
      width: 100,
      render: value => (isNumber(value) ? memoryKb2String(value) : 'N/A')
    }
  ]

  const { data: record, loading } = useRequest(
    async () => {
      const response = await Horse.record.v1GetRecord(recordId, domainUrl)
      return response.data.data
    },
    {
      onError: () => {
        msg.error.fetch(t('RecordDetail.record'))
      }
    }
  )

  return (
    <div>
      <Head title={t('RecordDetail.title')} />
      <SidePage extra={<h1>Test</h1>}>
        <Table columns={columns} dataSource={record?.cases} loading={loading} />
        <Table columns={columns} dataSource={mockCases} loading={loading} />
      </SidePage>
    </div>
  )
}

export default Index
