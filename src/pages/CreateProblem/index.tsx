import { UpsertProblemForm } from 'components/Problem'
import SidePage from 'components/SidePage'
import type React from 'react'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
	const { domainUrl } = useParams<{ domainUrl: string }>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	return (
		<SidePage extra={<h1>Side</h1>}>
			<UpsertProblemForm
				domainUrl={domainUrl}
				initialValues={{ hidden: true }}
			/>
		</SidePage>
	)
}

export default Index
