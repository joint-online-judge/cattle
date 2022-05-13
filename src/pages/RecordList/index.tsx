import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import RecordStatus from 'components/RecordStatus'
import { isNumber, omit, omitBy } from 'lodash-es'
import type React from 'react'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { transPagination } from 'utils'
import { NoDomainUrlError } from 'utils/exception'
import type { RecordListDetail } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'
import './style.less'

interface QueryParams {
	problem?: string
	problemSet?: string
	submitterId?: string
}

const Index: React.FC = () => {
	const { t } = useTranslation()
	const actionRef = useRef<ActionType>()
	const { domainUrl } = useParams<{ domainUrl: string }>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	const { runAsync: fetchRecords } = useRequest(
		async (query: ProTablePagination & QueryParams) => {
			const res = await Horse.record.v1ListRecordsInDomain(domainUrl, {
				...omitBy(omit(query, ['pageSize', 'current']), value => !value),
				...transPagination(query),
				ordering: '-created_at'
			})
			return res.data
		},
		{
			manual: true,
			onError: () => {
				message.error('failed to fetch records')
			}
		}
	)

	const columns: ProColumns<RecordListDetail>[] = useMemo(
		() => [
			{
				title: t('RecordList.status'),
				dataIndex: 'state',
				width: 120,
				search: false,
				render: (text, record) => <RecordStatus record={record} />
			},
			{
				title: t('RecordList.problem'),
				dataIndex: 'problemTitle',
				ellipsis: true,
				search: false,
				render: (_, record) => {
					if (!record.problemId) return record.problemTitle ?? '-'

					return record.problemSetId ? (
						<Link
							to={`/domain/${record.domainId}/problem-set/${record.problemSetId}/problem/${record.problemId}`}
							rel='noopener noreferrer'
							target='_blank'
						>
							{record.problemTitle} ({record.problemSetTitle})
						</Link>
					) : (
						<Link
							to={`/domain/${record.domainId}/problem/${record.problemId}`}
							rel='noopener noreferrer'
							target='_blank'
						>
							{record.problemTitle}
						</Link>
					)
				}
			},
			{
				title: t('RecordList.time'),
				dataIndex: 'timeMs',
				width: 80,
				search: false,
				render: (_, record) =>
					isNumber(record.timeMs) ? `${record.timeMs} ms` : 'N/A'
			},
			{
				title: t('RecordList.memory'),
				dataIndex: 'memoryKb',
				width: 80,
				search: false,
				render: (_, record) =>
					isNumber(record.memoryKb) ? `${record.memoryKb} KB` : 'N/A'
			},
			{
				title: t('RecordList.language'),
				dataIndex: 'language',
				width: 100,
				search: false
			},
			{
				title: t('RecordList.submitAt'),
				dataIndex: 'createdAt',
				valueType: 'dateTime',
				width: 180,
				search: false
			},
			{
				title: t('RecordList.problem'),
				dataIndex: 'problem',
				hideInTable: true
			},
			{
				title: t('RecordList.problemSet'),
				dataIndex: 'problemSet',
				hideInTable: true
			},
			{
				title: t('RecordList.submitter'),
				dataIndex: 'submitterId',
				hideInTable: true
			}
		],
		[t]
	)

	return (
		<div id='record-list-table'>
			<ProTable<RecordListDetail, QueryParams>
				columns={columns}
				actionRef={actionRef}
				request={async params => {
					const resp = await fetchRecords(params)
					return {
						data: resp.data?.results,
						total: resp.data?.count,
						success: resp.errorCode === ErrorCode.Success
					}
				}}
				columnsState={{
					persistenceKey: 'record-list-table',
					persistenceType: 'localStorage'
				}}
				rowKey='id'
				search={{ labelWidth: 'auto' }}
				form={{ syncToUrl: true }}
				pagination={{ pageSize: 20 }}
				dateFormatter='string'
			/>
		</div>
	)
}

export default Index
