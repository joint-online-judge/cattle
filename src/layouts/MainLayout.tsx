import LoadingOrError from 'components/LoadingOrError'
import { usePageHeader } from 'models'
import type React from 'react'
import { Suspense } from 'react'
import MainContentLayout from './MainContentLayout'
import PageHeaderLayout from './PageHeaderLayout'
import style from './style.module.less'

const Index: React.FC = ({ children }) => {
	const { headerVisible } = usePageHeader()

	return (
		<MainContentLayout
			className={
				headerVisible ? style.pageContentWithHeader : style.pageContentNoHeader
			}
		>
			<PageHeaderLayout>
				<Suspense fallback={<LoadingOrError />}>{children}</Suspense>
			</PageHeaderLayout>
		</MainContentLayout>
	)
}

export default Index
