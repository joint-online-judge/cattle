import { useRequest } from 'ahooks'
import { List, Skeleton } from 'antd'
import ShadowCard from 'components/ShadowCard'
import { useMessage } from 'hooks'
import { usePageHeader } from 'models'
import type React from 'react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Horse } from 'utils/service'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { setHeader } = usePageHeader()
	const msg = useMessage()

	useEffect(() => {
		setHeader({
			title: t('DomainList.title')
		})
	}, [setHeader, t])

	const { data, loading } = useRequest(
		async () => {
			const res = await Horse.domain.v1ListDomains()
			return res.data.data?.results ?? []
		},
		{
			onError: () => {
				msg.error.fetch(t('domain'))
			}
		}
	)

	return (
		<ShadowCard bodyStyle={{ padding: 0 }}>
			<List
				loading={loading}
				itemLayout='horizontal'
				dataSource={data}
				size='large'
				renderItem={(item): ReactNode => (
					<List.Item
						actions={[
							<Link to={`/domain/${item.url ?? ''}`} key='visit'>
								{t('DomainList.visit')}
							</Link>,
							<Link
								to={`/domain/${item.url ?? ''}/settings/profile`}
								key='manage'
							>
								{t('DomainList.manage')}
							</Link>
						]}
					>
						<Skeleton title={false} loading={loading} active>
							<List.Item.Meta
								title={
									<Link to={`/domain/${item.url ?? ''}`} className='text-lg'>
										{item.name}
									</Link>
								}
							/>
						</Skeleton>
					</List.Item>
				)}
			/>
		</ShadowCard>
	)
}

export default Index
