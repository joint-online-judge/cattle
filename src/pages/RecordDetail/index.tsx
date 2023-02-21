import { useRequest } from 'ahooks'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Head from 'components/Head'
import RecordCaseStatus from 'components/RecordCaseStatus'
import RecordStatus from 'components/RecordStatus'
import ShadowCard from 'components/ShadowCard'
import SidePage from 'components/SidePage'
import UserBadge from 'components/UserBadge'
import dayjs from 'dayjs'
import { useMessage } from 'hooks'
import { isNumber } from 'lodash-es'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { memoryKb2String, timeMs2String } from 'utils'
import { NoDomainUrlError, NoRecordIdError } from 'utils/exception'
import type { RecordCase } from 'utils/service'
import Horse from 'utils/service'

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

  const problemLink = useMemo(() => {
    if (record?.problemId && record.problemSetId)
      return (
        <Link
          to={`/domain/${domainUrl}/problem-set/${record.problemSetId}/problem/${record.problemId}`}
        >
          {record.problemId}
        </Link>
      )
    if (record?.problemId)
      return (
        <Link to={`/domain/${domainUrl}/problem/${record.problemId}`}>
          {record.problemId}
        </Link>
      )
    return 'N/A'
  }, [domainUrl, record?.problemId, record?.problemSetId])

  const sideInfo = (
    <ShadowCard
      loading={loading}
      title={
        <h3 className='m-0 text-lg font-medium leading-6 text-gray-900'>
          {t('RecordDetail.title')}
        </h3>
      }
    >
      <dl>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Submit By</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.committerId ? (
              <UserBadge userId={record.committerId} />
            ) : (
              'N/A'
            )}
          </dd>
        </div>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Problem</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {problemLink}
          </dd>
        </div>
        {record?.problemSetId ? (
          <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
            <dt className='text-sm font-medium text-gray-500'>Assignment</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <Link
                to={`/domain/${domainUrl}/problem-set/${record.problemSetId}`}
              >
                {record.problemSetId}
              </Link>
            </dd>
          </div>
        ) : null}
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Language</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.language}
          </dd>
        </div>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Submit At</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.createdAt
              ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
              : 'N/A'}
          </dd>
        </div>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Judged At</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.judgedAt
              ? dayjs(record.judgedAt).format('YYYY-MM-DD HH:mm:ss')
              : 'N/A'}
          </dd>
        </div>
      </dl>
      <dl className='m-0'>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Score</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.score ?? 'N/A'}
          </dd>
        </div>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Total Time</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.timeMs === undefined
              ? 'N/A'
              : timeMs2String(record.timeMs)}
          </dd>
        </div>
        <div className='py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
          <dt className='text-sm font-medium text-gray-500'>Peak Memory</dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
            {record?.memoryKb === undefined
              ? 'N/A'
              : memoryKb2String(record.memoryKb)}
          </dd>
        </div>
      </dl>
    </ShadowCard>
  )

  return (
    <div>
      <Head title={t('RecordDetail.title')} />
      <SidePage extra={sideInfo}>
        <ShadowCard
          noPadding={!loading}
          loading={loading}
          title={
            loading ? (
              t('RecordDetail.title')
            ) : (
              <RecordStatus
                domainUrl={domainUrl}
                record={record}
                size='large'
              />
            )
          }
        >
          <Table
            columns={columns}
            dataSource={record?.cases}
            loading={loading}
          />
        </ShadowCard>
      </SidePage>
    </div>
  )
}

export default Index
