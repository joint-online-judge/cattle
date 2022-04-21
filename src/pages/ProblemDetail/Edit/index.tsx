import { UpsertProblemForm } from 'components/Problem/UpsertProblemForm'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'
import { useProblem } from '../context'

const Index: React.FC = () => {
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const problemContext = useProblem()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	return (
		<ShadowCard>
			<UpsertProblemForm
				domainUrl={domainUrl}
				initialValues={problemContext.problem}
				onUpdateSuccess={problemContext.refresh}
			/>
		</ShadowCard>
	)
}

export default Index
