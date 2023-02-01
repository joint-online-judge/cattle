import { FloatButton, Layout, theme } from 'antd'
import ErrorBoundary from 'components/ErrorBoundary'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingOrError from 'components/LoadingOrError'
import MainLayout from 'layouts/MainLayout'
import type React from 'react'
import type { ReactNode } from 'react'
import { Suspense, useMemo } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import style from './style.module.css'

const Index: React.FC = () => {
  const match = useMatch('/domain/:domainUrl/*')
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const mainContent: ReactNode = useMemo(() => {
    if (match) {
      return <Outlet />
    }

    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }, [match])

  return (
    <ErrorBoundary>
      <Layout className={style.pageLayout}>
        <Layout.Header
          style={{ background: colorBgContainer }}
          className='border-0 border-b border-solid border-neutral-200'
        >
          <Header />
        </Layout.Header>
        <Layout.Content className='bg-slate-100'>
          <Suspense fallback={<LoadingOrError />}>
            <ErrorBoundary>{mainContent}</ErrorBoundary>
          </Suspense>
        </Layout.Content>
        <Layout.Footer className={style.pageFooter}>
          <Footer />
        </Layout.Footer>
        <FloatButton.BackTop />
      </Layout>
    </ErrorBoundary>
  )
}

export default Index
