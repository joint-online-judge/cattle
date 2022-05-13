import type { PageHeaderProps } from 'antd'
import { PageHeader, Skeleton } from 'antd'
import type { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import { last } from 'lodash-es'
import { useDomain, useProblem, useProblemSet } from 'models'
import type React from 'react'
import type { ReactElement, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import Routes from 'routes'

function itemRender(
	route: Route,
	_params: Record<string, string>,
	routes: Route[]
): ReactElement {
	const lastRoute = routes.indexOf(route) === routes.length - 1
	return lastRoute ? (
		<span>{route.breadcrumbName}</span>
	) : (
		<Link to={route.path}>{route.breadcrumbName}</Link>
	)
}

const Index: React.FC<PageHeaderProps> = props => {
	const { ...otherProps } = props
	const { t } = useTranslation()
	const { domain, loading: domainLoading } = useDomain()
	const { problemSet, loading: problemSetLoading } = useProblemSet()
	const { problem, loading: problemLoading } = useProblem()
	const location = useLocation()
	const pageLoading = domainLoading || problemSetLoading || problemLoading

	const [pageHeaderProps, setPageHeaderProps] = useState<PageHeaderProps>({})
	const [routes, setRoutes] = useState<Route[]>([])
	const [title, setTitle] = useState<ReactNode>()

	// Parse route.path to string shown in breadcrumb/title
	// e.g. :domainUrl --> domain.url
	const parseRoutePath = useCallback(
		(path: string, fallback: string): string => {
			if (path.startsWith(':')) {
				if (path === ':domainUrl') {
					return domain?.name ?? domain?.url ?? domain?.id ?? fallback
				}

				if (path === ':problemSetId') {
					return (
						problemSet?.title ?? problemSet?.url ?? problemSet?.id ?? fallback
					)
				}
				if (path === ':problemId') {
					return problem?.title ?? problem?.url ?? problem?.id ?? fallback
				}
			}

			return fallback
		},
		[domain, problemSet, problem]
	)

	useEffect(() => {
		const routeMatches = matchRoutes(Routes, location)
		if (!routeMatches) {
			setRoutes([])
			return
		}

		const results: Route[] = []
		const i18nPaths = []
		for (const routeMatch of routeMatches) {
			if (
				routeMatch.route.path === '/' ||
				routeMatch.route.path === 'domain' ||
				routeMatch.route.index
			)
				// eslint-disable-next-line no-continue
				continue

			const fallback = last(routeMatch.pathname.split('/')) ?? ''
			if (routeMatch.route.path?.startsWith(':')) {
				results.push({
					path: routeMatch.pathname,
					breadcrumbName: parseRoutePath(routeMatch.route.path, fallback)
				})
			} else if (routeMatch.route.path) {
				i18nPaths.push(routeMatch.route.path)
				results.push({
					path: routeMatch.pathname,
					breadcrumbName: t(`PageHeader.${i18nPaths.join('_')}`) // @Chujie: joining with "." can lead to key conflicts
				})
			}
		}

		const lastRoute = results.pop()
		const newTitle = lastRoute ? (
			<h1 className='m-0 text-3xl font-light'>{lastRoute.breadcrumbName}</h1>
		) : null

		// Push an empty breadcrumb to show an extra "/" at the end
		if (results.length > 0) {
			results.push({
				path: '',
				breadcrumbName: ''
			})
		}

		setTitle(newTitle)
		setRoutes(results)
	}, [location, parseRoutePath, t])

	useEffect(() => {
		if (routes.length === 0) {
			setPageHeaderProps({})
			return
		}

		setPageHeaderProps({
			title,
			breadcrumb: {
				routes,
				itemRender
			}
		})
	}, [routes, title])

	// If routes is empty, render the empty <div> to occupy space (even if title is not null)
	if (routes.length === 0) {
		return <div className='p-4' />
	}

	return pageLoading ? (
		<Skeleton
			title={{ width: 280 }}
			paragraph={{ rows: 1, width: 160 }}
			active
		/>
	) : (
		<PageHeader
			style={{ paddingLeft: 0, paddingRight: 0 }}
			{...pageHeaderProps}
			{...otherProps}
		/>
	)
}

export default Index

/**
 * Little trick for i18n plugin to work:
 * t('PageHeader.problem')
 * t('PageHeader.create-problem')
 * t('PageHeader.problem_detail')
 * t('PageHeader.problem_submit')
 * t('PageHeader.problem_edit')
 * t('PageHeader.problem_settings')
 * t('PageHeader.problem-set')
 * t('PageHeader.problem-set_detail')
 * t('PageHeader.problem-set_scoreboard')
 * t('PageHeader.problem-set_system-test')
 * t('PageHeader.problem-set_edit')
 * t('PageHeader.problem-set_settings')
 * t('PageHeader.create-problem-set')
 * t('PageHeader.settings')
 * t('PageHeader.settings_profile')
 * t('PageHeader.settings_invitation')
 * t('PageHeader.settings_member')
 * t('PageHeader.settings_permission')
 * t('PageHeader.settings_permission_config')
 * t('PageHeader.settings_permission_role')
 * t('PageHeader.join')
 * t('PageHeader.preference')
 * t('PageHeader.preference_general')
 * t('PageHeader.preference_account')
 * t('PageHeader.preference_domains')
 * t('PageHeader.record')
 */
