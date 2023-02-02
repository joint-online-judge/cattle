import { notification } from 'antd'
import 'antd/dist/reset.css'
import type { AxiosError, AxiosResponse } from 'axios'
import LoadingOrError from 'components/LoadingOrError'
import { throttle } from 'lodash-es'
import { AccessContextProvider } from 'models/access'
import { AuthContextProvider } from 'models/auth'
import { DomainContextProvider } from 'models/domain'
import { DomainListContextProvider } from 'models/domainList'
import { LangContextProvider } from 'models/lang'
import { ProblemContextProvider } from 'models/problem'
import { ProblemSetContextProvider } from 'models/problemSet'
import type { ReactElement } from 'react'
import { Suspense, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Horse from 'utils/service'
import './i18n'
import './index.css'
import routes from './routes'

function Routes(): ReactElement | null {
  const routesComponent = useRoutes(routes)
  return routesComponent
}

export default function App(): ReactElement {
  const [api, contextHolder] = notification.useNotification()
  const { t } = useTranslation()

  const axiosErrorHandler = useMemo(() => {
    const throttleWarn = throttle(() => {
      api.warning({
        message: t('Axios.noPermission.message'),
        description: t('Axios.noPermission.description')
      })
    }, 4500) // Default duration of notification

    const throttleServerError = throttle(() => {
      api.error({
        message: t('Axios.serverError.message'),
        description: t('Axios.serverError.description')
      })
    }, 4500)

    const throttleTimeoutError = throttle(() => {
      api.error({
        message: t('Axios.timeout.message'),
        description: t('Axios.timeout.description')
      })
    }, 4500)

    const throttleNetworkError = throttle(() => {
      api.error({
        message: t('Axios.networkError.message'),
        description: t('Axios.networkError.description')
      })
    }, 4500)

    const throttleRequestError = throttle(() => {
      api.error({
        message: t('Axios.requestError.message'),
        description: t('Axios.requestError.description')
      })
    }, 4500)

    return async (error: AxiosError) => {
      if (error.response) {
        // 401 NotAuthenticated should be handled by redirecting user to login page
        if (error.response.status === 403) {
          throttleWarn() // No Permission
        } else if (error.response.status >= 500) {
          throttleServerError() // Internal Server Error
        }
      } else if (error.request) {
        if (error.code === 'ECONNABORTED') {
          throttleTimeoutError()
        } else {
          throttleNetworkError() // Network Error
        }
      } else {
        throttleRequestError() // Sending Error: caused by code
      }

      throw error
    }
  }, [api, t])

  useEffect(() => {
    const interceptor = Horse.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      axiosErrorHandler
    )
    return () => Horse.instance.interceptors.response.eject(interceptor)
  }, [axiosErrorHandler])

  return (
    <Suspense fallback={<LoadingOrError fullscreen />}>
      <LangContextProvider>
        <AuthContextProvider>
          <DomainListContextProvider>
            <DomainContextProvider>
              <AccessContextProvider>
                <ProblemSetContextProvider>
                  <ProblemContextProvider>
                    {contextHolder}
                    <BrowserRouter>
                      <Routes />
                    </BrowserRouter>
                  </ProblemContextProvider>
                </ProblemSetContextProvider>
              </AccessContextProvider>
            </DomainContextProvider>
          </DomainListContextProvider>
        </AuthContextProvider>
      </LangContextProvider>
    </Suspense>
  )
}
