import { GithubOutlined } from '@ant-design/icons'
import { Divider, Row, Space, Typography } from 'antd'
import type React from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import style from './style.module.less'

interface LinkItem {
	name: string
	path: string
	external?: boolean
}

const Index: React.FC = () => {
	const { t } = useTranslation()

	const items: LinkItem[] = useMemo(
		() => [
			{
				name: t('Footer.about'),
				path: '/about'
			},
			{
				name: t('Footer.api'),
				path: '/api'
			},
			{
				name: t('Footer.docs'),
				path: 'https://joint-online-judge.github.io/',
				external: true
			},
			{
				name: t('Footer.issue'),
				path: 'https://github.com/joint-online-judge/cattle/issues',
				external: true
			},
			{
				name: t('Footer.contact'),
				path: 'mailto:liuyh615@126.com',
				external: true
			}
		],
		[t]
	)

	return (
		<Row>
			<Space split={<Divider type='vertical' />} wrap size='small'>
				{items.map(item => (
					<div key={`${item.name}${item.path}`}>
						{item.external ? (
							<a href={item.path}>{item.name}</a>
						) : (
							<Link to={item.path}>{item.name}</Link>
						)}
					</div>
				))}
				<Typography.Link
					href='https://github.com/joint-online-judge'
					target='_blank'
				>
					<GithubOutlined className={style.githubIcon} />
				</Typography.Link>
			</Space>
		</Row>
	)
}

export default Index
