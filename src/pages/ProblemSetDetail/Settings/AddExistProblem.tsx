import { EyeInvisibleOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, message, Space, Tooltip } from 'antd'
import { useDomain } from 'models'
import type React from 'react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { NoDomainUrlError, NoProblemSetIdError } from 'utils/exception'
import type { Problem, ProblemList, ProblemSetAddProblem } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

interface IProps {
	fetchingProblems: boolean
	fetchProblems: (parameters: ProTablePagination) => Promise<ProblemList>
	problemIdList: string[]
	onAddSuccess: () => void
}

const Index: React.FC<IProps> = ({
	fetchingProblems,
	fetchProblems,
	onAddSuccess,
	problemIdList
}) => {
	const { domain } = useDomain()
	const { domainUrl, problemSetId } =
		useParams<{ domainUrl: string; problemSetId: string }>()
	const ref = useRef<ActionType>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemSetId) {
		throw new NoProblemSetIdError()
	}

	const { run: addProblem, loading: adding } = useRequest(
		async (values: ProblemSetAddProblem) => {
			const res = await Horse.problemSet.v1AddProblemInProblemSet(
				domainUrl,
				problemSetId,
				values
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('add problem success')
					onAddSuccess()
				} else {
					message.error('add problem failed')
				}
			},
			onError: () => {
				message.error('add problem failed')
			}
		}
	)

	const columns: ProColumns<Problem>[] = [
		{
			title: '标题',
			width: 300,
			dataIndex: 'title',
			render: (_, record) => (
				<Space>
					<Link
						to={`/domain/${domain?.url ?? record.domainId}/problem/${
							record.url ?? record.id
						}`}
					>
						{record.title}
					</Link>
					{record.hidden ? (
						<Tooltip title='This problem is invisible to normal users.'>
							<EyeInvisibleOutlined />
						</Tooltip>
					) : null}
				</Space>
			)
		},
		{
			title: 'Option',
			key: 'option',
			width: 80,
			valueType: 'option',
			render: (_, record) => [
				<Button
					type='link'
					disabled={problemIdList.includes(record.id)}
					key='add'
					onClick={(): void =>
						addProblem({
							problem: record.id
						})
					}
				>
					添加
				</Button>
			]
		}
	]

	return (
		<ProTable<Problem>
			scroll={{ x: 'max-content' }}
			loading={fetchingProblems || adding}
			actionRef={ref}
			cardProps={false}
			columns={columns}
			request={async (params): Promise<Partial<RequestData<Problem>>> => {
				const data = await fetchProblems(params)
				return {
					data: data.results,
					total: data.count,
					success: true
				}
			}}
			rowKey='id'
			pagination={{
				showQuickJumper: true
			}}
			search={false}
			options={false}
		/>
	)
}

export default Index
