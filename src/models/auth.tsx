import { useRequest } from 'ahooks'
import type { AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import type { FC } from 'react'
import { createContext, useMemo, useState } from 'react'
import type { AuthTokensResp, JWTAccessToken } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

export interface AuthContextValue {
  accessToken: string | undefined
  user: JWTAccessToken | undefined // Actually a JWT not a User
  loading: boolean
  refresh: () => void
  refreshAsync?: () => Promise<AxiosResponse<AuthTokensResp>>
}

const AuthContext = createContext<AuthContextValue>({
  accessToken: undefined,
  user: undefined,
  loading: false,
  refresh: () => {}
})

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<JWTAccessToken>()
  const [accessToken, setAccessToken] = useState<string>()

  const { loading, refresh, refreshAsync } = useRequest(
    async () =>
      Horse.auth.v1GetToken({
        responseType: 'json'
      }),
    {
      onSuccess: res => {
        if (
          res.data.errorCode === ErrorCode.Success &&
          res.data.data?.accessToken
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const decoded: JWTAccessToken = jwtDecode<JWTAccessToken>(
            res.data.data.accessToken
          )
          setUser(decoded)
          setAccessToken(res.data.data.accessToken)
        } else {
          setUser(undefined)
          setAccessToken(undefined)
        }
      },
      onError: () => {
        setUser(undefined)
        setAccessToken(undefined)
      }
    }
  )

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      refresh,
      refreshAsync
    }),
    [user, accessToken, loading, refresh, refreshAsync]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
