import ProCard from '@ant-design/pro-card'
import { useRequest } from 'ahooks'
import { Col, message, Row } from 'antd'
import ShadowCard from 'components/ShadowCard'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { transPagination } from 'utils'
import { VERTICAL_GUTTER } from 'utils/constants'
import Horse from 'utils/service'
import AddExistProblem from './AddExistProblem'
import DraggableProblemTable from './DraggableProblemTable'

const Index: React.FC = () => {
	const [tab, setTab] = useState('tab1')
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()
	const { domainUrl, problemSetId } =
		useParams<{ domainUrl: string; problemSetId: string }>()

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	if (!problemSetId) {
		// Shall be unreachable under normal conditions
		throw new Error('No problemSetId found')
	}

	const {
		data: problemSet,
		refresh: refreshProblemSet,
		loading: fetchingProblemSet
	} = useRequest(
		async () => {
			const res = await Horse.problemSet.v1GetProblemSet(
				domainUrl,
				problemSetId
			)
			return res.data.data
		},
		{
			onError: () => {
				message.error('failed to fetch domain info')
			}
		}
	)

	const {
		runAsync: fetchProblems,
		refresh: refreshProblems,
		loading: fetchingProblems
	} = useRequest(
		async (parameters: ProTablePagination) => {
			const res = await Horse.problem.v1ListProblems(domainUrl, {
				...transPagination(parameters),
				ordering: '-created_at'
			})
			return res.data.data ?? { count: 0, results: [] }
		},
		{
			manual: true
		}
	)

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'problem-set',
				breadcrumbI18nKey: 'PROBLEM_SET.PROBLEM_SET'
			},
			{
				path: problemSetId,
				breadcrumbName: problemSet?.title ?? 'unknown'
			},
			{
				path: 'settings'
			}
		],
		[domainUrl, domain?.name, problemSetId, problemSet?.title]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			titleI18nKey: 'problem_set.side_menu.settings'
		})
	}, [breads, setHeader])

	return (
		<Row gutter={VERTICAL_GUTTER}>
			<Col span={24}>
				<ShadowCard bodyStyle={{ padding: 0 }}>
					<ProCard split='vertical'>
						<ProCard
							title='Problem List'
							colSpan='30%'
							bodyStyle={{ padding: 16 }}
						>
							<DraggableProblemTable
								domainUrl={domainUrl}
								problemSetId={problemSetId}
								problems={problemSet?.problems ?? []}
								loading={fetchingProblemSet}
								onDeleteSuccess={() => {
									refreshProblemSet()
									refreshProblems()
								}}
								onUpdateFinish={() => refreshProblemSet()}
							/>
						</ProCard>
						<ProCard
							tabs={{
								activeKey: tab,
								onChange: setTab,
								animated: { inkBar: true, tabPane: true }
							}}
						>
							<ProCard.TabPane key='tab1' tab='Add Existed'>
								<AddExistProblem
									fetchingProblems={fetchingProblems}
									onAddSuccess={refreshProblemSet}
									fetchProblems={fetchProblems}
									problemIdList={problemSet?.problems?.map(p => p.id) ?? []}
								/>
							</ProCard.TabPane>
							<ProCard.TabPane key='tab2' tab='Clone'>
								TODO: Clone
							</ProCard.TabPane>
						</ProCard>
					</ProCard>
				</ShadowCard>
			</Col>
		</Row>
	)
}

export default Index
