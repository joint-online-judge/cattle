import { BackTop, Layout } from 'antd'
import ErrorBoundary from 'components/ErrorBoundary'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MainLayout from 'layouts/MainLayout'
import type React from 'react'
import type { ReactNode } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import style from './style.module.less'

const Index: React.FC = () => {
	const match = useMatch('/domain/:domainUrl/*')

	const renderMain = (): ReactNode => {
		if (match) {
			return <Outlet />
		}

		return (
			<MainLayout>
				<Outlet />
			</MainLayout>
		)
	}

	return (
		<ErrorBoundary>
			<Layout className={style.pageLayout}>
				<Layout.Header className={style.pageHeader}>
					<Header />
				</Layout.Header>
				<Layout.Content className={style.pageBody}>
					<ErrorBoundary>{renderMain()}</ErrorBoundary>
				</Layout.Content>
				<Layout.Footer className={style.pageFooter}>
					<Footer />
				</Layout.Footer>
				<BackTop />
			</Layout>
		</ErrorBoundary>
	)
}

export default Index
