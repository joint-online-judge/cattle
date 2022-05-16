import GlobalPageHeader from 'components/GlobalPageHeader'
import { usePageHeader } from 'models'
import type React from 'react'

const Index: React.FC = ({ children }) => {
	const { headerVisible } = usePageHeader()

	return (
		<>
			{headerVisible ? <GlobalPageHeader /> : null}
			{children}
		</>
	)
}

export default Index
