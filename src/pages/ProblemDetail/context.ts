import React, { useContext } from 'react'
import type { ProblemDetailWithLatestRecord } from 'utils/service'

interface IProblemContextValue {
	problem?: ProblemDetailWithLatestRecord
	loading: boolean
	refresh: () => void
}

const ProblemContext = React.createContext<IProblemContextValue>({
	loading: false,
	refresh: () => {}
})

const useProblem = (): IProblemContextValue =>
	useContext<IProblemContextValue>(ProblemContext)

export { ProblemContext, useProblem }
