import { useRequest } from 'ahooks'
import { Badge, List, message, Skeleton } from 'antd'
import mm from 'moment'
import type React from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Horse from 'utils/service'

interface IProps {
	domainUrl: string
}

const Index: React.FC<IProps> = ({ domainUrl }) => {
	const { data: problemSets, loading } = useRequest(
		async () => {
			if (!domainUrl) {
				return []
			}

			const res = await Horse.problemSet.v1ListProblemSets(domainUrl, {
				ordering: '-created_at'
			})
			return res.data.data?.results ?? []
		},
		{
			refreshDeps: [domainUrl],
			onError: () => {
				message.error('failed to fetch problem sets')
			}
		}
	)

	const getStatusBadge = (
		unlockAtString: string | undefined,
		dueAtString: string | undefined,
		lockAtString: string | undefined
	): ReactNode => {
		const now = Date.now()
		const unlockAt = unlockAtString
			? new Date(unlockAtString).getTime()
			: undefined
		const dueAt = dueAtString ? new Date(dueAtString).getTime() : undefined
		const lockAt = lockAtString ? new Date(lockAtString).getTime() : undefined

		if (unlockAt && now < unlockAt) {
			return <Badge status='default' text='Not Started' />
		}

		if (lockAt && now > lockAt) {
			return <Badge status='error' text='Ended' />
		}

		if (dueAt && now > dueAt) {
			return <Badge status='warning' text='Overdue' />
		}

		return <Badge status='processing' text='Ongoing' />
	}

	return (
		<List
			itemLayout='horizontal'
			size='large'
			loading={loading}
			dataSource={problemSets ?? []}
			pagination={{
				position: 'bottom',
				pageSize: 5
			}}
			renderItem={(item): ReactNode => (
				<List.Item
					actions={[getStatusBadge(item.unlockAt, item.dueAt, item.lockAt)]}
				>
					<Skeleton title={false} loading={loading} active>
						<List.Item.Meta
							title={
								<Link to={`/domain/${domainUrl}/problem-set/${item.id}`}>
									<h2 className='text-2xl font-light'>{item.title}</h2>
								</Link>
							}
							description={
								item.dueAt
									? mm(item.dueAt).format('YYYY-MM-DD HH:mm')
									: 'No Due Date'
							}
						/>
					</Skeleton>
				</List.Item>
			)}
		/>
	)
}

export default Index
