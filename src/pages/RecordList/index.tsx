import { useRequest } from 'ahooks'
import type { TableColumnProps } from 'antd'
import { Divider, message, Space, Table, Typography } from 'antd'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Domain } from 'utils/service'
import { Horse } from 'utils/service'
// Import {
//   CreateDomain,
// } from 'app/components';
// import { DomainHomeContainer } from './DomainHomeContainer';

const { Title } = Typography

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { data, loading } = useRequest(
		async () => {
			const res = await Horse.domain.v1ListDomains()
			return res.data.data?.results
		},
		{
			onError: () => {
				message.error('failed to fetch domain info')
			}
		}
	)

	const columns: TableColumnProps<Domain>[] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'My Role',
			dataIndex: 'role',
			key: 'role',
			render: (text: string | undefined) => text ?? '-'
		},
		// TODO: render role as tags
		// {
		//   title: 'Tags',
		//   key: 'tags',
		//   dataIndex: 'tags',
		//   render: tags => (
		//     <>
		//       {tags.map(tag => {
		//         let color = tag.length > 5 ? 'geekblue' : 'green';
		//         if (tag === 'loser') {
		//           color = 'volcano';
		//         }
		//         return (
		//           <Tag color={color} key={tag}>
		//             {tag.toUpperCase()}
		//           </Tag>
		//         );
		//       })}
		//     </>
		//   ),
		// },
		{
			title: 'Action',
			key: 'action',
			fixed: 'right',
			render: (text, record) => (
				<Space split={<Divider type='vertical' />}>
					<Link to={`/domain/${record.url ?? ''}`}>{t('VISIT')}</Link>
					<Link to={`/domain/${record.url ?? ''}/settings`}>{t('MANAGE')}</Link>
				</Space>
			)
		}
	]

	return (
		<ShadowCard style={{ marginTop: 24 }}>
			<Title level={3}>{t('DOMAIN.DOMAINS')}</Title>
			<Table
				columns={columns}
				dataSource={data ?? []}
				loading={loading}
				rowKey='id'
				pagination={false}
			/>
		</ShadowCard>
	)
}

export default Index
