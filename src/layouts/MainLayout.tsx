import LoadingOrError from 'components/LoadingOrError'
import type React from 'react'
import { Suspense } from 'react'
import MainContentLayout from './MainContentLayout'
import PageHeaderLayout from './PageHeaderLayout'

const Index: React.FC = ({ children }) => (
	<MainContentLayout>
		<PageHeaderLayout>
			<Suspense fallback={<LoadingOrError />}>{children}</Suspense>
		</PageHeaderLayout>
	</MainContentLayout>
)

export default Index
