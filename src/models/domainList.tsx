import { useRequest } from 'ahooks'
import type { AxiosError } from 'axios'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useMemo, useState } from 'react'
import type { Domain } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

export interface DomainListContextValue {
  domainList: Domain[] | undefined
  loading: boolean
  errorCode?: ErrorCode | 403 | undefined
  fetchDomainList: () => void
  refresh: () => void
}

const DomainListContext = createContext<DomainListContextValue>({
  domainList: [],
  loading: false,
  fetchDomainList: () => {},
  refresh: () => {}
})

const DomainListContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errorCode, setErrorCode] = useState<ErrorCode | 403 | undefined>()

  const {
    data: domainList,
    run: fetchDomainList,
    loading,
    refresh
  } = useRequest(
    async (): Promise<Domain[]> => {
      const res = await Horse.domain.v1ListDomains()
      if (res.data.errorCode !== ErrorCode.Success)
        setErrorCode(res.data.errorCode)
      return res.data.data?.results ?? []
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

  const value: DomainListContextValue = useMemo(
    () => ({
      domainList,
      loading,
      errorCode,
      fetchDomainList,
      refresh
    }),
    [domainList, loading, errorCode, fetchDomainList, refresh]
  )

  return (
    <DomainListContext.Provider value={value}>
      {children}
    </DomainListContext.Provider>
  )
}

export { DomainListContext, DomainListContextProvider }
