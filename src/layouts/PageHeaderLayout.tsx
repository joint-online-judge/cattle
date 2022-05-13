import GlobalPageHeader from 'components/GlobalPageHeader'
import type React from 'react'

const Index: React.FC = ({ children }) => (
	<>
		<GlobalPageHeader />
		{children}
	</>
)

export default Index
