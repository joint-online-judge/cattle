import UpsertDomainForm from 'components/Domain/UpsertDomainForm'
import ShadowCard from 'components/ShadowCard'
import { useDomain } from 'models'
import type React from 'react'

const Index: React.FC = () => {
	const { domain, refresh } = useDomain()

	return (
		<ShadowCard>
			<UpsertDomainForm initialValues={domain} onUpdateSuccess={refresh} />
		</ShadowCard>
	)
}

export default Index
