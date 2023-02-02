import { useRequest } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'
import type { ProblemDetailWithLatestRecord } from 'utils/service'
import { Horse } from 'utils/service'

export interface ProblemContextValue {
  problemId?: string
  problem?: ProblemDetailWithLatestRecord
  loading: boolean
  fetchProblem: (
    domainUrl: string | null | undefined,
    problemId: string | null | undefined
  ) => void
  refresh: () => void
}

const ProblemContext = React.createContext<ProblemContextValue>({
  loading: false,
  fetchProblem: () => {},
  refresh: () => {}
})

const ProblemContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [problemId, setProblemId] = useState<string>()

  const {
    data: problem,
    run: fetchProblem,
    loading,
    refresh
  } = useRequest(
    async (
      domainUrl: string | null | undefined,
      pid: string | null | undefined
    ) => {
      if (
        typeof domainUrl === 'string' &&
        domainUrl.length > 0 &&
        typeof pid === 'string' &&
        pid.length > 0
      ) {
        setProblemId(pid)
        const res = await Horse.problem.v1GetProblem(domainUrl, pid)
        return res.data.data
      }

      setProblemId(undefined)
      return undefined
    },
    {
      manual: true
    }
  )

  const value: ProblemContextValue = useMemo(
    () => ({
      problemId,
      problem,
      fetchProblem,
      refresh,
      loading
    }),
    [problemId, problem, fetchProblem, refresh, loading]
  )

  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  )
}

export { ProblemContext, ProblemContextProvider }
