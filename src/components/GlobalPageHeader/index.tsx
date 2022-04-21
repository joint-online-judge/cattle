import type { PageHeaderProps } from 'antd'
import { PageHeader, Skeleton } from 'antd'
import type { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import { usePageHeader } from 'models'
import type React from 'react'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function itemRender(
	route: Route,
	_params: Record<string, string>,
	routes: Route[],
	paths: string[]
): ReactElement {
	const last = routes.indexOf(route) === routes.length - 1
	return last ? (
		<span>{route.breadcrumbName}</span>
	) : (
		<Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
	)
}

const Index: React.FC<PageHeaderProps> = props => {
	const { ...otherProps } = props
	const { t } = useTranslation()

	const [pageHeaderProps, setPageHeaderProps] = useState<PageHeaderProps>({})
	const { header, headerVisible } = usePageHeader()

	useEffect(() => {
		let title: ReactElement
		if (header.titleI18nKey) {
			title = (
				<h1 className='m-0 text-3xl font-light'>{t(header.titleI18nKey)}</h1>
			)
		} else if (header.title) {
			title = <h1 className='m-0 text-3xl font-light'>{header.title}</h1>
		} else {
			title = <Skeleton.Input active style={{ width: 240 }} />
		}

		setPageHeaderProps({
			title,
			subTitle: header.subTitleI18nKey
				? t(header.subTitleI18nKey)
				: header.subTitle,
			breadcrumb: {
				routes: header.routes
					? header.routes.map(r => ({
							...r,
							breadcrumbName: r.breadcrumbI18nKey
								? t(r.breadcrumbI18nKey)
								: r.breadcrumbName ?? ''
					  }))
					: header.routes,
				itemRender
			}
		})
	}, [header, t])

	return headerVisible ? (
		<PageHeader
			style={{ paddingLeft: 0, paddingRight: 0 }}
			{...pageHeaderProps}
			{...otherProps}
		/>
	) : null
}

export default Index
