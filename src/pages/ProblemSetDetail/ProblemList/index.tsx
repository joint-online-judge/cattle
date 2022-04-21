import { Button, Empty, Space, Table } from 'antd'
import { isArray } from 'lodash-es'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemSetIdError } from 'utils/exception'
import type { ProblemPreviewWithLatestRecord } from 'utils/service'

interface IProps {
	problems: ProblemPreviewWithLatestRecord[] | undefined
}

const Index: React.FC<IProps> = ({ problems }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { domainUrl, problemSetId } =
		useParams<{ problemSetId: string; domainUrl: string }>()

	// const a = (
	//   <List
	//     itemLayout="horizontal"
	//     size="large"
	//     dataSource={problems ?? []}
	//     renderItem={(item) => (
	//       <List.Item>
	//         <Link to={`/domain/${domainUrl}/problem/${item.id ?? ''}`}>
	//           <strong>{item.title}</strong>
	//         </Link>
	//       </List.Item>
	//     )}
	//   />
	// );

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemSetId) {
		throw new NoProblemSetIdError()
	}

	const columns = [
		{
			title: t('ProblemSetDetail.problem.status'),
			dataIndex: 'recordState',
			width: 120,
			render: (_: unknown, row: ProblemPreviewWithLatestRecord) =>
				row.latestRecord?.state
		},
		{
			title: t('ProblemSetDetail.problem'),
			dataIndex: 'title',
			render: (_: unknown, row: ProblemPreviewWithLatestRecord) => (
				<Link
					to={`/domain/${domainUrl}/problem-set/${problemSetId}/p/${
						row.url ?? row.id
					}`}
				>
					{row.title}
				</Link>
			)
		}
	]

	return isArray(problems) && problems.length > 0 ? (
		<Table
			rowKey='id'
			columns={columns}
			dataSource={problems}
			pagination={false}
		/>
	) : (
		<Empty description={<span>There are no problems</span>}>
			<Space>
				<Button
					type='primary'
					onClick={(): void => {
						navigate(
							`/domain/${domainUrl}/problem-set/${problemSetId}/settings`
						)
					}}
				>
					Add or Clone
				</Button>
			</Space>
		</Empty>
	)
}

export default Index
