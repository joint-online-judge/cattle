import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'
import type { Record } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

const columns: ProColumns<Record>[] = [
	{
		dataIndex: 'index',
		valueType: 'indexBorder',
		width: 48
	},
	{
		title: '标题',
		dataIndex: 'title',
		copyable: true,
		ellipsis: true,
		tip: '标题过长会自动收缩',
		formItemProps: {
			rules: [
				{
					required: true,
					message: '此项为必填项'
				}
			]
		}
	},
	{
		title: '状态',
		dataIndex: 'state',
		filters: true,
		onFilter: true,
		valueType: 'select',
		valueEnum: {
			all: { text: '全部', status: 'Default' },
			open: {
				text: '未解决',
				status: 'Error'
			},
			closed: {
				text: '已解决',
				status: 'Success',
				disabled: true
			},
			processing: {
				text: '解决中',
				status: 'Processing'
			}
		}
	},
	{
		title: '标签',
		dataIndex: 'labels',
		search: false,
		renderFormItem: (_, { defaultRender }) => defaultRender(_)
		// render: (_, record) => (
		// 	<Space>
		// 		{record.labels.map(({ name, color }) => (
		// 			<Tag color={color} key={name}>
		// 				{name}
		// 			</Tag>
		// 		))}
		// 	</Space>
		// )
	},
	{
		title: '创建时间',
		key: 'showTime',
		dataIndex: 'created_at',
		valueType: 'dateTime',
		sorter: true,
		hideInSearch: true
	},
	{
		title: '操作',
		valueType: 'option',
		key: 'option',
		render: (text, record) => [
			<Link to={record.id} target='_blank' rel='noopener noreferrer' key='view'>
				查看
			</Link>
		]
	}
]

const Index: React.FC = () => {
	// const { t } = useTranslation()
	const actionRef = useRef<ActionType>()
	const { domainUrl } = useParams<{ domainUrl: string }>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	const { runAsync: fetchRecords } = useRequest(
		// Get the type of parameters
		async (query: Parameters<typeof Horse.record.v1ListRecordsInDomain>[1]) => {
			const res = await Horse.record.v1ListRecordsInDomain(domainUrl, query)
			return res.data
		},
		{
			manual: true,
			onError: () => {
				message.error('failed to fetch records')
			}
		}
	)

	return (
		<ShadowCard>
			<ProTable<Record>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (_params, _sort, filter) => {
					const resp = await fetchRecords(filter)
					return {
						data: resp.data?.results,
						total: resp.data?.count,
						success: resp.errorCode === ErrorCode.Success
					}
				}}
				editable={{
					type: 'multiple'
				}}
				columnsState={{
					persistenceKey: 'record-list-table',
					persistenceType: 'localStorage'
				}}
				rowKey='id'
				search={{
					labelWidth: 'auto'
				}}
				form={{
					// 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
					syncToUrl: (values, type) => {
						if (type === 'get') {
							return {
								...values,
								created_at: [values.startTime, values.endTime]
							}
						}
						return values
					}
				}}
				pagination={{
					pageSize: 20
				}}
				dateFormatter='string'
				headerTitle='高级表格'
			/>
		</ShadowCard>
	)
}

export default Index
