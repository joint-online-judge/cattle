import { Result } from 'antd'
import DomainHeader from 'components/DomainHeader'
import { useDomain } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { ErrorCode } from 'utils/service'
import MainLayout from './MainLayout'

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>()
  const { fetchDomain, errorCode, loading: domainLoading } = useDomain()

  useEffect(() => {
    fetchDomain(domainUrl)
    return () => {
      fetchDomain(null) // Clear the current model
    }
  }, [domainUrl, fetchDomain])

  if (!domainLoading && errorCode) {
    let errorTitle: string
    let errorMessage: string

    // TODO: error msg i18n & image
    switch (errorCode) {
      case ErrorCode.DomainNotFoundError: {
        errorTitle = 'Domain Not Found'
        errorMessage = 'Please check your URL.'

        break
      }

      case ErrorCode.DomainUserNotFoundError: {
        errorTitle = 'User Not Found in Domain'
        errorMessage = 'You are not a member of this domain.'

        break
      }

      case ErrorCode.DomainRoleNotFoundError: {
        errorTitle = 'Domain Role Not Found'
        errorMessage = 'Please contact the domain administrator.'

        break
      }

      case 403: {
        errorTitle = 'No Permission'
        errorMessage = 'You are not a member of this domain.'

        break
      }

      default: {
        errorTitle = 'Unknown Error'
        errorMessage = 'Failed to load domain info.'
      }
    }

    return (
      <Result
        className='mt-16'
        status='404'
        title={errorTitle}
        subTitle={errorMessage}
      />
    )
  }

  return (
    <>
      <DomainHeader />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  )
}

export default Index
