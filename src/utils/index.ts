import { isNil, omitBy } from 'lodash-es'
import type { RouteMatch } from 'react-router-dom'
import type { HorsePagination, ProTablePagination } from 'types'

export function transPagination(
	parameters: ProTablePagination
): HorsePagination {
	const { current, pageSize } = parameters
	const offset =
		!isNil(current) && !isNil(pageSize) ? (current - 1) * pageSize : undefined
	return omitBy(
		{
			limit: pageSize,
			offset
		},
		isNil
	)
}

export function joinRoutes(matches: RouteMatch[]): string {
	return matches
		.map(match => match.route.path) // extract all path patterns
		.join('/') // join with '/'
		.replace(/\/{2,}/, '/') // replace all redundant slash ('/')
}
