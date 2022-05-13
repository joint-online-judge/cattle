import ProfileCard from 'components/Profile/ProfileCard'
import SidePage from 'components/SidePage'
import type React from 'react'

const Index: React.FC = () => (
	<SidePage position='left' extra={<ProfileCard />}>
		test
	</SidePage>
)

export default Index
