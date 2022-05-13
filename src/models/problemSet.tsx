import { useRequest } from 'ahooks'
import type { FC } from 'react'
import { createContext, useMemo, useState } from 'react'
import type { ProblemSetDetail } from 'utils/service'
import Horse from 'utils/service'

export interface ProblemSetContextValue {
	problemSetId?: string
	problemSet?: ProblemSetDetail
	loading: boolean
	fetchProblemSet: (
		domainUrl: string | null | undefined,
		problemSetId: string | null | undefined
	) => void
	refresh: () => void
}

const ProblemSetContext = createContext<ProblemSetContextValue>({
	loading: false,
	fetchProblemSet: () => {},
	refresh: () => {}
})

const ProblemSetContextProvider: FC = ({ children }) => {
	const [problemSetId, setProblemSetId] = useState<string>()

	const {
		data: problemSet,
		run: fetchProblemSet,
		loading,
		refresh
	} = useRequest(
		async (
			domainUrl: string | null | undefined,
			psId: string | null | undefined
		) => {
			if (
				typeof domainUrl === 'string' &&
				domainUrl.length > 0 &&
				typeof psId === 'string' &&
				psId.length > 0
			) {
				setProblemSetId(psId)
				const res = await Horse.problemSet.v1GetProblemSet(domainUrl, psId)
				return res.data.data
			}

			setProblemSetId(undefined)
			return undefined
		},
		{
			manual: true
		}
	)

	const value: ProblemSetContextValue = useMemo(
		() => ({
			problemSetId,
			problemSet,
			fetchProblemSet,
			refresh,
			loading
		}),
		[problemSetId, problemSet, fetchProblemSet, refresh, loading]
	)

	return (
		<ProblemSetContext.Provider value={value}>
			{children}
		</ProblemSetContext.Provider>
	)
}

export { ProblemSetContext, ProblemSetContextProvider }
