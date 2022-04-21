import { useRequest } from 'ahooks'
import type { AxiosError } from 'axios'
import type { DomainDetail, DomainPermission } from 'client'
import { ErrorCode } from 'client'
import type { FC } from 'react'
import { createContext, useMemo, useState } from 'react'
import Horse from 'utils/service'

/**
 * Global domain data model.
 * Every page below a domain and uses domain data should use this model.
 * Data are initialized in the domain layout component.
 * Specially, you can consider this model as loading the `domainUrl`
 * in the site URL.
 */

interface DomainResponse {
	domain?: DomainDetail
	role?: string
	permission?: DomainPermission
}

export interface DomainContextValue extends DomainResponse {
	domainUrl?: string
	loading: boolean
	errorCode?: ErrorCode | 403 | undefined
	fetchDomain: (url: string | null | undefined) => void
	refresh: () => void
}

const DomainContext = createContext<DomainContextValue>({
	loading: false,
	fetchDomain: () => {},
	refresh: () => {}
})

const DomainContextProvider: FC = ({ children }) => {
	const [domainUrl, setDomainUrl] = useState<string>()
	const [errorCode, setErrorCode] = useState<ErrorCode | 403 | undefined>()

	const {
		data,
		run: fetchDomain,
		loading,
		refresh
	} = useRequest(
		async (url: string | null | undefined): Promise<DomainResponse> => {
			if (typeof url === 'string' && url.length > 0) {
				setDomainUrl(url)
				const res = await Horse.domain.v1GetDomain(url)

				if (res.data.errorCode !== ErrorCode.Success) {
					setErrorCode(res.data.errorCode)
					return {}
				}

				const perm = await Horse.domain.v1GetDomainUserPermission(url, 'me')

				if (perm.data.errorCode === ErrorCode.Success) {
					// All requests succeeded
					setErrorCode(undefined)
				} else {
					// Note: possible that user is root but not in the domain
					setErrorCode(perm.data.errorCode)
				}

				return {
					domain: res.data.data,
					role: perm.data.data?.role,
					permission: perm.data.data?.permission
				}
			}

			setDomainUrl(undefined)
			return {}
		},
		{
			manual: true,
			onError: error => {
				if ((error as AxiosError).response?.status === 403) {
					setErrorCode(403)
				}
			}
		}
	)

	const value: DomainContextValue = useMemo(
		() => ({
			domainUrl,
			domain: data?.domain,
			role: data?.role,
			permission: data?.permission,
			loading,
			errorCode,
			fetchDomain,
			refresh
		}),
		[
			domainUrl,
			data?.domain,
			data?.role,
			data?.permission,
			fetchDomain,
			refresh,
			loading,
			errorCode
		]
	)

	return (
		<DomainContext.Provider value={value}>{children}</DomainContext.Provider>
	)
}

export { DomainContext, DomainContextProvider }
