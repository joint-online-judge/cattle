import { usePageHeader } from 'models'
import type React from 'react'
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
			<PageHeaderLayout>{children}</PageHeaderLayout>
		</MainContentLayout>
	)
}

export default Index
