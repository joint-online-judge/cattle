import { useRequest } from 'ahooks'
import type { AxiosResponse } from 'axios'
import type { FC } from 'react'
import { createContext, useMemo, useState } from 'react'
import type { UserDetail, UserDetailResp } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

export interface AuthContextValue {
  user: UserDetail | undefined
  loading: boolean
  refresh: () => void
  refreshAsync?: () => Promise<AxiosResponse<UserDetailResp>>
}

const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  loading: false,
  refresh: () => {}
})

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserDetail>()

  const { loading, refresh, refreshAsync } = useRequest(
    async () => Horse.user.v1GetCurrentUser(),
    {
      onSuccess: res => {
        if (res.data.errorCode === ErrorCode.Success && res.data.data) {
          setUser(res.data.data)
        } else {
          setUser(undefined)
        }
      },
      onError: () => {
        setUser(undefined)
      }
    }
  )

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      loading,
      refresh,
      refreshAsync
    }),
    [user, loading, refresh, refreshAsync]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
