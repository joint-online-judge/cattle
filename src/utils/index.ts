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

export function timeMs2String(timeMs: number): string {
  // @Chujie: Can you imagine we can judge AI/ML on this platform?
  if (timeMs > 1000 * 60)
    return `${Math.floor(timeMs / 1000 / 60).toString()}min`
  if (timeMs > 1000) return `${Math.floor(timeMs / 1000).toString()}s`
  return `${timeMs}ms` // Usually you would only need this
}

export function memoryKb2String(memoryKb: number): string {
  // @Chujie: If memory usage is larger than 1 GiB, I would suggest give up learning coding
  if (memoryKb > 1024 * 1024)
    return `${(memoryKb / 1024 / 1024).toFixed(3)} GiB`
  if (memoryKb > 1024) return `${(memoryKb / 1024).toFixed(3)} MiB`
  return `${memoryKb} KiB`
}
