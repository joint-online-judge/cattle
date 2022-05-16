import type { Route } from 'antd/es/breadcrumb/Breadcrumb'
import type { FC } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

export interface BasicHeader {
	title?: string
	titleI18nKey?: string
	subTitle?: string
	subTitleI18nKey?: string
	routes?: (Partial<Route> & { path: string; breadcrumbI18nKey?: string })[]
}

export interface PageHeaderContextValue {
	header: BasicHeader
	setHeader: (header: BasicHeader) => void
	removeHeader: () => void
	headerVisible: boolean
}

const PageHeaderContext = createContext<PageHeaderContextValue>({
	header: {},
	setHeader: () => {},
	removeHeader: () => {},
	headerVisible: false
})

const PageHeaderContextProvider: FC = ({ children }) => {
	const [headerObj, setHeaderObj] = useState<BasicHeader>({})
	const [headerVisible, setHeaderVisible] = useState<boolean>(false)

	const removeHeader = useCallback(() => {
		setHeaderObj({})
		setHeaderVisible(false)
	}, [])

	const setHeader = useCallback((h: BasicHeader) => {
		setHeaderObj(h)
		setHeaderVisible(true)
	}, [])

	const value: PageHeaderContextValue = useMemo(
		() => ({
			header: headerObj,
			headerVisible,
			setHeader,
			removeHeader
		}),
		[headerObj, headerVisible, setHeader, removeHeader]
	)

	return (
		<PageHeaderContext.Provider value={value}>
			{children}
		</PageHeaderContext.Provider>
	)
}

export { PageHeaderContext, PageHeaderContextProvider }
