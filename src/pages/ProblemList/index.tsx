import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, Space } from 'antd'
import { HiddenFromUserIcon } from 'components/Icons'
import ShadowCard from 'components/ShadowCard'
import { useAccess, useDomain } from 'models'
import type React from 'react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { transPagination } from 'utils'
import { NoDomainUrlError } from 'utils/exception'
import type { ProblemWithLatestRecord } from 'utils/service'
import { Horse } from 'utils/service'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const access = useAccess()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { domain } = useDomain()
	const ref = useRef<ActionType>()
	const navigate = useNavigate()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	const { runAsync: fetchProblems, loading: fetching } = useRequest(
		async (parameters: ProTablePagination) => {
			const res = await Horse.problem.v1ListProblems(
				domainUrl,
				transPagination(parameters)
			)
			return res.data.data ?? { count: 0, results: [] }
		},
		{
			manual: true
		}
	)

	const columns: ProColumns<ProblemWithLatestRecord>[] = [
		{
			title: t('ProblemList.status'),
			width: 80,
			dataIndex: 'latestRecord',
			render: (_, record) =>
				record.latestRecord ? record.latestRecord.state : '-'
		},
		{
			title: t('ProblemList.title'),
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
					{record.hidden ? <HiddenFromUserIcon /> : null}
				</Space>
			)
		},
		{
			title: t('ProblemList.submission'),
			width: 60,
			dataIndex: 'numSubmit'
		},
		{
			title: t('ProblemList.acCount'),
			width: 60,
			dataIndex: 'numAccept'
		}
	]

	return (
		<ShadowCard
			extra={
				access.canCreateProblem ? (
					<Button
						icon={<PlusOutlined />}
						onClick={() => {
							navigate(`/domain/${domainUrl}/create-problem`)
						}}
						type='primary'
					>
						{t('ProblemList.create')}
					</Button>
				) : null
			}
		>
			<ProTable<ProblemWithLatestRecord>
				scroll={{ x: 'max-content' }}
				loading={fetching}
				actionRef={ref}
				cardProps={false}
				columns={columns}
				request={async parameters => {
					const data = await fetchProblems(parameters)
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
		</ShadowCard>
	)
}

export default Index
